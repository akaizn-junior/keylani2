const { describe, it, beforeEach } = require('mocha');
const { expect } = require('chai');
const { spy } = require('sinon');
const fakeDOM = require('jsdom-global');
// lib
const {bind, map, getAllBindings, listen} = require('../keylani.interface');
const Globals = require('../keylani.globals');
const DOMinterface = require('../keylani.dom');

describe('Testing Keylani Interface', () => {
	let getAllBindingsSpy;
	let globalCb = spy();
	let destroyFakeDOM;

	beforeEach(() => {
		getAllBindingsSpy = spy(getAllBindings);
	});

	it('should initialize a fake DOM', () => {
		destroyFakeDOM = fakeDOM();
	});

	it('should test bind with default values', () => {
		let bindSpy = spy(bind);
		let cb = spy();
		let key = 'a';

		let res = bindSpy(key, cb);

		let keybindings = getAllBindingsSpy();
		let expected = {
			[key]: {
				key,
				binding: cb,
				label: '',
				pressed: 0,
				isActive: true
			}
		};

		expect(bindSpy.getCall(0).args[0]).to.equal(key).and.to.be.a('string');
		expect(bindSpy.getCall(0).args[1]).to.equal(cb).and.to.be.a('function');
		expect(keybindings).to.deep.equal(expected);

		expect(res).to.equal(1);
		delete keybindings[key];
	});

	it('should test bind with all values', () => {
		let bindSpy = spy(bind);
		let cb = spy();
		let label = 'Key pressed from bind';
		let when = true;
		let key = 'b';

		let res = bindSpy(key, cb, label, when);
		let keybindings = getAllBindingsSpy();

		let expected = {
			[key]: {
				key,
				binding: cb,
				label,
				pressed: 0,
				isActive: true
			}
		};

		expect(bindSpy.getCall(0).args[0]).to.equal(key).and.to.be.a('string');
		expect(bindSpy.getCall(0).args[1]).to.equal(cb).and.to.be.a('function');
		expect(bindSpy.getCall(0).args[2]).to.equal(label).and.to.be.a('string');
		expect(bindSpy.getCall(0).args[3]).to.equal(when).and.to.be.a('boolean');
		expect(keybindings).to.deep.equal(expected);

		expect(res).to.equal(1);
		delete keybindings[key];
	});

	it('should test bind with wrong values', () => {
		let bindSpy = spy(bind);
		let cb = spy();
		let label = 22;
		let when = false;
		let key = 1;
		let keybindings = getAllBindingsSpy();

		let res = bindSpy(key, cb, label, when);
		expect(keybindings).to.deep.equal({});
		expect(res).to.equal(0);
	});

	it('should test map with an empty object', () => {
		let mapSpy = spy(map);
		let bindings = {};
		let keybindings = getAllBindingsSpy();

		mapSpy(bindings);
		expect(mapSpy.getCall(0).args[0]).to.be.an('object');
		expect('length' in mapSpy.getCall(0).args[0]).to.be.false;
		expect(keybindings).to.deep.equal({});
	});

	it('should test map with an array', () => {
		let mapSpy = spy(map);
		let bindings = [];
		let keybindings = getAllBindingsSpy();

		mapSpy(bindings);
		expect(mapSpy.getCall(0).args[0]).to.not.be.an('object');
		expect('length' in mapSpy.getCall(0).args[0]).to.not.be.false;
		expect(keybindings).to.deep.equal({});
	});

	it('should test map with an object with missing keys', () => {
		let mapSpy = spy(map);
		let keybindings = getAllBindingsSpy();
		let bindings = {
			a: {
				key: 'a',
				when: true,
				bind: spy()
			}
		};

		mapSpy(bindings);
		expect(mapSpy.getCall(0).args[0]).to.be.an('object');
		expect('length' in mapSpy.getCall(0).args[0]).to.be.false;
		expect(keybindings).to.deep.equal({});
	});

	it('should test map with an object with all props', () => {
		spy(JSON, 'parse');

		let mapSpy = spy(map);
		let keyA = 'a';
		let keyB = 'b';
		let cb = globalCb;

		let bindings = {
			[keyA]: {
				key: keyA,
				bind: cb,
				label: 'key a',
				when: false
			},
			[keyB]: {
				key: keyB,
				bind: cb,
				label: 'key b',
				when: true
			}
		};

		mapSpy(bindings);
		expect(mapSpy.getCall(0).args[0]).to.be.an('object');
		expect('length' in mapSpy.getCall(0).args[0]).to.be.false;
		expect(keyA in mapSpy.getCall(0).args[0]).to.be.true;
		expect(mapSpy.getCall(0).args[0][keyA]).to.be.an('object');

		expect('key' in mapSpy.getCall(0).args[0][keyA]).to.be.true;
		expect('bind' in mapSpy.getCall(0).args[0][keyA]).to.be.true;
		expect('label' in mapSpy.getCall(0).args[0][keyA]).to.be.true;
		expect('when' in mapSpy.getCall(0).args[0][keyA]).to.be.true;

		expect(JSON.parse.calledOnce).to.be.true;
		JSON.parse.restore();
	});

	it('should have all keys added with map', () => {
		let keyA = 'a';
		let keyB = 'b';
		let keybindings = getAllBindingsSpy();
		let cb = globalCb;

		let expected = {
			[keyA]: {
				key: keyA,
				binding: cb,
				label: 'key a',
				pressed: 0,
				isActive: false
			},
			[keyB]: {
				key: keyB,
				binding: cb,
				label: 'key b',
				pressed: 0,
				isActive: true
			}
		};

		expect(keybindings).to.deep.equal(expected);

		delete keybindings[keyA];
		delete keybindings[keyB];
	});

	it('should test listen with missing options (loud)', () => {
		let listenSpy = spy(listen);
		let opts = {
			style: '',
			keyshow: false
		};

		listenSpy(opts);
		expect(Globals.__KEYLANI_SETTINGS__.hasRun).to.be.false;
	});

	it('should test listen with missing options (style)', () => {
		let listenSpy = spy(listen);
		let opts = {
			keyshow: true,
			loud: true
		};

		listenSpy(opts);
		expect(Globals.__KEYLANI_SETTINGS__.hasRun).to.be.false;
	});

	it('should test listen with missing options (keyshow)', () => {
		let listenSpy = spy(listen);
		let opts = {
			style: '',
			loud: true
		};

		listenSpy(opts);
		expect(Globals.__KEYLANI_SETTINGS__.hasRun).to.be.false;
	});

	it('should test listen with all options', () => {
		spy(window, 'addEventListener');
		spy(DOMinterface, '__addLoudPanel');
		spy(DOMinterface, '__listenDOM');

		let listenSpy = spy(listen);
		let opts = {
			style: '',
			keyshow: true,
			loud: true,
			loudTimer: 5500,
			showLoudData: true
		};

		listenSpy(opts);
		expect(Globals.__KEYLANI_SETTINGS__.hasRun).to.be.true;
		expect(window.addEventListener.calledOnce).to.be.true;
		expect(DOMinterface.__addLoudPanel.calledOnce).to.be.true;
		expect(DOMinterface.__listenDOM.calledOnce).to.be.true;
	});

	it('should clean up the fake DOM', () => {
		destroyFakeDOM();
	});
});
