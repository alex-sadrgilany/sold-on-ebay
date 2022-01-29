const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const itemSchema = new Schema({
	title: {
		type: String,
		required: [true, "An item title is required!"],
		trim: true
	},
	price: {
		type: Number,
		required: [true, "An item price is required!"]
	},
	image: {
		type: String
	},
	link: {
		type: String
	}
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
