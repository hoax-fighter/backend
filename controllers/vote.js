const Vote = require('../models/vote');

const methods = {};

methods.getAll = (req, res, next) => {
  Vote.find({})
    .populate('user')
    .exec(function(err, votes) {
      if(err) {
        res.json({error: err, success: false});
      } else {
        res.json({votes: votes, success: true});
      }
    });
}

methods.findById = (req, res, next) => {

  Vote.findById(req.params.id)
    .populate('user')
    .exec(function(err, vote) {
      if(err) {
        res.json({error: err, success: false});
      } else {
        res.json({vote: vote, success: true});
      }
    });
}

methods.create = (req, res, next) => {
  Vote.create({
    user: req.body.id,
    value: req.body.value,
    createdAt: new Date()
  }, (err, vote) => {
    if (err) {
      res.json({ error: err, success: false });
    } else {
      res.json({ vote: vote, success: true });
    }
  });
}

methods.update = (req, res, next) => {
  Vote.findById(req.body.id, (err, vote) => {
    if (err) {
      res.json({ error: err, success: false });
    } else {
      Vote.update({_id: id}, {$set: {
        value: req.body.value || vote.value,
      }}, (err, updated) => {
        res.json({ vote: vote, success: true });
      });
    }
  });
}

methods.delete = (req, res, next) => {
  Vote.remove({_id:req.params.id}, (err) => {
    if (err) {
      res.json({success: false, error: err});
    } else {
      res.json({success: true, message: 'database is now empty'});
    }
  });
}

module.exports = methods;
