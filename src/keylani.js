const __KEYLANI_SETTINGS__ = {
	bindings: {},
	maxKeyLength: 0
};

function __isWord(word) {
	let digits = 'abcdefghijklmnopqrstuvwxyz0123456789';

	for(let i = 0; i < word.length; i++) {
		if(digits.indexOf(word[i]) === -1) {
			return false;
		}
	}

	return word.split('').join('+');
}

function __verifyKeyNames(name) {
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

	let combo = name.split('+');
	let actualKey = keys[name.toLowerCase()];

	if(name.length > 1 && combo.length === 1 && !actualKey && __isWord(name)) {
		return __isWord(name);
	} else if(name.length === 1) {
		return actualKey ? actualKey : name;
	} else {
		return combo.map(k => (keys[k.toLowerCase()] ? keys[k.toLowerCase()] : k)).join('+');
	}
}

function __addToBindings(key, binding, label, when) {
	let newBinding = {};
	key = key.replace(/\s/g, '');
	key = __verifyKeyNames(key);
	newBinding[key] = { key, binding, label, isActive: when, pressed: 0 };
	__KEYLANI_SETTINGS__.bindings[key] = newBinding[key];
}
