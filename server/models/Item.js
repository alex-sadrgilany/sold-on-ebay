const { Schema } = require("mongoose");

// subdocument schema
const itemSchema = new Schema({
	itemId: {
		type: String,
		required: [true, "An item id is required!"]
	},
	name: {
		type: String,
		required: [true, "An item name is required!"],
		trim: true
	},
	price: {
		type: Number,
		required: [true, "An item price is required!"]
	},
	description: {
		type: String
	},
	image: {
		type: String
	},
	link: {
		type: String
	}
});

module.exports = itemSchema;
