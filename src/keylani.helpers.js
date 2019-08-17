const Globals = require('./keylani.globals');

// helpers *********************************************************

function __readKeys(opts, state) {
	return function(event) {
		let pressed = event.key;
		let isExistingBind = Globals.__KEYLANI_BINDINGS__[pressed];

		state.matchCount++;

		__updateStateByCombo(state, event, pressed);

		let eventProps = { code: state.code, keyCode: state.keyCode };

		if(__isSpecialCase(pressed, Globals.__KEYLANI_BINDINGS__)) {
			__resetState(state);
		}

		setInterval(function() {
			if(state.combo.length === 1) {
				__resetState(state);
			}
		}, Globals.__KEYLANI_SETTINGS__.stateTimeout);

		if(state.matchCount === 1 && isExistingBind && isExistingBind.when) {
			__dontEvent(event);
			__keyMatchDone(pressed, isExistingBind, opts, {...eventProps, pressed: ++isExistingBind.pressed});
			__resetState(state);
		} if(Globals.__KEYLANI_BINDINGS__[state.combo] && Globals.__KEYLANI_BINDINGS__[state.combo].when) {
			__dontEvent(event);
			let pressedCount = ++Globals.__KEYLANI_BINDINGS__[state.combo].pressed;
			__keyMatchDone(state.combo, Globals.__KEYLANI_BINDINGS__[state.combo], opts, {...eventProps, pressedCount});
			__resetState(state);
		} else if(state.matchCount >= Globals.__KEYLANI_SETTINGS__.maxKeyLength) {
			__resetState(state);
		}
	};
}

function __dontEvent(ev) {
	ev.preventDefault();
	ev.stopPropagation();
}

function __resetState(state) {
	state.matchCount = 0;
	state.combo = '';
}

function __loudText(data, timer = Globals.__KEYLANI_SETTINGS__.defaultLoudTimer) {
	if(Globals.__KEYLANI_BINDINGS__[data.key]) {
		let keylaniLoudEl = document.getElementsByClassName(Globals.__KEYLANI_SETTINGS__.loudClass)[0];
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
			}, timer || Globals.__KEYLANI_SETTINGS__.defaultLoudTimer);
		}
	}
}

function __updateStateByCombo(state, event, pressed) {
	if(state.combo.length) {
		state.combo += `+${pressed}`;
		state.code += `+${event.code}`;
		state.keyCode += `+${event.keyCode}`;
	} else {
		state.combo = pressed;
		state.code = event.code;
		state.keyCode = event.keyCode;
	}
}

function __isSpecialCase(key, list) {
	return (
		key === 'CapsLock' && !list[key]
		|| key === 'Enter' && !list[key]
		|| key === 'Shift' && !list[key]
	);
}

function __isValidateOpts(opts) {
	let requiredSettings = (
		(typeof opts === 'object' && !('length' in opts))
		&& 'loud' in opts
		&& 'style' in opts
		&& 'keyshow' in opts
	);

	// optional settings
	// loudTimer - A timer to hide the loud panel
	// showLoudData - toggles showing extra data for the key press

	return (
		requiredSettings
		&& (typeof opts.style === 'string' || typeof opts.style === 'object' && !('length' in opts.style))
		&& typeof opts.loud === 'boolean'
		&& typeof opts.keyshow === 'boolean'
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
	Globals.__KEYLANI_SETTINGS__.maxKeyLength = keyLength > Globals.__KEYLANI_SETTINGS__.maxKeyLength ? keyLength : Globals.__KEYLANI_SETTINGS__.maxKeyLength;
	newBinding[key] = { key, binding, label, when, pressed };
	Globals.__KEYLANI_BINDINGS__[key] = newBinding[key];
}

module.exports = {
	__readKeys,
	__addToBindings,
	__isValidateOpts
};
