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
  Source.create({
    source: req.body.source
  }, (err, source) => {
    if(err) {
      res.json({error: err, success: false});
    } else {
      res.json({source: source, success: true});
    }
  })
}

module.exports = methods;