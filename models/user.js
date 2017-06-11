const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
  uid: {
    type: String
  },
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
