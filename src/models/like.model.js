const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'users' },
  liked: { type: Boolean, default:false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('likes', likeSchema);
