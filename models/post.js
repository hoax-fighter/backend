const mongoose = require('mongoose');
const Vote = require('./vote');
let Schema = mongoose.Schema;

let postSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String
  },
  content: {
    type: String
  },
  votes: [Vote]
});

const Post = mongoose.model('Source', postSchema);

module.exports = Post;
