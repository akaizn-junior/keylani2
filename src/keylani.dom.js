const Globals = require('./keylani.globals');
const {__addToBindings} = require('./keylani.helpers');

// DOM ************************************************************

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
			keyTag.innerHTML = domBind[0];

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

function __addLoudPanel(opts) {
	if(opts.loud) {
		let headEl = document.head;
		let bodyEl = document.body;
		let loudStyleEl = document.createElement('style');

		let loudEl = document.createElement('div');
		let loudElChar = document.createElement('span');

		loudStyleEl.type = 'text/css';
		loudEl.className = Globals.__KEYLANI_SETTINGS__.loudClass;
		loudEl.style = 'display: none;';

		loudElChar.className = Globals.__KEYLANI_SETTINGS__.loudCharClass;

		let css = `
			.keylani-loud {
				max-width: 200%;
				margin: auto;
				text-align: center;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				transition: all 1s;
				z-index: 999999999;
			}

			.keylani-loud-data {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		`;

		if(loudStyleEl.styleSheet) {
			// This is required for IE8 and below.
			loudStyleEl.styleSheet.cssText = css;
		} else {
			loudStyleEl.appendChild(document.createTextNode(css));
		}

		headEl.appendChild(loudStyleEl);
		loudEl.appendChild(loudElChar);

		if(opts.showLoudData) {
			let loudElCode = document.createElement('p');
			let loudElPressed = document.createElement('p');
			let loudElKeyCode = document.createElement('p');
			let loudElLabel = document.createElement('p');

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

module.exports = {
	__addLoudPanel,
	__listenDOM
};
