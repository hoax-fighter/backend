const NewsSource = require('../models/newsSource');
const methods = {};

methods.create = (req, res, next) => {
  NewsSource.create({
    reputable: req.body.reputable,
    nonReputable: req.body.nonReputable
  }, (err, source) => {
    if (err) {
      res.json({ error: err, success: false });
    } else {
      res.json({ source: source, success: true });
    }
  })
}

methods.gets = (req, res, next) => {
  NewsSource.find({}, (err, source) => {
    if (err) {
      res.json({ error: err, success: false });
    } else {
      res.json({ sources: source, success: true });
    }
  })
}

module.exports = methods;