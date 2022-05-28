const mongoose = require('mongoose')

const paymentSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: Object,
        required: true
    },
    cart: {
        type: Array,
        default: []
    },
    status: {
        type: Boolean,
        default: false
    },
    paymentId: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Payment', paymentSchema)