const { Schema } = require("mongoose");

// subdocument schema
const itemSchema = new Schema({
	itemId: {
		type: String,
		required: [true, "An item id is required!"]
	},
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

module.exports = itemSchema;