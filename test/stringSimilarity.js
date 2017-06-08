const chai = require('chai');
const similarity = require('../helper/similarityCheck');
const should = chai.should();

describe('String Similarity Check', function() {

  describe('helper/similarity.js jarowinkler', function() {

    it('should return value in percent which represent similarity of two strings', function() {
      const string1 = 'apalah';
      const string2 = 'apakah';
      similarity.jarowinkler(string1, string2).status.should.equal('success');
      similarity.jarowinkler(string1, string2).value.should.be.a('number');
      similarity.jarowinkler(string1, string2).value.should.not.equal(0);
      similarity.jarowinkler(string1, string2).value.should.not.equal(100);
    });

    it('should return value 100 in percent if the strings are exactly similar', function() {
      const string1 = 'apalah';
      const string2 = 'apalah';
      similarity.jarowinkler(string1, string2).status.should.equal('success');
      similarity.jarowinkler(string1, string2).value.should.be.a('number');
      similarity.jarowinkler(string1, string2).value.should.equal(100);
    });

    it('should return error if one of the inputs is not a string', function() {
      const string1 = 123;
      const string2 = 'apalah';
      similarity.jarowinkler(string1, string2).status.should.equal('error');
      similarity.jarowinkler(string1, string2).message.should.equal('inputs must be strings');
    });

    it('should return error if one of the inputs is empty', function() {
      const string1 = '';
      const string2 = 'apalah';
      similarity.jarowinkler(string1, string2).status.should.equal('error');
      similarity.jarowinkler(string1, string2).message.should.equal('inputs must not be empty');
    });

  });

  describe('helper/similarity.js levenshtein', function() {

    it('should return value in percent which represent similarity of two strings', function() {
      const string1 = 'apalah';
      const string2 = 'apakah';
      similarity.levenshtein(string1, string2).status.should.equal('success');
      similarity.levenshtein(string1, string2).value.should.be.a('number');
      similarity.levenshtein(string1, string2).value.should.not.equal(0);
      similarity.levenshtein(string1, string2).value.should.not.equal(100);
    });

    it('should return value 100 in percent if the strings are exactly similar', function() {
      const string1 = 'apalah';
      const string2 = 'apalah';
      similarity.levenshtein(string1, string2).status.should.equal('success');
      similarity.levenshtein(string1, string2).value.should.be.a('number');
      similarity.levenshtein(string1, string2).value.should.equal(100);
    });

    it('should return error if one of the inputs is not a string', function() {
      const string1 = 123;
      const string2 = 'apalah';
      similarity.levenshtein(string1, string2).status.should.equal('error');
      similarity.levenshtein(string1, string2).message.should.equal('inputs must be strings');
    });

    it('should return error if one of the inputs is empty', function() {
      const string1 = '';
      const string2 = 'apalah';
      similarity.levenshtein(string1, string2).status.should.equal('error');
      similarity.levenshtein(string1, string2).message.should.equal('inputs must not be empty');
    });

  });

  describe('helper/similarity.js sorensendice', function() {

    it('should return value in percent which represent similarity of two strings', function() {
      const string1 = 'apalah';
      const string2 = 'apakah';
      similarity.sorensendice(string1, string2).status.should.equal('success');
      similarity.sorensendice(string1, string2).value.should.be.a('number');
      similarity.sorensendice(string1, string2).value.should.not.equal(0);
      similarity.sorensendice(string1, string2).value.should.not.equal(100);
    });

    it('should return value 100 in percent if the strings are exactly similar', function() {
      const string1 = 'apalah';
      const string2 = 'apalah';
      similarity.sorensendice(string1, string2).status.should.equal('success');
      similarity.sorensendice(string1, string2).value.should.be.a('number');
      similarity.sorensendice(string1, string2).value.should.equal(100);
    });

    it('should return error if one of the inputs is not a string', function() {
      const string1 = 123;
      const string2 = 'apalah';
      similarity.sorensendice(string1, string2).status.should.equal('error');
      similarity.sorensendice(string1, string2).message.should.equal('inputs must be strings');
    });

    it('should return error if one of the inputs is empty', function() {
      const string1 = '';
      const string2 = 'apalah';
      similarity.sorensendice(string1, string2).status.should.equal('error');
      similarity.sorensendice(string1, string2).message.should.equal('inputs must not be empty');
    });

  });

  describe('helper/similarity.js averagedSimilarity', function() {

    it('should return value in percent which represent similarity of two strings', function() {
      const string1 = 'apalah';
      const string2 = 'apakah';
      similarity.averagedSimilarity(string1, string2).status.should.equal('success');
      similarity.averagedSimilarity(string1, string2).value.should.be.a('number');
      similarity.averagedSimilarity(string1, string2).value.should.not.equal(0);
      similarity.averagedSimilarity(string1, string2).value.should.not.equal(100);
    });

    it('should return value 100 in percent if the strings are exactly similar', function() {
      const string1 = 'apalah';
      const string2 = 'apalah';
      similarity.averagedSimilarity(string1, string2).status.should.equal('success');
      similarity.averagedSimilarity(string1, string2).value.should.be.a('number');
      similarity.averagedSimilarity(string1, string2).value.should.equal(100);
    });

    it('should return error if one of the inputs is not a string', function() {
      const string1 = 123;
      const string2 = 'apalah';
      similarity.averagedSimilarity(string1, string2).status.should.equal('error');
      similarity.averagedSimilarity(string1, string2).message.should.equal('inputs must be strings');
    });

    it('should return error if one of the inputs is empty', function() {
      const string1 = '';
      const string2 = 'apalah';
      similarity.averagedSimilarity(string1, string2).status.should.equal('error');
      similarity.averagedSimilarity(string1, string2).message.should.equal('inputs must not be empty');
    });

  });


});
