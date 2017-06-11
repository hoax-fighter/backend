const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const User = require('../models/user');
const Post = require('../models/post');
const should = chai.should();

chai.use(chaiHttp);

describe('Post API', function() {

  describe('/controllers/post.js', function() {



    beforeEach(function(done) {

      done();
    });

    afterEach(function(done) {
      Post.remove({}, function(err) {
        if (err) {
          console.log(err);
        } else {
          // console.log('posts are deleted!');
        }
      });
      User.remove({}, function(err) {
        if (err) {
          console.log(err);
        } else {
          // console.log('users are deleted!');
        }
      });
      done();
    });

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
            // console.log('user ', user);
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
                // console.log('post ', post);
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
              // console.log(result.body);
              result.body.should.have.property('success').equal(true);
              result.body.should.have.property('posts');
              // result.body.posts.length.should.equal(1);
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
            // console.log('user ', user);
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
                // console.log('post ', post);
                // console.log('postId: ', postId);
                let id;
                chai.request(server)
                  .get(`/api/board/post/${id}`)
                  .end((err, result) => {
                    if (err) {
                      console.log('error');
                    } else {
                      // console.log('result.body ', result.body);
                      result.body.success.should.equal(false);
                      result.body.should.have.property('error');
                    }
                  });
              }
            });
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
            // console.log('user ', user);
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
                // console.log('post ', post);
                // console.log('postId: ', postId);
                let id = postId;
                chai.request(server)
                  .get(`/api/board/post/${id}`)
                  .end((err, result) => {
                    if (err) {
                      console.log('error');
                    } else {
                      // console.log('result.body ', result.body);
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

      it('should return error if userId or title or content is/are empty', function() {
        
      });


    });

  });

});
