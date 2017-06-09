const Source = require('../models/source');
const methods = {};

methods.gets = (req, res, next) => {
  Source.find({}, (err, source) => {
    if(err) {
      res.json({error: err, success: false});
    } else {
      res.json({sources: source, success: true});
    }
  })
}

methods.create = (req, res, next) => {
  console.log(req.body.source)
  Source.create({
    title: req.body.title,
    hoax: req.body.hoax,
    fact: req.body.fact
  }, (err, source) => {
    if(err) {
      res.json({error: err, success: false});
    } else {
      res.json({source: source, success: true});
    }
  })
}

methods.delete = (req, res, next) => {
  Source.remove({}, function(err) {
    res.json({status: 'success', message: 'database is now empty'});
  })
}

module.exports = methods;
