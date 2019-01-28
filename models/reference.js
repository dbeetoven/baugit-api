
const  mongoose = require('mongoose');
const   Schema  = mongoose.Schema;
// schema user authentifcation

const referenceSchema = new Schema({
    _id: { type: String, default: _ => id() },
    uid:{ type: Schema.Types.ObjectId, ref: 'users' },
    fullname: {type : String, required : true,maxlength:250},
    phones: [{type : String, required : true,maxlength:250}],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});
module.exports =  mongoose.model('References', referenceSchema);