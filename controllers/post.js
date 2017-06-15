const Post = require('../models/post');

const methods = {};

methods.getAll = (req, res, next) => {
  Post.find({})
    .populate(['user', 'votes'])
    .exec(function (err, posts) {
      if (err) {
        res.json({ error: err, success: false });
      } else {
        res.json({ posts: posts, success: true });
      }
    });
}

methods.findById = (req, res, next) => {
  if (req.params.id) {
    if (req.params.id.length > 0) {
      Post.findById(req.params.id)
        .populate(['user', 'votes'])
        .exec(function (err, post) {
          if (err) {
            res.json({ error: err, success: false });
          } else {
            res.json({ post: post, success: true });
          }
        });
    } else {
      res.json({ success: false, message: 'Post id tidak boleh kosong!' });
    }
  } else {
    res.json({ success: false, message: 'Post id tidak boleh kosong!' });
  }
}

methods.create = (req, res, next) => {
  if (req.body.user && req.body.title && req.body.content) {
    if (req.body.user.length > 0 && req.body.title.length > 0 && req.body.content.length > 0) {
      Post.create({
        user: req.body.user,
        title: req.body.title,
        content: req.body.content,
        votes: [],
        hoaxVoteCount: 0,
        nonHoaxVoteCount: 0,
        createdAt: new Date()
      }, (err, post) => {
        if (err) {
          res.json({ error: err, success: false });
        } else {
          res.json({ post: post, success: true });
        }
      });
    } else {
      res.json({ error: 'user, title, content tidak boleh kosong', success: false });
    }
  } else {
    res.json({ error: 'user, title, content tidak boleh kosong', success: false });
  }
}

methods.update = (req, res, next) => {
  if (req.params.id) {
    Post.findById(req.params.id, (err, post) => {
      if (err) {
        res.json({ error: err, success: false });
      } else {
        if (post && post !== null) {
          Post.update({ _id: req.params.id }, {
            $set: {
              user: post.user,
              title: req.body.title || post.title,
              content: req.body.content || post.content,
              votes: post.votes
            }
          }, (err, updated) => {
            if (err) {
              res.json({ error: 'Error updating post', success: false });
            } else {
              res.json({ post: post, success: true });
            }
          });
        } else {
          res.json({ error: 'Id post tidak ditemukan', success: false });
        }
      }
    });
  } else {
    res.json({ error: 'Id post tidak boleh kosong', success: false });
  }

}

methods.delete = (req, res, next) => {

  Post.remove({ _id: req.params.id }, (err) => {
    if (err) {
      res.json({ success: false, error: err });
    } else {
      res.json({ success: true, message: 'post is successfully deleted' });
    }
  });
}

methods.vote = (req, res, next) => {

  if (req.params.postId && req.body.userId && req.body.value) {

    Post.findById(req.params.postId)
      .populate('user')
      .exec((err, post) => {

        if (err) {

          res.json({ error: err, success: false });

        } else {

          let foundVote = null;
          let foundIndex = null;
          post.votes.map((vote, index) => {
            if (String(vote.user) === String(req.body.userId)) {
              foundVote = vote;
              foundIndex = index;
            }
          });

          if (foundVote !== null) {

            let message = '';

            if (Number(req.body.value) !== Number(post.votes[foundIndex].value)) {
              if (Number(post.votes[foundIndex].value) === 1) {
                post.hoaxVoteCount--;
                post.votes[foundIndex].value = 0;
              } else if (Number(post.votes[foundIndex].value) === -1) {
                post.nonHoaxVoteCount--;
                post.votes[foundIndex].value = 0;
              } else {
                if (Number(req.body.value) === 1) {
                  post.hoaxVoteCount++;
                  post.votes[foundIndex].value = req.body.value;
                } else {
                  post.nonHoaxVoteCount++;
                  post.votes[foundIndex].value = req.body.value;
                }
              }

              message = 'Edit vote berhasil';

              post.save((err, post) => {
                if (err) {
                  res.json({ success: false, error: err });
                } else {
                  res.json({ post: post, success: true, message: message });
                }

              });

            } else {
              res.json({ success: false, error: 'Tidak bisa vote lagi!' });
            }

          } else {
            if (Number(req.body.value) === 1) {
              post.hoaxVoteCount++;
            } else {
              post.nonHoaxVoteCount++;
            }
            post.votes.push({
              user: req.body.userId,
              value: req.body.value,
              createdAt: new Date()
            });
            post.save((err, post) => {
              res.json({ post: post, success: true });
            });
          }
        }

      });

  } else {
    res.json({ error: 'Id post, Id user, value vote tidak boleh kosong', success: false });
  }

}

module.exports = methods;
