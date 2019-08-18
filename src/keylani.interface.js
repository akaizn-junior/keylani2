/**
 * Keylani
 * (c) 2019 Verdexdesign - An open source Org by Simao Nziaka <sdnziaka@gmail.com>
 * ISC Licensed
 */

const Globals = require('./keylani.globals');
const {__isValidateOpts, __readKeys, __addToBindings} = require('./keylani.helpers');
const DOMinterface = require('./keylani.dom');

// interface *********************************************************

function listen(opts) {
	if(!Globals.__KEYLANI_SETTINGS__.hasRun && __isValidateOpts(opts)) {
		let parsedOpts = JSON.parse(JSON.stringify(opts));
		DOMinterface.__addLoudPanel(parsedOpts);
		DOMinterface.__listenDOM(parsedOpts);
		const state = {
			matchCount: 0,
			combo: '',
			codes: '',
			keycodes: ''
		};

		window.addEventListener('keydown', __readKeys(parsedOpts, state));
		// run only once
		Globals.__KEYLANI_SETTINGS__.hasRun = true;
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
	if(Object.prototype.toString.call(bindings).includes('Object')) {
		let nBindings = JSON.parse(JSON.stringify(bindings));
		for(let binding in nBindings) {
			if('bind' in bindings[binding] && 'label' in bindings[binding] && 'when' in bindings[binding]) {
				bind(binding, bindings[binding].bind, bindings[binding].label, bindings[binding].when);
			}
		}
	}
}

function getAllBindings() {
	return Globals.__KEYLANI_BINDINGS__;
}


// export *********************************************************

module.exports = { listen, bind, map, getAllBindings };
