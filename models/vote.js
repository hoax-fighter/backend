const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let voteSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date
  },
  value: {
    type: Number
  }
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
