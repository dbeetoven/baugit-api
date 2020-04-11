
const  mongoose = require('mongoose');
const   Schema  = mongoose.Schema;

const postSchema = new Schema({
    uid:{ type: Schema.Types.ObjectId, ref: 'users' },
    title: { type: String, required: true, maxlength: 256 },
    type: {type : String, required : true,maxlength:256},
    comments: [{type : String, required : true,maxlength:256}],
    likes:[{type:Number,default:0}],
    category: {type : String, required : true,maxlength:256},
    description: { type: String, required: true, maxlength: 256 },
    images: [{ type: String }],
    active: { type: Boolean,default:true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});
module.exports =  mongoose.model('Post', postSchema);
