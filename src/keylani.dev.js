// globals **********************************************************

const __KEYLANI_BINDINGS__ = {};
const __KEYLANI_SETTINGS__ = {
	loudClass: 'keylani-loud',
	loudDataClass: 'keylani-loud-data',
	loudCharClass: 'keylani-loud-char',
	paintClass: 'keylani-binding',
	keybindingAttr: '[data-keybind]',
	defaultLoudTimer: 700,
	stateTimeout: 1500,
	hasRun: false,
	maxKeyLength: 0
};

// interface *********************************************************

function listen(opts) {
	if(!__KEYLANI_SETTINGS__.hasRun && __isValidateOpts(opts)) {
		let parsedOpts = JSON.parse(JSON.stringify(opts));
		__addLoudPanel(parsedOpts);
		__listenDOM(parsedOpts);
		const state = {
			matchCount: 0,
			combo: '',
			codes: '',
			keycodes: ''
		};

		window.addEventListener('keydown', __readKeys(parsedOpts, state));
		// run only once
		__KEYLANI_SETTINGS__.hasRun = true;
	}
}

function bind(key, binding, label = '', when = true) {
	if(typeof key === 'string' && typeof binding === 'function' && typeof label === 'string' && typeof when === 'boolean') {
		__addToBindings(key, binding, label, when);
		return 1;
	}
	return 0;
}

function map(bindings) {
	if(typeof bindings === 'object' && !('length' in bindings)) {
		for(let binding in bindings) {
			if('bind' in bindings[binding] && 'label' in bindings[binding] && 'when' in bindings[binding]) {
				bind(binding, bindings[binding].bind, bindings[binding].label, bindings[binding].when);
			}
		}
	}
}

function getAllBindings() {
	return __KEYLANI_BINDINGS__;
}

// helpers *********************************************************

function __readKeys(opts, state) {
	return function(event) {
		let pressed = event.key;
		let isExistingBind = __KEYLANI_BINDINGS__[pressed];

		state.matchCount++;

		__updateStateByCombo(state, event, pressed);

		let eventProps = { code: state.code, keyCode: state.keyCode };

		if(__isSpecialCase(pressed, __KEYLANI_BINDINGS__)) {
			__resetState(state);
		}

		setInterval(function() {
			if(state.combo.length === 1) {
				__resetState(state);
			}
		}, __KEYLANI_SETTINGS__.stateTimeout);

		if(state.matchCount === 1 && isExistingBind && isExistingBind.when) {
			__dontEvent(event);
			__keyMatchDone(pressed, isExistingBind, opts, {...eventProps, pressed: ++isExistingBind.pressed});
			__resetState(state);
		} if(__KEYLANI_BINDINGS__[state.combo] && __KEYLANI_BINDINGS__[state.combo].when) {
			__dontEvent(event);
			let pressed = ++__KEYLANI_BINDINGS__[state.combo].pressed;
			__keyMatchDone(state.combo, __KEYLANI_BINDINGS__[state.combo], opts, {...eventProps, pressed});
			__resetState(state);
		} else if(state.matchCount >= __KEYLANI_SETTINGS__.maxKeyLength) {
			__resetState(state);
		}
	}
}

function __dontEvent(ev) {
	ev.preventDefault();
	ev.stopPropagation();
}

function __resetState(state) {
	state.matchCount = 0;
	state.combo = '';
}

function __loudText(data, timer = __KEYLANI_SETTINGS__.defaultLoudTimer) {
	if(__KEYLANI_BINDINGS__[data.key]) {
		let keylaniLoudEl = document.getElementsByClassName(__KEYLANI_SETTINGS__.loudClass)[0];
		if(keylaniLoudEl) {
			keylaniLoudEl.style = 'display: block;';
			keylaniLoudEl.children[0].innerText = data.key;

			if(data.showLoudData) {
				keylaniLoudEl.children[1].innerText = data.label;
				keylaniLoudEl.children[2].innerText = data.pressed;
				keylaniLoudEl.children[3].innerText = data.code;
				keylaniLoudEl.children[4].innerText = data.keyCode;
			}

			setTimeout(function() {
				keylaniLoudEl.style = 'display: none;';
				keylaniLoudEl.children[0].innerText = '';

				if(data.showLoudData) {
					keylaniLoudEl.children[1].innerText = '';
					keylaniLoudEl.children[2].innerText = '';
					keylaniLoudEl.children[3].innerText = '';
					keylaniLoudEl.children[4].innerText = '';
				}
			}, timer || __KEYLANI_SETTINGS__.defaultLoudTimer);
		}
	}
}

function __updateStateByCombo(state, event, pressed) {
	if(state.combo.length) {
		state.combo += '+'+pressed;
		state.code += '+'+event.code;
		state.keyCode += '+'+event.keyCode;
	} else {
		state.combo = pressed;
		state.code = event.code;
		state.keyCode = event.keyCode;
	}
}

function __isSpecialCase(key, list) {
	return (
		key === 'CapsLock' && !list[key] ||
		key === 'Enter' && !list[key] ||
		key === 'Shift' && !list[key]
	);
}

function __isValidateOpts(opts) {
	let requiredSettings = (
		(typeof opts === 'object' && !('length' in opts)) &&
		'loud' in opts &&
		'style' in opts &&
		'keyshow' in opts
	);

	// optional settings
	// loudTimer - A timer to hide the loud panel
	// showLoudData - toggles showing extra data for the key press

	return (
		requiredSettings &&
		(typeof opts.style === 'string' || typeof opts.style === 'object' && !('length' in opts.style)) &&
		typeof opts.loud === 'boolean' &&
		typeof opts.keyshow === 'boolean'
	);
}

function __keyMatchDone(key, actualBind, opts, eventProps) {
	let binding = actualBind.binding;
	let label = actualBind.label;
	let result = {key, label, ...eventProps};
	__loudText({...result, showLoudData: opts.showLoudData}, opts.loudTimer);
	typeof binding === 'function' && binding(result);
}

function __addToBindings(key, binding, label, when) {
	let newBinding = {};
	key = key.replace(/\s/g, '');
	let keyLength = key.split('+').length;
	let pressed = 0;
	__KEYLANI_SETTINGS__.maxKeyLength = keyLength > __KEYLANI_SETTINGS__.maxKeyLength ? keyLength : __KEYLANI_SETTINGS__.maxKeyLength;
	newBinding[key] = { key, binding, label, when, pressed };
	__KEYLANI_BINDINGS__[key] = newBinding[key];
}

// DOM ************************************************************

function __listenDOM(opts) {
	const dataKeyBindings = document.querySelectorAll(__KEYLANI_SETTINGS__.keybindingAttr);
	for(let i = 0; i < dataKeyBindings.length; i++) {
		let elem = dataKeyBindings[i];
		let domBind = __readDomBinding(elem.dataset.keybind);
		__paintHtml(opts, elem);
		if(domBind.length) {
			bind(
				domBind[0],
				window[domBind[1]] || null,
				elem.dataset.keylabel || '',
				elem.dataset.keywhen !== 'false'
			);
		}
	}
}

function __readDomBinding(keybinding) {
	if(keybinding && keybinding.includes(':')) {
		keybinding = keybinding.replace(/\s/g, '');
		return keybinding.split(':');
	}
	return [];
}

function __paintHtml(opts, boundEl) {
	if(__canShowTag(opts.keyshow, boundEl)) {
		let keyTag = document.createElement('span');
		keyTag.className = __KEYLANI_SETTINGS__.paintClass;
		let domBind = __readDomBinding(boundEl.dataset.keybind);

		if(domBind.length) {
			keyTag.innerHTML = domBind[0];

			if(typeof opts.style === 'string') {
				keyTag.className += ' '+opts.style;
			} else {
				for(let rule in opts.style) {
					keyTag.style[rule] = opts.style[rule];
				}
			}

			boundEl.appendChild(keyTag);
		}
	}
}

function __canShowTag(keyshow, elem) {
	return (
		elem &&
		elem.dataset &&
		elem.dataset.keybind &&
		keyshow &&
		elem.dataset.keyshow === undefined ||
		elem.dataset.keyshow === 'true'
	);
}

function __addLoudPanel(opts) {
	if(opts.loud) {
		let headEl = document.head;
		let bodyEl = document.body;
		let loudStyleEl = document.createElement('style');

		let loudEl = document.createElement('div');
		let loudElChar = document.createElement('span');

		loudStyleEl.type = 'text/css';
		loudEl.className = __KEYLANI_SETTINGS__.loudClass;
		loudEl.style = 'display: none;';

		loudElChar.className = __KEYLANI_SETTINGS__.loudCharClass;

		let css = `
			.keylani-loud {
				max-width: 200%;
				margin: auto;
				text-align: center;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				transition: all 1s;
				z-index: 999999999;
			}

			.keylani-loud-data {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		`;

		if (loudStyleEl.styleSheet) {
			// This is required for IE8 and below.
			loudStyleEl.styleSheet.cssText = css;
		} else {
			loudStyleEl.appendChild(document.createTextNode(css));
		}

		headEl.appendChild(loudStyleEl);
		loudEl.appendChild(loudElChar);

		if(opts.showLoudData) {
			let loudElCode = document.createElement('p');
			let loudElPressed = document.createElement('p');
			let loudElKeyCode = document.createElement('p');
			let loudElLabel = document.createElement('p');

			loudElCode.className = __KEYLANI_SETTINGS__.loudDataClass;
			loudElPressed.className = __KEYLANI_SETTINGS__.loudDataClass;
			loudElKeyCode.className = __KEYLANI_SETTINGS__.loudDataClass;
			loudElLabel.className = __KEYLANI_SETTINGS__.loudDataClass;

			loudEl.appendChild(loudElLabel);
			loudEl.appendChild(loudElPressed);
			loudEl.appendChild(loudElCode);
			loudEl.appendChild(loudElKeyCode);
		}

		bodyEl.appendChild(loudEl);
	}
}

// export *********************************************************

/**
 * @author Simao Nziaka - sdnziaka[at]gmail.com
 * @date August, 12th 2019
 * @name Keylani
 * @description A js key binding library
 */

const Keylani = { bind, map, listen, getAllBindings };

module.exports = Keylani;
