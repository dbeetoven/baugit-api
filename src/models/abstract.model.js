const addressSubschema = {
  street: { type: String },
  number: { type: String },
  zip: { type: String },
  city: { type: String }
};
const phoneSchema = {
  type: { type: String },
  number: { type: Number },
  zip:{ type: String }
};
const socialSchema = {
  name: { type: String },
  url:{ type: String }
};
const experience = {
  company: { type: String,required:true },
  tilte: { type: String,required:true },
  position: { type: String,required:true },
  location: { type: String },
  description: { type: String },
  startedDate: { type: Date required:true },
  endDate: { type: Date },
  companyUrl:{ type: String }
};


module.exports = {
  addressSubschema,
  phoneSchema,
  socialSchema,
  experience
};
