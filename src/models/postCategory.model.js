const  mongoose = require('mongoose');
const  Schema  = mongoose.Schema;

const postCategorySchema = new Schema({
    title:{type:String, required:true, maxlength:64},
    name: {type : String, required : true,maxlength:64},
    permissionLevel:{type:Number,required:true},
    created_at: { type: Date, default: Date.now }
});
module.exports =  mongoose.model('postCatorgies', postCategorySchema);
