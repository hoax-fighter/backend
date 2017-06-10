const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let voteSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  value: {
    type: Number
  }
});

const Vote = mongoose.model('Source', voteSchema);

module.exports = Vote;
