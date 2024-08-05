const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
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

    isApproved: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('user', userSchema);