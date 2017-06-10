const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let newsSource = new Schema({
  reputable: {
    type: [String],
    "default": [],
  },
  nonReputable: {
    type: [String],
    "default": [],
  }
})

const NewsSource = mongoose.model('NewsSource', newsSource);

module.exports = NewsSource;