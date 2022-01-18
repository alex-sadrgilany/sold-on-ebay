import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";

import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";

function Login() {
	const [formState, setFormState] = useState({ email: "", password: "" });
	cpmst[(login_user, { error })] = useMutation(LOGIN_USER);

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		try {
			const mutationResponse = await login_user({
				variables: {
					email: formState.email,
					password: formState.password
				}
			});
			const token = mutationResponse.data.login_user.token;
			Auth.login(token);
		} catch (err) {
			console.error(err);
		}
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
			<Link to="/signup">Not a user?</Link>
			<h2>Login</h2>
			<form onSubmit={handleFormSubmit}>
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
						<p>Incorrect credentials!</p>
					</div>
				) : null}
				<div>
					<button type="submit">Submit</button>
				</div>
			</form>
		</div>
	);
}

export default Login;
