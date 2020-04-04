
const  mongoose = require('mongoose');
const   Schema  = mongoose.Schema;
// schema profile

const profileUserSchema = new Schema({
    _id: { type: String, default: _ => id() },
    uid:{ type: Schema.Types.ObjectId, ref: 'users' },
    fullname: {type : String, required : true,maxlength:250},
    document: { type: String, required: true, maxlength: 25 },
    cuit: {type : String, required : true,maxlength:50},
    document_type: {type : String, required : true,maxlength:250},
    sex: { type: String, enum: ["M","F"] },
    phones: [{type : String, required : true,maxlength:256}],
    nationality: {type : String, required : true,maxlength:256},
    country: { type: String, default: "Argentina" },
    address: {type : String, required : true,maxlength:256},
    description: {type : String, required : true,maxlength:256},
    email: {type : String, required : true,unique:true},
    age:     { type: Number, min: 16, max: 65 },
    profession:[{ type: Schema.Types.ObjectId, ref: 'profession' }],
    reference:[{ type: Schema.Types.ObjectId, ref: 'reference' }],
    photo: {type: String, required: true},
    rating: {type: Number, default:0},
    likes:{type:Number,default:0},
    dislikes: { type: Number, default: 0 },
    commentaries:[{ type: Schema.Types.ObjectId, ref: 'comentary' }],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});
module.exports =  mongoose.model('Profile', profileUserSchema);