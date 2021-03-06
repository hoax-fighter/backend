const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const Source = require('../models/source');
const should = chai.should();

const data = require('../mocks/titles').sources;

chai.use(chaiHttp);

describe('Hoax Checker API', function() {

  describe('/controllers/hoaxChecker.js', function() {

    beforeEach(function(done) {
      data.map((item) => {
        const hoax = new Source({
          title: item.title,
          hoax: item.hoax,
          fact: item.fact
        });
        hoax.save(function(err) {
        })
      });
      done();
    });

    afterEach(function(done) {
      Source.remove({}, function(err) {
        done();
      });
    })


    it('should return error if input is empty', function(done) {
      chai.request(server).post('/api/check').send({input: ''}).end((err, result) => {
        if (err) {
          console.log('error');
        } else {
          result.body.success.should.equal(false);
          result.body.error.should.equal('input must not be empty');
        }
        done();
      })
    });

    it('should return status success true and properties of sources and conclusion if input is not empty', function(done) {
      const search = {input: 'tanaman penyebab leukimia'};
      chai.request(server)
        .post('/api/check')
        .send(search)
        .end((err, result) => {
          if (err) {
            console.log('error');
          } else {
            // console.log(result.body);
            result.body.success.should.equal(true);
            result.body.should.have.property('sources');
            result.body.should.have.property('result');
          }
          done();
        })
    });

  });

});
