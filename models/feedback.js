const mongoose = require('mongoose');
const voteSchema = require('./vote');
let Schema = mongoose.Schema;

let feedbackSchema = new Schema({
  createdAt: {
    type: Date
  },
  name: {
    type: String
  },
  description: {
    type: String
  },
  url: {
    type: String
  },
  votes: [voteSchema],
  hoaxVoteCount: {
    type: Number
  },
  nonHoaxVoteCount: {
    type: Number
  }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
