const mongoose = require('mongoose');

const ProfessionSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 256,
        unique: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 256,
    }
});

module.exports = mongoose.model('Professions', ProfessionSchema);