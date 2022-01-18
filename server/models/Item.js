const { Schema } = require("mongoose");

// subdocument schema
const itemSchema = new Schema({
	itemName: {
		type: String,
		required: [true, "An item name is required!"],
		trim: true
	},
	description: {
		type: String
	},
	image: {
		type: String
	},
	price: {
		type: Number,
		required: [true, "An item price is required!"]
	},
	link: {
		type: String
	}
});

module.exports = itemSchema;
