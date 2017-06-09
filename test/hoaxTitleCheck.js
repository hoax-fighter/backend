const chai = require('chai');
const should = chai.should();
const indications = require('../helper/hoaxRulesCheck');

describe('Check input title for hoax indications', function() {

  describe('helper/hoaxRulesCheck.js', function() {

    it('should return status error if input is empty', function() {
      indications.check().status.should.equal('error');
      indications.check().message.should.equal('input must not be empty');
    });

    it('should return status error if input is not string', function() {
      indications.check(123).status.should.equal('error');
      indications.check(123).message.should.equal('input must be string');
    });

    it('should return status error if input length is 0', function() {
      indications.check('').status.should.equal('error');
      indications.check('').message.should.equal('input must not be empty');
    });

    it('should return status = success and summary = false if input = "ada udang di balik batu"', function() {
      const string = 'ada udang di balik batu';
      indications.check(string).status.should.equal('success');
      indications.check(string).summary.should.equal(false);
    });

    it('should return status = success and summary = true if input = "ada UDANG di BALIK BATU"', function() {
      const string = 'ada UDANG di BALIK BATU';
      indications.check(string).status.should.equal('success');
      indications.check(string).summary.should.equal(true);
    });

    it('should return status = success and summary = true if input = "ada udang di balik batu!!!!"', function() {
      const string = 'ada udang di balik batu!!!!';
      indications.check(string).status.should.equal('success');
      indications.check(string).summary.should.equal(true);
    });

    it('should return status = success and summary = true if input = "WOW! ada udang di balik batu!"', function() {
      const string = 'WOW! ada udang di balik batu!';
      indications.check(string).status.should.equal('success');
      indications.check(string).summary.should.equal(true);
    });



  });

});
