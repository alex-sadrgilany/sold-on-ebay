const { User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
	Query: {
		me: async (parent, args, context) => {
			if (context.user) {
				const userData = await User.findOne({
					_id: context.user._id
				})
					.select("-__v -password")
					.populate("savedItems");

				return userData;
			}
			throw new AuthenticationError("You must be logged in!");
		},
		users: async () => {
			const usersData = await User.find()
				.select("-__v -password")
				.populate("savedItems");
			return usersData;
		},
		user: async (parent, { username }) => {
			const userData = await User.findOne({ username })
				.select("-__v -password")
				.populate("savedItems");
			return userData;
		}
	},
	Mutation: {
		login: async (parent, { email, password }) => {
			const user = await User.findOne({ email });
			if (!user) {
				throw new AuthenticationError("Invalid credentials!");
			}

			const correctPw = await user.isCorrectPassword(password);
			if (!correctPw) {
				throw new AuthenticationError("Invalid credentials!");
			}

			const token = signToken(user);
			return { token, user };
		},
		addUser: async (parent, args) => {
			const user = await User.create(args);
			const token = signToken(user);
			return { token, user };
		},
		saveItem: async (parent, args, context) => {
			if (context.user) {
				const user = await User.findByIdAndUpdate(
					{
						_id: context.user._id
					},
					{
						$addToSet: { savedItems: args.itemData }
					},
					{
						new: true,
						runValidators: true
					}
				);
				return user;
			}
			throw new AuthenticationError("You must be logged in!");
		},
		deleteItem: async (parent, args, context) => {
			if (context.user) {
				const user = await User.findByIdAndUpdate(
					{
						_id: context.user._id
					},
					{
						$pull: { savedItems: args.itemId }
					},
					{
						new: true,
						runValidators: true
					}
				);
				return user;
			}
			throw new AuthenticationError("You must be logged in!");
		},
		
	}
};

module.exports = resolvers;
