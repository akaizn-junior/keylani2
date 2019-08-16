const {describe} = require('mocha');
const {expect} = require('chai');
const {spy} = require('sinon');

const {bind, map, getAllBindings} = require('../keylani.dev');

describe('Testing Keylani Dev Version', () => {

	let getAllBindingsSpy;

	beforeEach(() => {
		getAllBindingsSpy = spy(getAllBindings);
	});

	afterEach(() => {
		getAllBindingsSpy.reset();
	});

	it('should test bind with default values', () => {
		let bindSpy = spy(bind);
		let cb = spy();

		let res = bindSpy('a', cb);

		expect(bindSpy.getCall(0).args[0]).to.equal('a').and.to.be.a('string');
		expect(bindSpy.getCall(0).args[1]).to.equal(cb).and.to.be.a('function');
		expect(res).to.equal(1);
	});

	it('should test bind with all values', () => {
		let bindSpy = spy(bind);
		let cb = spy();
		let label = 'Key pressed from bind';
		let when = true;
		let key = 'a';

		let res = bindSpy(key, cb, label, when);

		expect(bindSpy.getCall(0).args[0]).to.equal(key).and.to.be.a('string');
		expect(bindSpy.getCall(0).args[1]).to.equal(cb).and.to.be.a('function');
		expect(bindSpy.getCall(0).args[2]).to.equal(label).and.to.be.a('string');
		expect(bindSpy.getCall(0).args[3]).to.equal(when).and.to.be.a('boolean');
		expect(res).to.equal(1);
	});

	it('should test bind with wrong values', () => {
		let bindSpy = spy(bind);
		let cb = spy();
		let label = 22;
		let when = false;
		let key = 1;

		let res = bindSpy(key, cb, label, when);
		expect(res).to.equal(0);
	});

	it('should test map with an empty object', () => {
		let mapSpy = spy(map);

		let bindings = {};

		mapSpy(bindings);
		expect(mapSpy.getCall(0).args[0]).to.be.an('object');
		expect('length' in mapSpy.getCall(0).args[0]).to.be.false;

		expect(allBindings).to.deep.equal({});
	});

	it('should test map with an object with all props', () => {
		let mapSpy = spy(map);
		let key = 'a';

		let bindings = {
			[key]: {
				key: key,
				bind: spy(),
				label: '',
				when: true
			}
		};

		mapSpy(bindings);
		expect(mapSpy.getCall(0).args[0]).to.be.an('object');
		expect('length' in mapSpy.getCall(0).args[0]).to.be.false;
		expect(key in mapSpy.getCall(0).args[0]).to.be.true;
		expect(mapSpy.getCall(0).args[0][key]).to.be.an('object');

		expect('key' in mapSpy.getCall(0).args[0][key]).to.be.true;
		expect('bind' in mapSpy.getCall(0).args[0][key]).to.be.true;
		expect('label' in mapSpy.getCall(0).args[0][key]).to.be.true;
		expect('when' in mapSpy.getCall(0).args[0][key]).to.be.true;
	});
});
