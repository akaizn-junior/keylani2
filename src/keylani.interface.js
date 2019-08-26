/*!
 * @name Keylani
 * (c) 2019 Verdexdesign - An open source Org by Simao Nziaka <sdnziaka@gmail.com>
 * @license MIT
 */

const Globals = require('./keylani.globals');
const {__isValidateOpts, __readKeys, __addToBindings, __readOnlyKeys} = require('./keylani.helpers');
const DOMinterface = require('./keylani.dom');

/**
 * @description Listen for all key presses for the key bindings added using Keylani
 * @param {object} opts Options passed to Keylani
 * @example
 * <!-- Key bindings added on the DOM -->
 * <a href="#top" data-keybind="t:callThisOne" data-keyshow="false">Top</a>
 * <button data-keybind="b:callThisTwo" data-keyshow="true" data-keylabel="Triggered the button click by a key press">Click here!</button>
 *
 * @example
 * // javascript
 *
 * // Below are the required option values
 * Keylani.listen({
 *   // 'style' ecan be an object with CSS or a string of a classname
 *   style: { color: 'pink', fontSize: '13px' } or 'key-class',
 *   loud: true, // show the loud panel
 *   keyshow: true // show keys by DOM added binds by default
 * });
 *
 * // Global keybind functions on the 'window' object
 * function callThisOne() {...}
 * function callThisTwo() {...}
 */
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

/**
 * @description Reads a string containing the key or keys separated by '+' to bind to a callback function.
 * The callback takes the key read as an argument for use when the callback is run.
 * @param {string} key The key or keys separated by '+' to listen for
 * @param {function} callback The function to run on success. Format (done) => {}
 * @param {string} label The description of the key binding
 * @param {boolean} when A boolean that indicates when to run a callback function when a key is pressed
 * @example
 * // one key
 * Keylani.bind('h', () => { alert('Hello world!'); }, 'Hello World example!');
 *
 * // a combo of keys
 * Keylani.bind('a + b', () => { alert('Hello world from a combo'); });
 *
 * // theoretically you can have as much keys as possible
 * Keylani.bind('a + b + c + d + e', () => { alert('Hello world from a long combo'); });
 */
function bind(key, binding, label = '', when = true) {
	if(typeof key === 'string' && typeof binding === 'function' && typeof label === 'string' && typeof when === 'boolean') {
		__addToBindings(key, binding, label, when);
		return 1;
	}
	return 0;
}

/**
 * @description A (key, value) map of bindings, reads an object of keys, their respective callback functions and more data.
 * 'map' is just a different way to write a bunch of bind calls; Its objective is to be clean and minimal, to group keys that
 * might be related to each other.
 * @param {object} bindings An object of key bindings
 * @example
 * let isDoneLoading = ...;
 * let allowThisKey = ...;
 *
 * Keylani.map({
 *  'q+w': {
 *    bind: callA,
 *    label: 'Combo "h+e+l+l+o" bound from Keylani.map',
 *    when: isDoneLoading
 *  },
 * 'r+3': {
 *    bind: callA,
 *    label: 'Combo "r+3" bound from Keylani.map',
 *    when: allowThisKey
 *  }
 * });
 */
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

/**
 * @description Get all added key bindings with data about each bind
 * @returns An object containing all the key bindings added using Keylani
 * @example
 * `{ a: { key: 'a', label: '...', pressed: 2 }, 'b+2': { key: 'b+2', label: '...', pressed: 11 } }`
 */
function getAllBindings() {
	return Globals.__KEYLANI_BINDINGS__;
}

const Keylani = { listen, bind, map, getAllBindings };
__readOnlyKeys(Keylani);

module.exports = Keylani;
