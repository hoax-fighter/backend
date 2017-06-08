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

    it('should return result true if "madrid tidak juara" and "madrid juara" are compared', function() {
      const string = 'madrid tidak juara';
      const array = ['madrid juara', 'juventus bukan payah'];
      negation(string, array).status.should.equal('success');
      negation(string, array).result.should.equal(true);
      negation(string, array).message.should.equal('the string without negation finds similarity > 90 %, most likely a hoax');
    });

    it('should return result false if "madrid tidak juara" and "persib juara" are compared', function() {
      const string = 'madrid tidak juara';
      const array = ['persib juara', 'juventus bukan payah'];
      negation(string, array).status.should.equal('success');
      negation(string, array).result.should.equal(false);
      negation(string, array).message.should.equal('no title is higher than 75% in similarity');
    });

  });


});
