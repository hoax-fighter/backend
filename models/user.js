const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
  username: {
    type: String
  },
  email: {
    type: String
  }
});

const User = mongoose.model('Source', userSchema);

module.exports = User;
