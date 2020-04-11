const mongoose = require('mongoose');
const RoleSchema = mongoose.Schema({
    name: String,
    permissionLevel: Number,
    title:String,
});

module.exports = mongoose.model('Role', RoleSchema);
