const mongoose = require('mongoose');
const subscriberSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    deviceID: {
        type: String,
        required: true
    },
    fcmToken: {
        type: String,
        required: true
    },
    createdDate :{
        type: Date,
        required: true,
        default: Date.now
    }
})
module.exports = mongoose.model('subscriber',subscriberSchema);