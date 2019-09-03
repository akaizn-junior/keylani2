/* global MINIMAL_BUILD, DEV */

const __KEYLANI_BINDINGS__ = {};

const __KEYLANI_SETTINGS__ = {
	keybindingAttr: '[data-keybind]',
	stateTimeout: 1500,
	hasRun: false,
	maxKeyLength: 0
};

if(!MINIMAL_BUILD) {
	__KEYLANI_SETTINGS__.loudClass = 'keylani-loud';
	__KEYLANI_SETTINGS__.loudDataClass = 'keylani-loud-data';
	__KEYLANI_SETTINGS__.loudCharClass = 'keylani-loud-char';
	__KEYLANI_SETTINGS__.paintClass = 'keylani-binding';
	__KEYLANI_SETTINGS__.defaultLoudTimer = 700;
}

if(DEV) {
	__KEYLANI_SETTINGS__.brand = '%c Keylani ';
	__KEYLANI_SETTINGS__.mainDevColors = 'color: white; background: purple;';
	__KEYLANI_SETTINGS__.sndDevColors = 'color: black; background: #ead4e6;';
}

module.exports = { __KEYLANI_BINDINGS__, __KEYLANI_SETTINGS__ };
