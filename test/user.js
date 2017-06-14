const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const User = require('../models/user');
const should = chai.should();

chai.use(chaiHttp);

describe('User API', function() {

  describe('/controllers/user.js', function() {

    // beforeEach(function(done) {
    //   const user = new User({
    //     uid: 'akdjfhaeiufhq8e9fha1',
    //     username: 'johndoe',
    //     email: 'john@doe.com'
    //   });
    //   user.save(function(err, user) {
    //     if (err) {
    //       console.log(err);
    //     } else {
    //       // console.log(user);
    //     }
    //   });
    //   done();
    // });

    // afterEach(function(done) {
    //   User.remove({}, function(err) {
    //     if (err) {
    //       console.log(err);
    //     }
    //   });
    //   done();
    // });

    describe('GET /api/board/users', function() {

      it('should get all user', function(done) {
        const user = new User({
          uid: 'akdjfhaeiufhq8e9fha1',
          name: 'johndoe',
          email: 'john@doe.com'
        });
        user.save(function(err, user) {
          if (err) {
            console.log(err);
          } else {
            // console.log(user);
            chai.request(server)
              .get('/api/board/users')
              .end((err, result) => {
                if (err) {
                  console.log(err);
                } else {
                  result.body.users.length.should.equal(1);
                }
              });

          }
        });

          User.remove({}, function(err) {
            if (err) {
              console.log(err);
            }
          });
          done();
      });

    });

    describe('GET /api/board/users/find/:email', function() {

      it('should get a user info based on email', function(done) {
        let email;
        const user = new User({
          uid: 'akdjfhaeiufhq8e9fha1',
          name: 'johndoe',
          email: 'john@doe.com'
        });
        user.save(function(err, user) {
          if (err) {
            console.log(err);
          } else {
            // console.log('after saving user: ', user);
            email = user.email;
            chai.request(server)
              .get(`/api/board/users/find/${email}`)
              .end((err, result) => {
                if (result) {
                  result.body.should.have.property('users');
                } else {
                  console.log(err);
                }
              });

          }
        });

          User.remove({}, function(err) {
            if (err) {
              console.log(err);
            }
          });
          done();
      });

    });

    describe('POST /api/board/users', function() {

      it('should create a user and return the user', function(done) {
        chai.request(server)
          .post(`/api/board/users`)
          .send({
            name: 'doraemon',
            email: 'dora@emon.com'
          })
          .end((err, result) => {
            if (err) {
              console.log(err);
            } else {
              result.body.should.have.property('success').equal(true);
              result.body.should.have.property('user');
            }
          });
          done();
      });

      it('should return an error if name and/or email are/is empty', function(done) {
        chai.request(server)
          .post(`/api/board/users`)
          .send({
            name: '',
            email: 'dora@emon.com'
          })
          .end((err, result) => {
            if (err) {
              console.log(err);
            } else {
              result.body.should.have.property('success').equal(false);
              result.body.should.have.property('error');
            }
          });
          done();
      });

    });

    describe('DELETE /api/board/users/:id', function() {

      it('should delete a user account', function(done) {
        chai.request(server)
          .post(`/api/board/users`)
          .send({
            name: 'doraemon',
            email: 'dora@emon.com'
          })
          .end((err, result) => {
            if (err) {
              console.log(err);
            } else {
              chai.request(server)
                .delete(`api/board/users/${result.user._id}`)
                .end((err, result) => {
                  if (err) {
                    console.log(err);
                  } else {
                    result.body.should.have.property('success').equal(true);
                    result.body.should.have.property('message');
                  }
                });
            }
          });
          done();
      });

      // it('should return an error if user id is empty', function(done) {
      //   let id = '';
      //   chai.request(server)
      //     .delete(`/api/board/users/${id}`)
      //     .end((err, result) => {
      //       if (err) {
      //         console.log(err);
      //       } else {
      //         result.body.should.have.property('success').equal(false);
      //         result.body.should.have.property('error');
      //       }
      //     });
      //     done();
      // });

    });



  });

});
