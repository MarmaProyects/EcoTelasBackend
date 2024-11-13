const mongoose = require('mongoose');

const TextileTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    description: {
        type: String,
        maxlength: 200
    }
});

mongoose.model('TextileType', TextileTypeSchema);

module.exports = mongoose.model('TextileType');