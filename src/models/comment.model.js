const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  uid: { type: Schema.Types.ObjectId, ref: 'users' },
  postId: { type: Schema.Types.ObjectId, ref: 'posts' },
  likes: [{ type: Schema.Types.ObjectId, ref: 'likes' }],
  replies: [{ type: Schema.Types.ObjectId, ref: 'comments' ,default:[]}],
  comment: { type: String, required: true },
  commentBy: { type: String, required: true },
  title: { type: String, required: true },
  isDeleted:{type:Boolean, default:false}
  url: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Comments', commentSchema);
