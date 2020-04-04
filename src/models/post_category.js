const  mongoose = require('mongoose');
const  Schema  = mongoose.Schema;
// schema category authentication

const categorySchema = new Schema({
    name: {type : String, required : true,maxlength:256},
    phone: {type : String, required : true,maxlength:256},
    message: {type : String, required : true,maxlength:256},
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});
module.exports =  mongoose.model('Support', categorySchema);