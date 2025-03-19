const mongoose = require('mongoose');

const LotSchema = new mongoose.Schema({
    lotName: {
        type: String,
        required: true,
    },
    dateOfInsert: {
        type: Date,
        required: true,
    },
    supplier: {
        type: String,
        required: true,
    },
    totalCost: {
        type: Number,
    },
    totalCarats: {
        type: Number,
    },
    caratsPaid: {
        type: Number,
    },
}, { timestamps: true })

module.exports = mongoose.model('Lots', LotSchema);