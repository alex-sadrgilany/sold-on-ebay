const { User, Order } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const resolvers = {
	Query: {
		me: async (parent, args, context) => {
			if (context.user) {
				const userData = await User.findOne({
					_id: context.user._id
				})
					.select("-__v -password")
					.populate("savedItems")
					.populate("orders");

				return userData;
			}
			throw new AuthenticationError("You must be logged in!");
		},
		users: async () => {
			const usersData = await User.find()
				.select("-__v -password")
				.populate("savedItems")
				.populate("orders");

			return usersData;
		},
		user: async (parent, { username }) => {
			const userData = await User.findOne({ username })
				.select("-__v -password")
				.populate("savedItems")
				.populate("orders");

			return userData;
		},
		order: async (parent, { _id }, context) => {
			if (context.user) {
				const user = await User.findById(context.user._id).populate(
					"orders"
				);

				return user.orders.id(_id);
			}
			throw new AuthenticationError("You must be logged in!");
		},
		checkout: async (parent, args, context) => {
			const url = new URL(context.headers.referer).origin;
			const order = new Order({ donationAmount: args.amount });
			const line_items = [];

			const { donationAmount } = order;

			const product = await stripe.products.create({
				name: "Donation",
				description: "A small donation for enjoying the game"
			});

			const price = await stripe.prices.create({
				product: product.id,
				unit_amount: donationAmount * 100,
				currency: "usd"
			});

			line_items.push({
				price: price.id,
				quantity: 1
			});

			const session = await stripe.checkout.sessions.create({
				payment_method_types: ["card"],
				line_items,
				mode: "payment",
				success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
				cancel_url: `${url}/`
			});

			return { session: session.id };
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
		deleteItem: async (parent, { itemId }, context) => {
			if (context.user) {
				const user = await User.findByIdAndUpdate(
					{
						_id: context.user._id
					},
					{
						$pull: { savedItems: { itemId } }
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
		saveScore: async (parent, args, context) => {
			if (context.user) {
				const user = await User.findByIdAndUpdate(
					{
						_id: context.user._id
					},
					{
						$set: { highScore: args.userScore }
					},
					{
						new: true,
						runValidators: true,
						overwrite: true
					}
				);
				return user;
			}
			throw new AuthenticationError("You must be logged in!");
		},
		addOrder: async (parent, { amount }, context) => {
			if (context.user) {
				const order = new Order(amount);

				await User.findByIdAndUpdate(context.user._id, {
					$push: { orders: order }
				});

				return order;
			}
			throw new AuthenticationError("You must be logged in!");
		}
	}
};

module.exports = resolvers;
