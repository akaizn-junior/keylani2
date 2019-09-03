/* global
	describe,
	beforeEach,
	it,
	chai,
	sinon,
	Keylani,
	Globals,
	DOMinterface
*/

describe('Testing Keylani Interface', () => {
	let getAllBindingsSpy;
	let globalCb = sinon.spy();

	beforeEach(() => {
		getAllBindingsSpy = sinon.spy(Keylani.getAllBindings);
	});

	it('should test bind with default values', () => {
		let bindSpy = sinon.spy(Keylani.bind);
		let cb = sinon.spy();
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

		chai.expect(bindSpy.getCall(0).args[0]).to.equal(key).and.to.be.a('string');
		chai.expect(bindSpy.getCall(0).args[1]).to.equal(cb).and.to.be.a('function');
		chai.expect(keybindings).to.deep.equal(expected);

		chai.expect(res).to.equal(1);
		delete keybindings[key];
	});

	it('should test bind with all values', () => {
		let bindSpy = sinon.spy(Keylani.bind);
		let cb = sinon.spy();
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

		chai.expect(bindSpy.getCall(0).args[0]).to.equal(key).and.to.be.a('string');
		chai.expect(bindSpy.getCall(0).args[1]).to.equal(cb).and.to.be.a('function');
		chai.expect(bindSpy.getCall(0).args[2]).to.equal(label).and.to.be.a('string');
		chai.expect(bindSpy.getCall(0).args[3]).to.equal(when).and.to.be.a('boolean');
		chai.expect(keybindings).to.deep.equal(expected);

		chai.expect(res).to.equal(1);
		delete keybindings[key];
	});

	it('should test bind with wrong values', () => {
		let bindSpy = sinon.spy(Keylani.bind);
		let cb = sinon.spy();
		let label = 22;
		let when = false;
		let key = 1;
		let keybindings = getAllBindingsSpy();

		let res = bindSpy(key, cb, label, when);
		chai.expect(keybindings).to.deep.equal({});
		chai.expect(res).to.equal(0);
	});

	it('should test map with an empty object', () => {
		let mapSpy = sinon.spy(Keylani.map);
		let bindings = {};
		let keybindings = getAllBindingsSpy();

		mapSpy(bindings);
		chai.expect(mapSpy.getCall(0).args[0]).to.be.an('object');
		chai.expect('length' in mapSpy.getCall(0).args[0]).to.be.false;
		chai.expect(keybindings).to.deep.equal({});
	});

	it('should test map with an array', () => {
		let mapSpy = sinon.spy(Keylani.map);
		let bindings = [];
		let keybindings = getAllBindingsSpy();

		mapSpy(bindings);
		chai.expect(mapSpy.getCall(0).args[0]).to.not.be.an('object');
		chai.expect('length' in mapSpy.getCall(0).args[0]).to.not.be.false;
		chai.expect(keybindings).to.deep.equal({});
	});

	it('should test map with an object with missing keys', () => {
		let mapSpy = sinon.spy(Keylani.map);
		let keybindings = getAllBindingsSpy();
		let bindings = {
			a: {
				key: 'a',
				when: true,
				bind: sinon.spy()
			}
		};

		mapSpy(bindings);
		chai.expect(mapSpy.getCall(0).args[0]).to.be.an('object');
		chai.expect('length' in mapSpy.getCall(0).args[0]).to.be.false;
		chai.expect(keybindings).to.deep.equal({});
	});

	it('should test map with an object with all props', () => {
		sinon.spy(JSON, 'parse');

		let mapSpy = sinon.spy(Keylani.map);
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
		chai.expect(mapSpy.getCall(0).args[0]).to.be.an('object');
		chai.expect('length' in mapSpy.getCall(0).args[0]).to.be.false;
		chai.expect(keyA in mapSpy.getCall(0).args[0]).to.be.true;
		chai.expect(mapSpy.getCall(0).args[0][keyA]).to.be.an('object');

		chai.expect('key' in mapSpy.getCall(0).args[0][keyA]).to.be.true;
		chai.expect('bind' in mapSpy.getCall(0).args[0][keyA]).to.be.true;
		chai.expect('label' in mapSpy.getCall(0).args[0][keyA]).to.be.true;
		chai.expect('when' in mapSpy.getCall(0).args[0][keyA]).to.be.true;

		chai.expect(JSON.parse.calledOnce).to.be.true;
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

		chai.expect(keybindings).to.deep.equal(expected);

		delete keybindings[keyA];
		delete keybindings[keyB];
	});

	it('should test listen with missing options (loud)', () => {
		let listenSpy = sinon.spy(Keylani.listen);
		let opts = {
			style: '',
			keyshow: false
		};

		listenSpy(opts);
		chai.expect(Globals.__KEYLANI_SETTINGS__.hasRun).to.be.false;
	});

	it('should test listen with missing options (style)', () => {
		let listenSpy = sinon.spy(Keylani.listen);

		let opts = {
			keyshow: true,
			loud: true
		};

		listenSpy(opts);
		chai.expect(Globals.__KEYLANI_SETTINGS__.hasRun).to.be.false;
	});

	it('should test listen with missing options (keyshow)', () => {
		let listenSpy = sinon.spy(Keylani.listen);

		let opts = {
			style: '',
			loud: true
		};

		listenSpy(opts);
		chai.expect(Globals.__KEYLANI_SETTINGS__.hasRun).to.be.false;
	});

	it('should test listen with all options', () => {
		let listenSpy = sinon.spy(Keylani.listen);

		sinon.spy(window, 'addEventListener');
		sinon.spy(DOMinterface, '__addLoudPanel');
		sinon.spy(DOMinterface, '__listenDOM');

		let opts = {
			style: 'key-class',
			keyshow: true,
			loud: true,
			loudTimer: 5500,
			showLoudData: true
		};

		listenSpy(opts);

		chai.expect(DOMinterface.__addLoudPanel.calledOnce).to.be.true;
		chai.expect(DOMinterface.__listenDOM.calledOnce).to.be.true;
		chai.expect(Globals.__KEYLANI_SETTINGS__.hasRun).to.be.true;
		chai.expect(window.addEventListener.calledOnce).to.be.true;
	});
});
