import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";

import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

function Signup() {
	const [formState, setFormState] = useState({ email: "", password: "" });
	const [addUser, { error }] = useMutation(ADD_USER);

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		const mutationResponse = await addUser({
			variables: {
				username: formState.username,
				email: formState.email,
				password: formState.password
			}
		});
		const token = mutationResponse.data.addUser.token;
		Auth.login(token);
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormState({
			...formState,
			[name]: value
		});
	};

	return (
		<div>
			<Link to="/login">Already a user?</Link>
			<h2>Signup</h2>
			<form onSubmit={handleFormSubmit}>
				<div>
					<label>Username:</label>
					<input
						placeholder="user123"
						name="username"
						type="username"
						id="username_input"
						onChange={handleChange}
					/>
				</div>
				<div>
					<label>Email:</label>
					<input
						placeholder="email@mail.com"
						name="email"
						type="email"
						id="email_input"
						onChange={handleChange}
					/>
				</div>
				<div>
					<label>Password:</label>
					<input
						placeholder="********"
						name="password"
						type="password"
						id="password_input"
						onChange={handleChange}
					/>
				</div>
				{error ? (
					<div>
						<p>All fields are required!</p>
					</div>
				) : null}
				<div>
					<button type="submit">Submit</button>
				</div>
			</form>
		</div>
	);
}

export default Signup;
