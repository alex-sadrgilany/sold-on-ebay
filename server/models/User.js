const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const bcrypt = require("bcrypt");
import isEmail from "validator/lib/isEmail";
import isLength from "validator/lib/isLength";

const itemSchema = require("./Item");

const userSchema = new Schema({
	username: {
		type: String,
		unique: true,
		require: [true, "A username is required!"],
		trim: true
	},
	email: {
		type: String,
		unique: true,
		required: [true, "An email is required!"],
		validate: [isEmail, "Please enter a valid email address!"]
	},
	password: {
		type: String,
		required: true,
		minlength: 8,
		validate: [
			isLength(password, 8),
			"Password must be at least 8 characters!"
		]
	},
	savedItems: [itemSchema]
});

// set up pre-save middleware to create password
userSchema.pre("save", async function (next) {
	if (this.isNew || this.isModified("password")) {
		const saltRounds = 10;
		this.password = await bcrypt.hash(this.password, saltRounds);
	}

	next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
