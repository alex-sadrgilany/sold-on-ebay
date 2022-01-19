import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Provider } from "react-redux";
import createStore from "./store";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

const httpLink = createHttpLink({
	uri: "http://localhost:3001/graphql",
});
const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem("id_token");
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : ""
		}
	};
});
const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache()
});
const store = createStore;

function App() {
	return (
		<ApolloProvider client={client}>
			<Router>
				<div>
					<Provider store={store}>
						<Nav />
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/login" element={<Login />} />
							<Route path="/signup" element={<Signup />} />

							<Route path="*" element={<NoMatch />} />
						</Routes>
					</Provider>
				</div>
			</Router>
		</ApolloProvider>
	);
}

export default App;
