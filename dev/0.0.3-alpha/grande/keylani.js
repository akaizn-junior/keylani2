(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Keylani"] = factory();
	else
		root["Keylani"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * @name Keylani
 * (c) 2019 Verdexdesign - An open source Org by Simao Nziaka <sdnziaka@gmail.com>
 * @license MIT
 */

/* global MINIMAL_BUILD, DEV */
var Globals = __webpack_require__(1);

var _require = __webpack_require__(2),
    __isValidateOpts = _require.__isValidateOpts,
    __readKeys = _require.__readKeys,
    __addToBindings = _require.__addToBindings,
    __readOnlyKeys = _require.__readOnlyKeys;

var DOMinterface =  true && __webpack_require__(4);
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
  if (!Globals.__KEYLANI_SETTINGS__.hasRun && __isValidateOpts(opts)) {
    if (true) {
      DOMinterface.__addLoudPanel(opts);

      DOMinterface.__listenDOM(opts);
    }

    var state = {
      matchCount: 0,
      combo: '',
      codes: '',
      keycodes: ''
    };
    window.addEventListener('keydown', __readKeys(opts, state)); // run only once

    Globals.__KEYLANI_SETTINGS__.hasRun = true;
  } else if (true) {
    console.error(Globals.__KEYLANI_SETTINGS__.brand, Globals.__KEYLANI_SETTINGS__.mainDevColors, 'Invalid options object.');
    console.info(Globals.__KEYLANI_SETTINGS__.brand, Globals.__KEYLANI_SETTINGS__.sndDevColors, "'listen' options param should be an object with the following fields:\n\t\t{\n\t\t\tstyle: string|object, // required\n\t\t\tloud: boolean, // required\n\t\t\tkeyshow: boolean, // required\n\t\t\tloudTimer: number, // optional\n\t\t\tshowLoudData: boolean, // optional\n\t\t}");
    console.info(Globals.__KEYLANI_SETTINGS__.brand, Globals.__KEYLANI_SETTINGS__.sndDevColors, 'See docs for more: https://verdebydesign.github.io/keylani2/global.html#listen');
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


function bind(key, binding) {
  var label = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var when = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

  if (typeof key === 'string' && typeof binding === 'function' && typeof label === 'string' && typeof when === 'boolean') {
    __addToBindings(key, binding, label, when);

    return 1;
  } else if (true) {
    console.error(Globals.__KEYLANI_SETTINGS__.brand, Globals.__KEYLANI_SETTINGS__.mainDevColors, '\'bind\' must have the following params of the following types: ');
    console.info(Globals.__KEYLANI_SETTINGS__.brand, Globals.__KEYLANI_SETTINGS__.sndDevColors, '`Keylani.bind(key: string, binding: function, label: string, when: boolean)`');
    console.info(Globals.__KEYLANI_SETTINGS__.brand, Globals.__KEYLANI_SETTINGS__.sndDevColors, 'See docs for more: https://verdebydesign.github.io/keylani2/global.html#bind');
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
  if (Object.prototype.toString.call(bindings).includes('Object')) {
    var nBindings = JSON.parse(JSON.stringify(bindings));

    for (var binding in nBindings) {
      if ('bind' in bindings[binding] && 'label' in bindings[binding] && 'when' in bindings[binding]) {
        bind(binding, bindings[binding].bind, bindings[binding].label, bindings[binding].when);
      }
    }
  } else if (true) {
    console.error(Globals.__KEYLANI_SETTINGS__.brand, Globals.__KEYLANI_SETTINGS__.mainDevColors, 'Invalid bindings object.');
    console.info(Globals.__KEYLANI_SETTINGS__.brand, Globals.__KEYLANI_SETTINGS__.sndDevColors, "'map' bindings param should be an object of the following model:\n\t\t{\n\t\t\t[key]: string: {\n\t\t\t\tbind: function,\n\t\t\t\tlabel: string,\n\t\t\t\twhen: boolean\n\t\t\t}\n\t\t}");
    console.info(Globals.__KEYLANI_SETTINGS__.brand, Globals.__KEYLANI_SETTINGS__.sndDevColors, 'See docs for more: https://verdebydesign.github.io/keylani2/global.html#map');
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

var Keylani = {
  listen: listen,
  bind: bind,
  map: map,
  getAllBindings: getAllBindings
};

__readOnlyKeys(Keylani);

module.exports = Keylani;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/* global MINIMAL_BUILD, DEV */
var __KEYLANI_BINDINGS__ = {};
var __KEYLANI_SETTINGS__ = {
  keybindingAttr: '[data-keybind]',
  stateTimeout: 1500,
  hasRun: false,
  maxKeyLength: 0
};

if (true) {
  __KEYLANI_SETTINGS__.loudClass = 'keylani-loud';
  __KEYLANI_SETTINGS__.loudDataClass = 'keylani-loud-data';
  __KEYLANI_SETTINGS__.loudCharClass = 'keylani-loud-char';
  __KEYLANI_SETTINGS__.paintClass = 'keylani-binding';
  __KEYLANI_SETTINGS__.defaultLoudTimer = 700;
}

if (true) {
  __KEYLANI_SETTINGS__.brand = '%c Keylani ';
  __KEYLANI_SETTINGS__.mainDevColors = 'color: white; background: purple;';
  __KEYLANI_SETTINGS__.sndDevColors = 'color: black; background: #ead4e6;';
}

module.exports = {
  __KEYLANI_BINDINGS__: __KEYLANI_BINDINGS__,
  __KEYLANI_SETTINGS__: __KEYLANI_SETTINGS__
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*global MINIMAL_BUILD */
var Globals = __webpack_require__(1);

var __loudText =  true && __webpack_require__(3).__loudText;

function __readKeys(opts, state) {
  return function (event) {
    var pressed = event.key;
    var isExistingBind = Globals.__KEYLANI_BINDINGS__[pressed];
    state.matchCount++;

    __updateStateByCombo(state, event, pressed);

    if (__isSpecialCase(pressed, Globals.__KEYLANI_BINDINGS__)) {
      __resetState(state);
    }

    setInterval(function () {
      if (state.combo.length === 1) {
        __resetState(state);
      }
    }, Globals.__KEYLANI_SETTINGS__.stateTimeout);

    if (state.matchCount === 1 && isExistingBind && isExistingBind.isActive) {
      __cancelEvent(event);

      __keyMatchDone(pressed, isExistingBind, opts, {
        code: state.code,
        keyCode: state.keyCode,
        pressed: ++isExistingBind.pressed
      });

      __resetState(state);
    }

    if (Globals.__KEYLANI_BINDINGS__[state.combo] && Globals.__KEYLANI_BINDINGS__[state.combo].isActive) {
      __cancelEvent(event);

      var pressedCount = ++Globals.__KEYLANI_BINDINGS__[state.combo].pressed;

      __keyMatchDone(state.combo, Globals.__KEYLANI_BINDINGS__[state.combo], opts, {
        code: state.code,
        keyCode: state.keyCode,
        pressed: pressedCount
      });

      __resetState(state);
    } else if (state.matchCount >= Globals.__KEYLANI_SETTINGS__.maxKeyLength) {
      __resetState(state);
    }
  };
}

function __isValidateOpts(opts) {
  if (true) {
    var requiredSettings = Object.prototype.toString.call(opts).includes('Object') && 'loud' in opts && 'style' in opts && 'keyshow' in opts; // optional settings
    // loudTimer - A timer to hide the loud panel - number
    // showLoudData - toggles showing extra data for the key press - boolean

    return requiredSettings && (typeof opts.style === 'string' || Object.prototype.toString.call(opts.style).includes('Object')) && typeof opts.loud === 'boolean' && typeof opts.keyshow === 'boolean';
  }
}

function __addToBindings(key, binding, label, when) {
  var newBinding = {};
  key = key.replace(/\s/g, '');
  key = __verifyKeyNames(key);

  __getMaxLength(key.split('+').length);

  newBinding[key] = {
    key: key,
    binding: binding,
    label: label,
    isActive: when,
    pressed: 0
  };
  Globals.__KEYLANI_BINDINGS__[key] = newBinding[key];
}

function __getMaxLength(keyLength) {
  Globals.__KEYLANI_SETTINGS__.maxKeyLength = keyLength > Globals.__KEYLANI_SETTINGS__.maxKeyLength ? keyLength : Globals.__KEYLANI_SETTINGS__.maxKeyLength;
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
  if (state.combo.length) {
    state.combo += "+".concat(pressed);
    state.code += "+".concat(event.code);
    state.keyCode += "+".concat(event.keyCode);
  } else {
    state.combo = pressed;
    state.code = event.code;
    state.keyCode = event.keyCode;
  }
}

function __isSpecialCase(key, list) {
  var specialCaseChars = ['CapsLock', 'Enter', 'Shift'];
  return specialCaseChars.indexOf(key) !== -1 && !list[key];
}

function __keyMatchDone(key, actualBind, opts, eventProps) {
  var binding = actualBind.binding;
  var label = actualBind.label;
  var result = {
    key: key,
    label: label,
    code: eventProps.code,
    keyCode: eventProps.keyCode,
    pressed: eventProps.pressed
  };

  if (true) {
    eventProps.key = key;
    eventProps.label = label;
    eventProps.showLoudData = opts.showLoudData;

    __loudText(eventProps, opts.loudTimer);
  }

  if (typeof binding === 'function') {
    setTimeout(function () {
      binding(result);
    }, 500);
  }
}

function __verifyKeyNames(name) {
  var keys = {
    control: 'Control',
    ctrl: 'Control',
    alt: 'Alt',
    shift: 'Shift',
    esc: 'Esc',
    enter: 'Enter',
    tab: 'Tab',
    capslock: 'CapsLock'
  };
  var combo = name.split('+');
  var actualKey = keys[name.toLowerCase()];

  if (name.length > 1 && combo.length === 1 && !actualKey && __isWord(name)) {
    return __isWord(name);
  } else if (name.length === 1) {
    return actualKey ? actualKey : name;
  } else {
    return combo.map(function (k) {
      return keys[k.toLowerCase()] ? keys[k.toLowerCase()] : k;
    }).join('+');
  }
}

function __isWord(word) {
  var digits = 'abcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < word.length; i++) {
    if (digits.indexOf(word[i]) === -1) {
      return false;
    }
  }

  return word.split('').join('+');
}

function __readOnlyKeys(obj) {
  for (var key in obj) {
    if (key) {
      Object.defineProperty(obj, key, {
        writable: false,
        enumerable: false,
        configurable: false
      });
    }
  }
}

module.exports = {
  __readKeys: __readKeys,
  __isValidateOpts: __isValidateOpts,
  __addToBindings: __addToBindings,
  __readOnlyKeys: __readOnlyKeys,
  __isWord: __isWord
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var Globals = __webpack_require__(1);

function __loudPanel(opts) {
  if (opts.loud) {
    var headEl = document.head;
    var bodyEl = document.body;
    var loudStyleEl = document.createElement('style');
    var loudEl = document.createElement('div');
    var loudElChar = document.createElement('span');
    loudStyleEl.type = 'text/css';
    loudEl.className = Globals.__KEYLANI_SETTINGS__.loudClass;
    loudEl.style = 'display: none;';
    loudElChar.className = Globals.__KEYLANI_SETTINGS__.loudCharClass;
    var css = "\n\t\t\t.keylani-loud {\n\t\t\t\tmax-width: 200%;\n\t\t\t\tmargin: auto;\n\t\t\t\ttext-align: center;\n\t\t\t\twhite-space: nowrap;\n\t\t\t\toverflow: hidden;\n\t\t\t\ttext-overflow: ellipsis;\n\t\t\t\ttransition: all 1s;\n\t\t\t\tz-index: 999999999;\n\t\t\t}\n\n\t\t\t.keylani-loud-data {\n\t\t\t\twhite-space: nowrap;\n\t\t\t\toverflow: hidden;\n\t\t\t\ttext-overflow: ellipsis;\n\t\t\t}\n\t\t";

    if (loudStyleEl.styleSheet) {
      // This is required for IE8 and below.
      loudStyleEl.styleSheet.cssText = css;
    } else {
      loudStyleEl.appendChild(document.createTextNode(css));
    }

    headEl.appendChild(loudStyleEl);
    loudEl.appendChild(loudElChar);

    if (opts.showLoudData) {
      var loudElCode = document.createElement('p');
      var loudElPressed = document.createElement('p');
      var loudElKeyCode = document.createElement('p');
      var loudElLabel = document.createElement('p');
      loudElCode.className = Globals.__KEYLANI_SETTINGS__.loudDataClass;
      loudElPressed.className = Globals.__KEYLANI_SETTINGS__.loudDataClass;
      loudElKeyCode.className = Globals.__KEYLANI_SETTINGS__.loudDataClass;
      loudElLabel.className = Globals.__KEYLANI_SETTINGS__.loudDataClass;
      loudEl.appendChild(loudElLabel);
      loudEl.appendChild(loudElPressed);
      loudEl.appendChild(loudElCode);
      loudEl.appendChild(loudElKeyCode);
    }

    bodyEl.appendChild(loudEl);
  }
}

function __loudText(data) {
  var timer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Globals.__KEYLANI_SETTINGS__.defaultLoudTimer;

  if (Globals.__KEYLANI_BINDINGS__[data.key]) {
    var keylaniLoudEl = document.getElementsByClassName(Globals.__KEYLANI_SETTINGS__.loudClass)[0];

    if (keylaniLoudEl) {
      keylaniLoudEl.style = 'display: block;';
      keylaniLoudEl.children[0].innerText = data.key;

      if (data.showLoudData) {
        keylaniLoudEl.children[1].innerText = data.label;
        keylaniLoudEl.children[2].innerText = data.pressed;
        keylaniLoudEl.children[3].innerText = data.code;
        keylaniLoudEl.children[4].innerText = data.keyCode;
      }

      setTimeout(function () {
        keylaniLoudEl.style = 'display: none;';
        keylaniLoudEl.children[0].innerText = '';

        if (data.showLoudData) {
          keylaniLoudEl.children[1].innerText = '';
          keylaniLoudEl.children[2].innerText = '';
          keylaniLoudEl.children[3].innerText = '';
          keylaniLoudEl.children[4].innerText = '';
        }
      }, timer || Globals.__KEYLANI_SETTINGS__.defaultLoudTimer);
    }
  }
}

module.exports = {
  __loudPanel: __loudPanel,
  __loudText: __loudText
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var Globals = __webpack_require__(1);

var _require = __webpack_require__(2),
    __addToBindings = _require.__addToBindings,
    __isWord = _require.__isWord;

var _require2 = __webpack_require__(3),
    __loudPanel = _require2.__loudPanel;

function __listenDOM(opts) {
  var dataKeyBindings = document.querySelectorAll(Globals.__KEYLANI_SETTINGS__.keybindingAttr);

  for (var i = 0; i < dataKeyBindings.length; i++) {
    var elem = dataKeyBindings[i];

    var domBind = __readDomBinding(elem.dataset.keybind);

    __paintHtml(opts, elem);

    if (domBind.length) {
      __addToBindings(domBind[0], window[domBind[1]] || null, elem.dataset.keylabel || '', elem.dataset.keywhen !== 'false');
    }
  }
}

function __addLoudPanel(opts) {
  __loudPanel(opts);
}

function __readDomBinding(keybinding) {
  if (keybinding && keybinding.includes(':')) {
    keybinding = keybinding.replace(/\s/g, '');
    return keybinding.split(':');
  }

  return [];
}

function __paintHtml(opts, boundEl) {
  if (__canShowTag(opts.keyshow, boundEl)) {
    var keyTag = document.createElement('span');
    keyTag.className = Globals.__KEYLANI_SETTINGS__.paintClass;

    var domBind = __readDomBinding(boundEl.dataset.keybind);

    if (domBind.length) {
      keyTag.innerHTML = __isWord(domBind[0]) ? __isWord(domBind[0]) : domBind[0];

      if (typeof opts.style === 'string') {
        keyTag.className += " ".concat(opts.style);
      } else {
        for (var rule in opts.style) {
          keyTag.style[rule] = opts.style[rule];
        }
      }

      boundEl.appendChild(keyTag);
    }
  }
}

function __canShowTag(keyshow, elem) {
  return elem && elem.dataset && elem.dataset.keybind && keyshow && elem.dataset.keyshow === undefined || elem.dataset.keyshow === 'true';
}

module.exports = {
  __listenDOM: __listenDOM,
  __addLoudPanel: __addLoudPanel
};

/***/ })
/******/ ]);
});
//# sourceMappingURL=keylani.js.map