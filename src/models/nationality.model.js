const mongoose = require('mongoose');
const   Schema  = mongoose.Schema;
const nationalitySchema = new Schema({
  code: { type: String,unique:true, required: true },
  name: { type: String,unique:true, required: true },
});

module.exports =  mongoose.model('Nationalities', nationalitySchema);
