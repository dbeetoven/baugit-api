
const  mongoose = require('mongoose');
const   Schema  = mongoose.Schema;
// schema Support authentifcation

const supportSchema = new Schema({
    _id: { type: String, default: _ => uuid()},
    name: {type : String, required : true,maxlength:256},
    phone: {type : String, required : true,maxlength:256},
    message: {type : String, required : true,maxlength:256},
    email: {type : String, required : true,unique:true},
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});
module.exports =  mongoose.model('Support', supportSchema);

