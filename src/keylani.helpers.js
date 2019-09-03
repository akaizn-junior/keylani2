/*global MINIMAL_BUILD */

const Globals = require('./keylani.globals');
const __loudText = !MINIMAL_BUILD && require('./keylani.loud').__loudText;

function __readKeys(opts, state) {
	return event => {
		let pressed = event.key;
		let isExistingBind = Globals.__KEYLANI_BINDINGS__[pressed];

		state.matchCount++;

		__updateStateByCombo(state, event, pressed);

		if(__isSpecialCase(pressed, Globals.__KEYLANI_BINDINGS__)) {
			__resetState(state);
		}

		setInterval(() => {
			if(state.combo.length === 1) {
				__resetState(state);
			}
		}, Globals.__KEYLANI_SETTINGS__.stateTimeout);

		if(state.matchCount === 1 && isExistingBind && isExistingBind.isActive) {
			__cancelEvent(event);

			__keyMatchDone(pressed, isExistingBind, opts, {
				code: state.code,
				keyCode: state.keyCode,
				pressed: ++isExistingBind.pressed
			});

			__resetState(state);
		} if(Globals.__KEYLANI_BINDINGS__[state.combo] && Globals.__KEYLANI_BINDINGS__[state.combo].isActive) {
			__cancelEvent(event);

			let pressedCount = ++Globals.__KEYLANI_BINDINGS__[state.combo].pressed;

			__keyMatchDone(state.combo, Globals.__KEYLANI_BINDINGS__[state.combo], opts, {
				code: state.code,
				keyCode: state.keyCode,
				pressed: pressedCount
			});
			__resetState(state);
		} else if(state.matchCount >= Globals.__KEYLANI_SETTINGS__.maxKeyLength) {
			__resetState(state);
		}
	};
}

function __isValidateOpts(opts) {
	if(!MINIMAL_BUILD) {
		let requiredSettings = (
			Object.prototype.toString.call(opts).includes('Object')
			&& 'loud' in opts
			&& 'style' in opts
			&& 'keyshow' in opts
		);

		// optional settings
		// loudTimer - A timer to hide the loud panel - number
		// showLoudData - toggles showing extra data for the key press - boolean

		return (
			requiredSettings
			&& (typeof opts.style === 'string' || Object.prototype.toString.call(opts.style).includes('Object'))
			&& typeof opts.loud === 'boolean'
			&& typeof opts.keyshow === 'boolean'
		);
	}
}

function __addToBindings(key, binding, label, when) {
	let newBinding = {};
	key = key.replace(/\s/g, '');
	key = __verifyKeyNames(key);
	__getMaxLength(key.split('+').length);
	newBinding[key] = { key, binding, label, isActive: when, pressed: 0 };
	Globals.__KEYLANI_BINDINGS__[key] = newBinding[key];
}

function __getMaxLength(keyLength) {
	Globals.__KEYLANI_SETTINGS__.maxKeyLength
		= keyLength > Globals.__KEYLANI_SETTINGS__.maxKeyLength
			? keyLength
			: Globals.__KEYLANI_SETTINGS__.maxKeyLength;
}

function __cancelEvent(ev) {
	ev.preventDefault();
	ev.stopPropagation();
}

function __resetState(state) {
	state.matchCount = 0;
	state.combo = '';
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
	let specialCaseChars = ['CapsLock', 'Enter', 'Shift'];
	return (
		specialCaseChars.indexOf(key) !== -1 && !list[key]
	);
}

function __keyMatchDone(key, actualBind, opts, eventProps) {
	let binding = actualBind.binding;
	let label = actualBind.label;
	let result = {
		key, label,
		code: eventProps.code,
		keyCode: eventProps.keyCode,
		pressed: eventProps.pressed
	};

	if(!MINIMAL_BUILD) {
		eventProps.key = key;
		eventProps.label = label;
		eventProps.showLoudData = opts.showLoudData;
		__loudText(eventProps, opts.loudTimer);
	}

	if(typeof binding === 'function') {
		setTimeout(() => {
			binding(result);
		}, 500);
	}
}

function __verifyKeyNames(key) {
	let keys = {
		control: 'Control',
		ctrl: 'Control',
		alt: 'Alt',
		shift: 'Shift',
		esc: 'Esc',
		enter: 'Enter',
		tab: 'Tab',
		capslock: 'CapsLock'
	};

	let combo = key.split('+');
	let actualKey = keys[key.toLowerCase()];

	if(combo.length === 1) {
		return actualKey ? actualKey : key;
	} else {
		return combo.map(k => (keys[k.toLowerCase()] ? keys[k.toLowerCase()] : k)).join('+');
	}
}

function __readOnlyKeys(obj) {
	for(let key in obj) {
		if(key) {
			Object.defineProperty(obj, key, {
				writable: false,
				enumerable: false,
				configurable: false
			});
		}
	}
}

module.exports = { __readKeys, __isValidateOpts, __addToBindings, __readOnlyKeys };
