const mongoose = require('mongoose');
const voteSchema = require('./vote');
let Schema = mongoose.Schema;

let postSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date
  },
  title: {
    type: String
  },
  content: {
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

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
