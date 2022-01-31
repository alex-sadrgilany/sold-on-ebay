const mongoose = require("mongoose");

const { Schema } = mongoose;

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

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;