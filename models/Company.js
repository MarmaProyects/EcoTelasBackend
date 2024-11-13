const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
    },
    location: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 80,
    },
    recolectionService:{
        type: Boolean,
        default: false
    },
    recolectionSchedule:{
        type: String,
        default: '09:00-18:00'
    },
    companySchedule:{
        type: String,
        required: true,
        default: '09:00-18:00'
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
    textileTypes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TextileType'
    }],
    owners: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

mongoose.model('Company', CompanySchema);

module.exports = mongoose.model('Company');