
var  mongoose = require('mongoose');
var   Schema  = mongoose.Schema;
// schema user authentifcation

var userSchema = new Schema({
    _id: { type: String, default: _ => uuid()},
    username: {type : String, required : true,unique: true},
    password: {type : String, required : true},
    email: {type : String, required : true,unique:true},
    roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }],
    resetPasswordToken: {type : String, required : true},
    resetPasswordExpires: Date,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports =  mongoose.model('users', userSchema);
