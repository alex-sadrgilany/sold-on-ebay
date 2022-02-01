const { Schema } = require("mongoose");

const orderSchema = new Schema({
    donationDate: {
        type: Date,
        default: Date.now
    },
    donationAmount: {
        type: Number,
        required: [true, "A donation amount is required!"]
    }
});

module.exports = orderSchema;