/*!
 * @name Keylani
 * (c) 2019 Verdexdesign
 * @license MIT
 */

/* global MINIMAL_BUILD, DEV */

const Globals = require('./keylani.globals');
const {__isValidateOpts, __readKeys, __addToBindings, __readOnlyKeys} = require('./keylani.helpers');
const DOMinterface = !MINIMAL_BUILD && require('./keylani.dom');

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
 * // Below are the required option values for Keylani's Grande build
 * Keylani.listen({
 *   // 'style' ecan be an object with CSS or a string of a classname
 *   style: { color: 'pink', fontSize: '13px' } or 'key-class',
 *   loud: true, // show the loud panel
 *   keyshow: true // show keys by DOM added binds by default
 * });
 *
 * // listen witll all possible 'options' for Keylani's Grande build
 * Keylani.listen({
 *	 // 'style' ecan be an object with CSS or a string of a classname
 *	 style: { color: 'pink', fontSize: '13px' } or 'key-class',
 *	 loud: true, // show the loud panel
 *	 keyshow: true, // show keys by DOM added binds by default
 *	 loudTimer: 3500, // how long does the loud panel stays on screen
 *	 showLoudData: true // shows data from the key press
 * });
 *
 * // Nano build 'listen' does not read 'options'
 * Keylani.listen();
 *
 * // The multiple Keylani.listen calls here are for example only.
 * // Keylani.listen only runs once. The calls do not overwrite each other.
 *
 * // Global keybind functions on the 'window' object
 * function callThisOne() {...}
 * function callThisTwo() {...}
 */
function listen(opts) {
	if(!Globals.__KEYLANI_SETTINGS__.hasRun && __isValidateOpts(opts)) {
		if(!MINIMAL_BUILD) {
			DOMinterface.__addLoudPanel(opts);
			DOMinterface.__listenDOM(opts);
		}

		const state = {
			matchCount: 0,
			combo: '',
			codes: '',
			keycodes: ''
		};

		window.addEventListener('keydown', __readKeys(opts, state));
		// run only once
		Globals.__KEYLANI_SETTINGS__.hasRun = true;
	} else if(DEV) {
		console.error(
			Globals.__KEYLANI_SETTINGS__.brand,
			Globals.__KEYLANI_SETTINGS__.mainDevColors,
			'Invalid options object.'
		);
		console.info(
			Globals.__KEYLANI_SETTINGS__.brand,
			Globals.__KEYLANI_SETTINGS__.sndDevColors,
			`'listen' options param should be an object with the following fields:
		{
			style: string|object, // required
			loud: boolean, // required
			keyshow: boolean, // required
			loudTimer: number, // optional
			showLoudData: boolean, // optional
		}`);
		console.info(
			Globals.__KEYLANI_SETTINGS__.brand,
			Globals.__KEYLANI_SETTINGS__.sndDevColors,
			'See docs for more: https://verdebydesign.github.io/keylani2/global.html#listen'
		);
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
	} else if(DEV) {
		console.error(
			Globals.__KEYLANI_SETTINGS__.brand,
			Globals.__KEYLANI_SETTINGS__.mainDevColors,
			'\'bind\' must have the following params of the following types: '
		);
		console.info(
			Globals.__KEYLANI_SETTINGS__.brand,
			Globals.__KEYLANI_SETTINGS__.sndDevColors,
			'`Keylani.bind(key: string, binding: function, label: string, when: boolean)`'
		);
		console.info(
			Globals.__KEYLANI_SETTINGS__.brand,
			Globals.__KEYLANI_SETTINGS__.sndDevColors,
			'See docs for more: https://verdebydesign.github.io/keylani2/global.html#bind'
		);

		return 0;
	}
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
	} else if(DEV) {
		console.error(
			Globals.__KEYLANI_SETTINGS__.brand,
			Globals.__KEYLANI_SETTINGS__.mainDevColors,
			'Invalid bindings object.'
		);
		console.info(
			Globals.__KEYLANI_SETTINGS__.brand,
			Globals.__KEYLANI_SETTINGS__.sndDevColors,
			`'map' bindings param should be an object of the following model:
		{
			[key]: string: {
				bind: function,
				label: string,
				when: boolean
			}
		}`);
		console.info(
			Globals.__KEYLANI_SETTINGS__.brand,
			Globals.__KEYLANI_SETTINGS__.sndDevColors,
			'See docs for more: https://verdebydesign.github.io/keylani2/global.html#map'
		);
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
