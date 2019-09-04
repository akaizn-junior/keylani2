const Globals = require('./keylani.globals');
const {__addToBindings, __isWord} = require('./keylani.helpers');
const {__loudPanel} = require('./keylani.loud');

function __listenDOM(opts) {
	const dataKeyBindings = document.querySelectorAll(Globals.__KEYLANI_SETTINGS__.keybindingAttr);
	for(let i = 0; i < dataKeyBindings.length; i++) {
		let elem = dataKeyBindings[i];
		let domBind = __readDomBinding(elem.dataset.keybind);
		__paintHtml(opts, elem);
		if(domBind.length) {
			__addToBindings(
				domBind[0],
				window[domBind[1]] || null,
				elem.dataset.keylabel || '',
				elem.dataset.keywhen !== 'false'
			);
		}
	}
}

function __addLoudPanel(opts) {
	__loudPanel(opts);
}

function __readDomBinding(keybinding) {
	if(keybinding && keybinding.includes(':')) {
		keybinding = keybinding.replace(/\s/g, '');
		return keybinding.split(':');
	}
	return [];
}

function __paintHtml(opts, boundEl) {
	if(__canShowTag(opts.keyshow, boundEl)) {
		let keyTag = document.createElement('span');
		keyTag.className = Globals.__KEYLANI_SETTINGS__.paintClass;
		let domBind = __readDomBinding(boundEl.dataset.keybind);

		if(domBind.length) {
			keyTag.innerHTML = __isWord(domBind[0]) ? __isWord(domBind[0]) : domBind[0];

			if(typeof opts.style === 'string') {
				keyTag.className += ` ${opts.style}`;
			} else {
				for(let rule in opts.style) {
					keyTag.style[rule] = opts.style[rule];
				}
			}

			boundEl.appendChild(keyTag);
		}
	}
}

function __canShowTag(keyshow, elem) {
	return (
		elem
		&& elem.dataset
		&& elem.dataset.keybind
		&& keyshow
		&& elem.dataset.keyshow === undefined
		|| elem.dataset.keyshow === 'true'
	);
}

module.exports = { __listenDOM, __addLoudPanel };
