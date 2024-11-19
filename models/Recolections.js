const mongoose = require('mongoose');

const RecolectionsSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 80,
    },
    description: {
        type: String,
    },
    schedule: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' 
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Company'
    },
    textileTypes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TextileType'
    }],
    accepted: {
        type: Boolean,
    },
});

mongoose.model('Recolections', RecolectionsSchema);

module.exports = mongoose.model('Recolections');