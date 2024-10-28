const mongoose = require('mongoose');

const PointSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
    },
    lat: {
        type: Number,
        required: true,
        min: -90,
        max: 90

    },
    lng: {
        type: Number,
        required: true,
        min: -180,
        max: 180
    },
});

mongoose.model('RecyclingPoints', PointSchema);

module.exports = mongoose.model('RecyclingPoints');