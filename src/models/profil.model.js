const mongoose = require('mongoose');
const validator = require('validator');
const {addressSubschema,phoneSchema,socialSchema,experience}=require('./abstract.model')
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  uid: { type: Schema.Types.ObjectId, ref: 'users' },
  fullname: { type: String, required: true, maxlength: 256 },
  doc: { type: String, required: true,unique:true, maxlength: 36 },
  cuil: { type: String,unique:true, maxlength: 64 },
  doc_type: { type: String, maxlength: 36 },
  sex: { type: String, enum: ['M', 'F'] },
  phones: [{phoneSchema}],
  nationality: { type: String, maxlength: 64 },
  address: addressSubschema,
  biography: { type: String, maxlength: 524 },
  socialLinks: [{socialSchema}],
  company:{type:String, maxlength:128},
  experiences:[{experience}],
  birthday: { type: String },
  rating: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  approved:{type:Boolean,default:false},
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Profile', profileSchema);
