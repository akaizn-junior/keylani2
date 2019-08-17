/*!
 * Keylani
 * (c) 2019 Simao Nziaka <sdnziaka[at]gmail.com>
 * ISC Licensed
 */

const Helpers = require('./keylani.helpers');
const DOM = require('./keylani.dom');
const Globals = require('./keylani.globals');

// interface *********************************************************

function listen(opts) {
	if(!Globals.__KEYLANI_SETTINGS__.hasRun && Helpers.__isValidateOpts(opts)) {
		let parsedOpts = JSON.parse(JSON.stringify(opts));
		DOM.__addLoudPanel(parsedOpts);
		DOM.__listenDOM(parsedOpts);
		const state = {
			matchCount: 0,
			combo: '',
			codes: '',
			keycodes: ''
		};

		window.addEventListener('keydown', Helpers.__readKeys(parsedOpts, state));
		// run only once
		Globals.__KEYLANI_SETTINGS__.hasRun = true;
	}
}

function bind(key, binding, label = '', when = true) {
	if(typeof key === 'string' && typeof binding === 'function' && typeof label === 'string' && typeof when === 'boolean') {
		Helpers.__addToBindings(key, binding, label, when);
		return 1;
	}
	return 0;
}

function map(bindings) {
	if(typeof bindings === 'object' && !('length' in bindings)) {
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

const Keylani = { bind, map, listen, getAllBindings };

module.exports = Keylani;
