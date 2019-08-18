const Globals = require('./keylani.globals');

function __loudPanel(opts) {
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

function __loudText(data, timer = Globals.__KEYLANI_SETTINGS__.defaultLoudTimer) {
	if(Globals.__KEYLANI_BINDINGS__[data.key]) {
		let keylaniLoudEl = document.getElementsByClassName(Globals.__KEYLANI_SETTINGS__.loudClass)[0];
		if(keylaniLoudEl) {
			keylaniLoudEl.style = 'display: block;';
			keylaniLoudEl.children[0].innerText = data.key;

			if(data.showLoudData) {
				keylaniLoudEl.children[1].innerText = data.label;
				keylaniLoudEl.children[2].innerText = data.pressed;
				keylaniLoudEl.children[3].innerText = data.code;
				keylaniLoudEl.children[4].innerText = data.keyCode;
			}

			setTimeout(function() {
				keylaniLoudEl.style = 'display: none;';
				keylaniLoudEl.children[0].innerText = '';

				if(data.showLoudData) {
					keylaniLoudEl.children[1].innerText = '';
					keylaniLoudEl.children[2].innerText = '';
					keylaniLoudEl.children[3].innerText = '';
					keylaniLoudEl.children[4].innerText = '';
				}
			}, timer || Globals.__KEYLANI_SETTINGS__.defaultLoudTimer);
		}
	}
}

module.exports = { __loudPanel, __loudText };
