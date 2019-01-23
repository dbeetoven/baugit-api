
const  mongoose = require('mongoose');
const   Schema  = mongoose.Schema;
// schema user authentifcation

const profilUserSchema = new Schema({
    _id: { type: String, default: _ => uuid()},
    firtname: {type : String, required : true,maxlength:256},
    lastname: {type : String, required : true,maxlength:256},
    document: {type : String, required : true,maxlength:256},
    document_type: {type : String, required : true,maxlength:256},
    sex: { type: String, enum: ["M","F"] },
    phones: [{type : String, required : true,maxlength:256}],
    nationality: {type : String, required : true,maxlength:256},
    country: { type: String, default: "Argentina" },
    address: {type : String, required : true,maxlength:256},
    description: {type : String, required : true,maxlength:256},
    email: {type : String, required : true,unique:true},
    age:     { type: Number, min: 16, max: 65 },
    profession: {type : String, required : true,maxlength:256},
    rating: {type : String, required : true,maxlength:256},
    photo: {type: String, required: true},
    rating: {type: Number, default:0},
    likes:{type:Number,default:0},
    dislikes:{type:Number,default:0},
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});
module.exports =  mongoose.model('Profil', profilUserSchema);