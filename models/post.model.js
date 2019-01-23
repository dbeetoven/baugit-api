
const  mongoose = require('mongoose');
const   Schema  = mongoose.Schema;
// schema Support authentifcation

const postSchema = new Schema({
    _id: { type: String, default: _ => uuid()},
    userId:{ type: Schema.Types.ObjectId, ref: 'users' },
    title: {type : String, required : true,maxlength:256},
    category: {type : String, required : true,maxlength:256},
    description: {type : String, required : true,maxlength:256},
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});
module.exports =  mongoose.model('Post', postSchema);
