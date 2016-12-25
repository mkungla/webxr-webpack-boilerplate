const describe = require('mocha').describe;
const it = require('mocha').it;
const expect = require('chai').expect;

describe('Some basic math', () => {
  it('Should be able to to some math :)', () => {
    const result_we_want = 12;
    expect(2 * 50 / 10 + 2).to.equal(result_we_want);
  });
});

describe('Can use promise', () => {
  it('MUST succeed as soon as promise is resolved', () => {
    const has_success = Promise.resolve('success');
    return has_success.then(function(value) {
      expect(value).to.equal('success');
    });
  });
});

describe('Can have async tests', () => {
  it('Callback done should be called.', (done) => {
    setTimeout(() => done(), 5);
  });
});
