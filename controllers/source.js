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
  }, (err, source) => {
    if(err) {
      res.json({error: err, success: false});
    } else {
      res.json({source: source, success: true});
    }
  })
}

module.exports = methods;