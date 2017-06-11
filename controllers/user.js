const User = require('../models/user');

const methods = {};

methods.getAll = (req, res, next) => {
  User.find({}, (err, users) => {
    if(err) {
      res.json({error: err, success: false});
    } else {
      res.json({users: users, success: true});
    }
  });
}

methods.findById = (req, res, next) => {
  User.findById(req.params.id, (err, users) => {
    if(err) {
      res.json({error: err, success: false});
    } else {
      res.json({users: users, success: true});
    }
  });
}

methods.create = (req, res, next) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    createdAt: new Date()
  }, (err, user) => {
    if (err) {
      res.json({ error: err, success: false });
    } else {
      res.json({ user: user, success: true });
    }
  });
}

methods.update = (req, res, next) => {
  User.findById(req.body.id, (err, user) => {
    if (err) {
      res.json({ error: err, success: false });
    } else {
      User.update({_id: id}, {$set: {
        username: user.username || req.body.username,
        email: user.email || req.body.email
      }}, (err, updated) => {
        res.json({ user: user, success: true });
      });
    }
  });
}

methods.delete = (req, res, next) => {
  User.remove({_id:req.params.id}, (err) => {
    if (err) {
      res.json({success: false, error: err});
    } else {
      res.json({success: true, message: 'database is now empty'});
    }
  });
}

module.exports = methods;
