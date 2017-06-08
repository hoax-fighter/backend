const Title = require('../models/title');
const methods = {};

methods.gets = (req, res, next) => {
  Title.find({}, (err, title) => {
    if(err) {
      res.json({error: err, success: false});
    } else {
      res.json({titles: title, success: true});
    }
  })
}

methods.create = (req, res, next) => {
  Title.create({
    title: req.body.title
  }, (err, title) => {
    if(err) {
      res.json({error: err, success: false});
    } else {
      res.json({title: title, success: true});
    }
  })
}

module.exports = methods;