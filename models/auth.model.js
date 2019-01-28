
var  mongoose = require('mongoose');
var   Schema  = mongoose.Schema;
// schema user authentifcation

var userSchema = new Schema({
    username: {type : String, required : true,unique: true},
    password: {type : String, required : true},
    email: {type : String, required : true,unique:true},
    role: { type: String },
    resetPasswordToken: {type : String},
    resetPasswordExpires: Date,
    verified: { type: Boolean, default: false },
    verifiedToken: {type : String},
    verifiedTokenExpires: Date,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports =  mongoose.model('users', userSchema);
