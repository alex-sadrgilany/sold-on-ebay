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
		description: String
		image: String
		price: Int
		link: String
	}

	type Auth {
		token: ID!
		user: User
	}

	type Query {
		me: User
	}

	input itemInput {
		itemId: String
		name: String
		description: String
		image: String
		price: Int
		link: String
	}

	type Mutation {
		login(email: String!, password: String!): Auth
		addUser(username: String!, email: String!, password: String!): Auth
		saveItem(itemData: itemInput!): User
		removeItem(itemId: ID!): User
	}
`;

module.exports = typeDefs;
