const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let titleSchema = new Schema({
  title: {
    type: String
  }
})

const Title = mongoose.model('Title', titleSchema);

module.exports = Title;