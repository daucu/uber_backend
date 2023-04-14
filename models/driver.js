const mongoose = require('mongoose');
const driver_schema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirm_password:{
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    status: {
        type:String,
        enum:['pending', 'approved'],
        default:'pending'
    }
}, { timestamps: true });

module.exports = mongoose.model('driver', driver_schema);