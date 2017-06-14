const User = require('../models/user');

const methods = {};

methods.getAll = (req, res, next) => {
  User.find({}, (err, users) => {
    if (err) {
      res.json({ error: err, success: false });
    } else {
      res.json({ users: users, success: true });
    }
  });
}

methods.findUser = (req, res, next) => {

  User.findOne({
    email: req.params.email
  }, (err, users) => {
    if (err) {
      res.json({ error: err, success: false });
    } else {
      res.json({ users: users, success: true });
    }
  });
}


methods.create = (req, res, next) => {
  if (req.body.name && req.body.email) {
    User.create({
      name: req.body.name,
      email: req.body.email,
      createdAt: new Date()
    }, (err, user) => {
      if (err) {
        res.json({ error: err, success: false });
      } else {
        res.json({ user: user, success: true });
      }
    });
  } else {
    res.json({error: 'name and email are required', success: false});
  }
}

methods.update = (req, res, next) => {
  User.findById(req.body.id, (err, user) => {
    if (err) {
      res.json({ error: err, success: false });
    } else {
      User.update({ _id: id }, {
        $set: {
          uid: user.uid || req.body.uid,
          name: user.user || req.body.name,
          email: user.email || req.body.email
        }
      }, (err, updated) => {
        res.json({ user: user, success: true });
      });
    }
  });
}

methods.delete = (req, res, next) => {
  if (req.params.id) {
    User.remove({ _id: req.params.id }, (err) => {
      if (err) {
        res.json({ success: false, error: err });
      } else {
        res.json({ success: true, message: 'user is successfully deleted' });
      }
    });
  } else {
    res.json({ success: false, error: 'user id is required' });
  }

}

module.exports = methods;
