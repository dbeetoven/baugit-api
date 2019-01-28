
const  mongoose = require('mongoose');
const   Schema  = mongoose.Schema;
// schema Support authentifcation

const postSchema = new Schema({
    userId:{ type: Schema.Types.ObjectId, ref: 'users' },
    title: { type: String, required: true, maxlength: 256 },
    address: {type : String, required : true,maxlength:256},
    location: {type : String, required : true,maxlength:256},
    category: {type : String, required : true,maxlength:256},
    description: { type: String, required: true, maxlength: 256 },
    images: { type: String, required: true, maxlength: 256 },
    schedule:{type:String, required:true,maxlength:256},
    estimated_date: { type: Date, default: Date.now },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});
module.exports =  mongoose.model('Posts', postSchema);
