const mongoose = require('mongoose');

const EvenSchmea = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
    },
    date: {
        type: Date,
        required: true,
    },
    lat: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
    },
    long: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
    },
    description: {
        type: String,
        required: true,
    },
});

mongoose.model('Event', EvenSchmea);

module.exports = mongoose.model('Event');