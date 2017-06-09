const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let sourceSchema = new Schema({
  title: {
    type: String
  },
  hoax: {
    type: String
  },
  fact: {
    type: String
  },
  url: {
    type: String
  }
})

const Source = mongoose.model('Source', sourceSchema);

module.exports = Source;