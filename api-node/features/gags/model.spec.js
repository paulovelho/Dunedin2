var expect = require('chai').expect;

var Gag = require('./model');
var mocks = require('../../test-helpers/_mocks');
 
describe('Gag model', () => {
  it('should be invalid if basic data is empty', (done) => {
    var m = new Gag();

    m.validate((err) => {
      expect(err.errors.content).to.exist;
      expect(err.errors.author).to.exist;
      expect(err.errors.origin).to.exist;
      done();
    });
  });

  it('should validate if all data is correct', (done) => {
    var data = mocks.Gags.getRandom();
    var m = new Gag(data);
    m.validate((err) => {
      expect(err).to.null;
      done();
    });
  });

});
