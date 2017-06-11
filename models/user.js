const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
  UID: {
    type: String
  },
  username: {
    type: String
  },
  email: {
    type: String
  },
  createdAt: {
    type: Date
  }
});

const User = mongoose.model('Source', userSchema);

module.exports = User;
