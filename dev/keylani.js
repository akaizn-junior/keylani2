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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/keylani.interface.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/keylani.dom.js":
/*!****************************!*\
  !*** ./src/keylani.dom.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Globals = __webpack_require__(/*! ./keylani.globals */ "./src/keylani.globals.js");

var _require = __webpack_require__(/*! ./keylani.helpers */ "./src/keylani.helpers.js"),
    __addToBindings = _require.__addToBindings;

var _require2 = __webpack_require__(/*! ./keylani.loud */ "./src/keylani.loud.js"),
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
      keyTag.innerHTML = domBind[0];

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

/***/ }),

/***/ "./src/keylani.globals.js":
/*!********************************!*\
  !*** ./src/keylani.globals.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var __KEYLANI_BINDINGS__ = {};
var __KEYLANI_SETTINGS__ = {
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
module.exports = {
  __KEYLANI_BINDINGS__: __KEYLANI_BINDINGS__,
  __KEYLANI_SETTINGS__: __KEYLANI_SETTINGS__
};

/***/ }),

/***/ "./src/keylani.helpers.js":
/*!********************************!*\
  !*** ./src/keylani.helpers.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Globals = __webpack_require__(/*! ./keylani.globals */ "./src/keylani.globals.js");

var _require = __webpack_require__(/*! ./keylani.loud */ "./src/keylani.loud.js"),
    __loudText = _require.__loudText;

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

    if (state.matchCount === 1 && isExistingBind && isExistingBind.when) {
      __cancelEvent(event);

      __keyMatchDone(pressed, isExistingBind, opts, {
        code: state.code,
        keyCode: state.keyCode,
        pressed: ++isExistingBind.pressed
      });

      __resetState(state);
    }

    if (Globals.__KEYLANI_BINDINGS__[state.combo] && Globals.__KEYLANI_BINDINGS__[state.combo].when) {
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
  var requiredSettings = Object.prototype.toString.call(opts).includes('Object') && 'loud' in opts && 'style' in opts && 'keyshow' in opts; // optional settings
  // loudTimer - A timer to hide the loud panel
  // showLoudData - toggles showing extra data for the key press

  return requiredSettings && (typeof opts.style === 'string' || Object.prototype.toString.call(opts).includes('Object')) && typeof opts.loud === 'boolean' && typeof opts.keyshow === 'boolean';
}

function __addToBindings(key, binding, label, when) {
  var newBinding = {};
  key = key.replace(/\s/g, '');
  var keyLength = key.split('+').length;
  var pressed = 0;
  Globals.__KEYLANI_SETTINGS__.maxKeyLength = keyLength > Globals.__KEYLANI_SETTINGS__.maxKeyLength ? keyLength : Globals.__KEYLANI_SETTINGS__.maxKeyLength;
  newBinding[key] = {
    key: key,
    binding: binding,
    label: label,
    when: when,
    pressed: pressed
  };
  Globals.__KEYLANI_BINDINGS__[key] = newBinding[key];
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
  eventProps.key = key;
  eventProps.label = label;
  eventProps.showLoudData = opts.showLoudData;

  __loudText(eventProps, opts.loudTimer);

  typeof binding === 'function' && binding(result);
}

module.exports = {
  __readKeys: __readKeys,
  __isValidateOpts: __isValidateOpts,
  __addToBindings: __addToBindings
};

/***/ }),

/***/ "./src/keylani.interface.js":
/*!**********************************!*\
  !*** ./src/keylani.interface.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Keylani
 * (c) 2019 Verdexdesign - An open source Org by Simao Nziaka <sdnziaka@gmail.com>
 * ISC Licensed
 */
var Globals = __webpack_require__(/*! ./keylani.globals */ "./src/keylani.globals.js");

var _require = __webpack_require__(/*! ./keylani.helpers */ "./src/keylani.helpers.js"),
    __isValidateOpts = _require.__isValidateOpts,
    __readKeys = _require.__readKeys,
    __addToBindings = _require.__addToBindings;

var DOMinterface = __webpack_require__(/*! ./keylani.dom */ "./src/keylani.dom.js");

function listen(opts) {
  if (!Globals.__KEYLANI_SETTINGS__.hasRun && __isValidateOpts(opts)) {
    var parsedOpts = JSON.parse(JSON.stringify(opts));

    DOMinterface.__addLoudPanel(parsedOpts);

    DOMinterface.__listenDOM(parsedOpts);

    var state = {
      matchCount: 0,
      combo: '',
      codes: '',
      keycodes: ''
    };
    window.addEventListener('keydown', __readKeys(parsedOpts, state)); // run only once

    Globals.__KEYLANI_SETTINGS__.hasRun = true;
  }
}

function bind(key, binding) {
  var label = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var when = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

  if (typeof key === 'string' && typeof binding === 'function' && typeof label === 'string' && typeof when === 'boolean') {
    __addToBindings(key, binding, label, when);

    return 1;
  }

  return 0;
}

function map(bindings) {
  if (Object.prototype.toString.call(bindings).includes('Object')) {
    var nBindings = JSON.parse(JSON.stringify(bindings));

    for (var binding in nBindings) {
      if ('bind' in bindings[binding] && 'label' in bindings[binding] && 'when' in bindings[binding]) {
        bind(binding, bindings[binding].bind, bindings[binding].label, bindings[binding].when);
      }
    }
  }
}

function getAllBindings() {
  return Globals.__KEYLANI_BINDINGS__;
}

module.exports = {
  listen: listen,
  bind: bind,
  map: map,
  getAllBindings: getAllBindings
};

/***/ }),

/***/ "./src/keylani.loud.js":
/*!*****************************!*\
  !*** ./src/keylani.loud.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Globals = __webpack_require__(/*! ./keylani.globals */ "./src/keylani.globals.js");

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

/***/ })

/******/ });
});
//# sourceMappingURL=keylani.js.map