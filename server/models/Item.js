const { Schema } = require("mongoose");

// subdocument schema
const itemSchema = new Schema({
	itemId: {
		type: String
	},
	title: {
		type: String,
		trim: true
	},
	price: {
		type: Number,
	},
	image: {
		type: String
	},
	link: {
		type: String
	}
});

module.exports = itemSchema;