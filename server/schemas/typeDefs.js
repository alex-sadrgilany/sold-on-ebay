const { gql } = require("apollo-server-express");

const typeDefs = gql`
	type User {
		_id: ID
		username: String
		email: String
		savedItems: [Item]
	}

	type Item {
		itemId: ID
		name: String
		price: Float
		description: String
		image: String
		link: String
	}

	type Auth {
		token: ID!
		user: User
	}

	type Query {
		me: User
		users: [User]
		user(username: String!): User
	}

	input itemInput {
		itemId: String
		name: String
		description: String
		image: String
		price: Float
		link: String
	}

	type Mutation {
		login(email: String!, password: String!): Auth
		addUser(username: String!, email: String!, password: String!): Auth
		saveItem(itemData: itemInput!): User
		deleteItem(itemId: ID!): User
	}
`;

module.exports = typeDefs;
