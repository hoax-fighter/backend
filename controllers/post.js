const Post = require('../models/post');

const methods = {};

methods.getAll = (req, res, next) => {
  Post.find({})
    .populate(['user', 'votes'])
    .exec(function(err, posts) {
      if(err) {
        res.json({error: err, success: false});
      } else {
        res.json({posts: posts, success: true});
      }
    });
}

methods.findById = (req, res, next) => {
  Post.findById(req.params.id)
    .populate(['user', 'votes'])
    .exec(function(err, post) {
      if(err) {
        res.json({error: err, success: false});
      } else {
        res.json({post: post, success: true});
      }
    });
}

methods.create = (req, res, next) => {
  Post.create({
    user: req.body.id,
    title: req.body.title,
    content: req.body.content,
    votes: [],
    createdAt: new Date()
  }, (err, post) => {
    if (err) {
      res.json({ error: err, success: false });
    } else {
      res.json({ post: post, success: true });
    }
  });
}

methods.update = (req, res, next) => {
  Post.findById(req.body.id, (err, post) => {
    if (err) {
      res.json({ error: err, success: false });
    } else {
      Post.update({_id: id}, {$set: {
        user: post.user,
        title: req.body.title || post.title,
        content: req.body.content || post.content,
        votes: post.votes
      }}, (err, updated) => {
        res.json({ post: post, success: true });
      });
    }
  });
}

methods.delete = (req, res, next) => {
  Post.remove({_id:req.params.id}, (err) => {
    if (err) {
      res.json({success: false, error: err});
    } else {
      res.json({success: true, message: 'database is now empty'});
    }
  });
}

module.exports = methods;
