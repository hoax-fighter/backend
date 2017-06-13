const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  createdAt: {
    type: Date
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
