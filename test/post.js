const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const User = require('../models/user');
const Post = require('../models/post');
const should = chai.should();

chai.use(chaiHttp);

describe('Post API', function() {

  describe('/controllers/post.js', function() {

    describe('GET /api/board/posts', function() {

      it('should get all posts', function(done) {

        let userId = '';
        let postId = '';

        const user = new User({
          uid: 'zciuvz87zyv8hkzjhv',
          username: 'janedoe',
          email: 'jane@doe.com',
          createdAt: new Date()
        });
        user.save(function(err, user) {
          if (err) {
            console.log(err);
          } else {
            userId = user._id;
            const post = new Post({
              user: userId,
              title: 'qwerty',
              content: 'asdfghjkl zxcv bnm',
              createdAt: new Date()
            });
            post.save(function(err, post) {
              if (err) {
                console.log(err);
              } else {
                postId = post._id;
              }
            });
          }
        });

        chai.request(server)
          .get('/api/board/posts')
          .end((err, result) => {
            if (err) {
              console.log(err);
            } else {
              result.body.should.have.property('success').equal(true);
              result.body.should.have.property('posts');
            }
          });

        Post.remove({}, function(err) {
          if (err) {
            console.log(err);
          } else {
            console.log('posts are deleted!');
          }
        });
        User.remove({}, function(err) {
          if (err) {
            console.log(err);
          } else {
            console.log('users are deleted!');
          }
        });

        done();
      });

    });

    describe('GET /api/board/post/:id', function() {

      it('should return error and success = false if id is empty', function(done) {

        let userId = '';
        let postId = '';

        const user = new User({
          uid: 'zciuvz87zyv8hkzjhv',
          username: 'janedoe',
          email: 'jane@doe.com',
          createdAt: new Date()
        });
        user.save(function(err, user) {
          if (err) {
            console.log(err);
          } else {
            userId = user._id;
            const post = new Post({
              user: userId,
              title: 'qwerty',
              content: 'asdfghjkl zxcv bnm',
              createdAt: new Date()
            });
            post.save(function(err, post) {
              if (err) {
                console.log(err);
              } else {
                postId = post._id;
                let id;
                chai.request(server)
                  .get(`/api/board/post/${id}`)
                  .end((err, result) => {
                    if (err) {
                      console.log('error');
                    } else {
                      result.body.success.should.equal(false);
                      result.body.should.have.property('error');
                    }
                  });
              }
            });
          }
        });
        Post.remove({}, function(err) {
          if (err) {
            console.log(err);
          } else {
            console.log('posts are deleted!');
          }
        });
        User.remove({}, function(err) {
          if (err) {
            console.log(err);
          } else {
            console.log('users are deleted!');
          }
        });
        done();
      });

      it('should return post and success = true if input id is correct', function(done) {

        let userId = '';
        let postId = '';

        const user = new User({
          uid: 'zciuvz87zyv8hkzjhv',
          username: 'janedoe',
          email: 'jane@doe.com',
          createdAt: new Date()
        });
        user.save(function(err, user) {
          if (err) {
            console.log(err);
          } else {
            userId = user._id;
            const post = new Post({
              user: userId,
              title: 'qwerty',
              content: 'asdfghjkl zxcv bnm',
              createdAt: new Date()
            });
            post.save(function(err, post) {
              if (err) {
                console.log(err);
              } else {
                postId = post._id;
                let id = postId;
                chai.request(server)
                  .get(`/api/board/post/${id}`)
                  .end((err, result) => {
                    if (err) {
                      console.log('error');
                    } else {
                      result.body.success.should.equal(true);
                      result.body.should.have.property('post');
                    }
                  });
              }
            });
          }
        });
        done();
      });

    });

    describe('POST /api/board/posts', function() {

      it('should return error if userId is empty', function(done) {

        chai.request(server)
          .post(`/api/board/posts`)
          .send({
            userId: '',
            title: 'doraemon',
            content: 'doraemon adalah berasal dari ramalan yang akurat tentang masa depan.'
          })
          .end((err, result) => {
            if (err) {
              console.log('error');
            } else {
              result.body.success.should.equal(false);
              result.body.should.have.property('error');
            }
          });
        done();
      });

      it('should return error if title or content is/are empty', function(done) {

        chai.request(server)
          .post(`/api/board/posts`)
          .send({
            userId: '593cec6e9dca60366511ae92',
            title: '',
            content: 'doraemon adalah berasal dari ramalan yang akurat tentang masa depan.'
          })
          .end((err, result) => {
            if (err) {
              console.log('error');
            } else {
              result.body.success.should.equal(false);
              result.body.should.have.property('error');
            }
          });

          Post.remove({}, function(err) {
            if (err) {
              console.log(err);
            } else {
              console.log('posts are deleted!');
            }
          });
          User.remove({}, function(err) {
            if (err) {
              console.log(err);
            } else {
              console.log('users are deleted!');
            }
          });

        done();
      });

      it('should return success and post if userId, title, and content are proper', function(done) {

        chai.request(server)
          .post(`/api/board/posts`)
          .send({
            user: '593cec6e9dca60366511ae92',
            title: 'doraemon',
            content: 'doraemon adalah berasal dari ramalan yang akurat tentang masa depan.'
          })
          .end((err, result) => {
            if (err) {
              console.log('error');
            } else {
              result.body.success.should.equal(true);
              result.body.should.have.property('post');
            }
          });

          Post.remove({}, function(err) {
            if (err) {
              console.log(err);
            } else {
              console.log('posts are deleted!');
            }
          });
          User.remove({}, function(err) {
            if (err) {
              console.log(err);
            } else {
              console.log('users are deleted!');
            }
          });

        done();
      });

    });

    describe('PUT /api/board/post/:id', function() {

      it('should update the title if new title is provided', function(done) {

        chai.request(server)
          .post(`/api/board/posts`)
          .send({
            user: '593cec6e9dca60366511ae92',
            title: 'doraemon',
            content: 'doraemon adalah berasal dari ramalan yang akurat tentang masa depan.'
          })
          .end((err, result) => {
            if (err) {
              console.log('error');
            } else {
              chai.request(server)
                .put(`/api/board/post/${result.body.post._id}`)
                .send({
                  title: 'kucing dari masa depan'
                })
                .end((err, result) => {
                  console.log('put result.body: ', result.body);
                });
            }
          });

          Post.remove({}, function(err) {
            if (err) {
              console.log(err);
            } else {
              console.log('posts are deleted!');
            }
          });
          User.remove({}, function(err) {
            if (err) {
              console.log(err);
            } else {
              console.log('users are deleted!');
            }
          });
        done();
      });

    });

  });

});
