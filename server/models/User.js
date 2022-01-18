const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const bcrypt = require("bcrypt");
const validate = require("mongoose-validator");

const itemSchema = require("./Item");

const isEmail = validate({
    validator: "isEmail",
    message: "Please enter a valid email address!"
});
const isLength = validate({
    validator: "isLength",
    arguments: [8],
    message: "Password must be at least 8 characters!"
});

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
		validate: isEmail
	},
	password: {
		type: String,
		required: true,
		minlength: 8,
		validate: isLength
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
