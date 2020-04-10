const mongoose = require('mongoose');
const validator = require('validator');
const {addressSubschema}=require('./abstract.model')
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  uid: { type: Schema.Types.ObjectId, ref: 'users' },
  fullname: { type: String, required: true, maxlength: 256 },
  doc: { type: String, required: true,unique:true, maxlength: 36 },
  cuil: { type: String,unique:true, maxlength: 64 },
  doc_type: { type: String, maxlength: 36 },
  sex: { type: String, enum: ['M', 'F'] },
  phones: [{ type: String, required: true, maxlength: 36 }],
  nationality: { type: String, required: true, maxlength: 64 },
  address: addressSubschema,
  biography: { type: String, maxlength: 256 },
  socialLinks: [{ type: String, required: true, maxlength: 256 }],
  company:[{type:String, maxlength:128}],
  startDate:[{type:String, maxlength:36}],
  birthday: { type: String },
  rating: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  approved:{type:Boolean,default:false},
  permissionLevel:{type:Number},
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Profile', profileSchema);
