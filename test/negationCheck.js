const chai = require('chai');
const similarity = require('../helper/similarityCheck');
const negation = require('../helper/negationCheck');
const should = chai.should();

describe('Negation check', function() {

  describe('helper/negationCheck.js', function() {

    it('should return error status when inputs are/is empty', function() {
      negation().status.should.equal('error');
      negation().message.should.equal('string and string array must not be empty');
    });

    it('should return error status when inputs are not string and array', function() {
      negation(123, 'asd').status.should.equal('error');
      negation(123, 'asd').message.should.equal('first params must be string and second params must be an array of strings');
    });

    it('should return success status and ', function() {
      negation(123, 'asd').status.should.equal('error');
      negation(123, 'asd').message.should.equal('first params must be string and second params must be an array of strings');
    });

  });


});
