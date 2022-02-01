const { gql } = require("apollo-server-express");

const typeDefs = gql`
	type User {
		_id: ID
		username: String
		email: String
		highScore: Int
		savedItems: [Item]
		orders: [Order]
	}

	type Item {
		itemId: ID!
		title: String
		price: Float
		image: String
		link: String
	}

	type Order {
		_id: ID
		donationDate: String
		donationAmount: Int
	}

	type Checkout {
		session: ID
	}

	type Auth {
		token: ID!
		user: User
	}

	type Query {
		me: User
		users: [User]
		user(username: String!): User
		checkout(amount: Int!): Checkout
	}

	input itemInput {
		itemId: String
		title: String
		image: String
		price: Float
		link: String
	}

	type Mutation {
		login(email: String!, password: String!): Auth
		addUser(username: String!, email: String!, password: String!): Auth
		addOrder(amount: Int!): User
		saveItem(itemData: itemInput!): User
		deleteItem(itemId: String!): User
		saveScore(userScore: Int!): User
	}
`;

module.exports = typeDefs;
