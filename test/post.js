const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const User = require('../models/user');
const Post = require('../models/post');
const Vote = require('../models/vote');
const should = chai.should();

chai.use(chaiHttp);

describe('Post API', function() {

  describe('/controllers/post.js', function() {

    let userId = '';
    let voteId = '';

    beforeEach(function(done) {
      const user = new User({
        uid: 'akdjfhaeiufhq8e9fha1',
        username: 'johndoe',
        email: 'john@doe.com'
      });
      user.save(function(err, user) {
        if (err) {
          console.log(err);
        } else {
          userId = user._id
          console.log(user);
        }
      });


      const vote = new Vote({
        uid: 'akdjfhaeiufhq8e9fha1',
        username: 'johndoe',
        email: 'john@doe.com'
      });
      user.save(function(err, user) {
        if (err) {
          console.log(err);
        } else {
          userId = user._id
          console.log(user);
        }
      });











      done();
    });





    afterEach(function(done) {
      User.remove({}, function(err) {
        if (err) {
          console.log(err);
        }
      });
      done();
    });

    describe('getAll', function() {

      it('should get all user', function(done) {
        chai.request(server)
          .get('/api/board/users')
          .end((err, result) => {
            if (err) {
              console.log(err);
            } else {
              console.log(result.body);
              result.body.users.length.should.equal(1);
            }
          });
          done();
      });

    });

  });

});
