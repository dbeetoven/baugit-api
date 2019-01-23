const mongoose = require('mongoose');

const ProfessionSchema = mongoose.Schema({
    _id: { type: String, default: _ => uuid()},
    name: {
        type: String,
        required: true,
        maxlength: 256
    },
});

module.exports = mongoose.model('Profession', ProfessionSchema);