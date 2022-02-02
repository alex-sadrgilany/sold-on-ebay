import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";

import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";

import {
	FormControl,
	FormLabel,
	Input,
	VStack,
	Heading,
	Text,
	SimpleGrid,
	GridItem,
	Select,
	Center,
	Button,
	Link,
	FormErrorMessage,
	Container,
	Flex
} from "@chakra-ui/react";

function Login() {
	const [formState, setFormState] = useState({ email: "", password: "" });
	const [login, { error }] = useMutation(LOGIN_USER);

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		try {
			const mutationResponse = await login({
				variables: {
					email: formState.email,
					password: formState.password
				}
			});
			const token = mutationResponse.data.login.token;
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

	const isPasswordError = formState.password.length < 8;
	const isEmailError = !formState.email.match(/.+@.+\..+/);
	const allFieldsValid = !isPasswordError && !isEmailError;

	return (
		<Container maxW="container.xl" p={0}>
			<Flex h="auto" py={[0, 10, 20]}>
				<VStack w="full" h="full" p={10} spacing={10}>
					<VStack>
						<Heading>Login Form</Heading>
						<Text>
							<Link href="/signup" color="primary.red">Not a user?</Link>
						</Text>
					</VStack>
					<form id="signup-form" onSubmit={handleFormSubmit}>
						<SimpleGrid columns={2} columnGap={3} rowGap={3} w="full">
							<GridItem colSpan={2}>
								<FormControl isInvalid={isEmailError}>
									<FormLabel>Email</FormLabel>
									<Input
										placeholder="email@mail.com"
										name="email"
										type="email"
										id="email_input"
										onChange={handleChange}
									/>
									{isEmailError ? (
										<FormErrorMessage>
											Email must be a valid email address
										</FormErrorMessage>
									) : null}
								</FormControl>
							</GridItem>

							<GridItem colSpan={2}>
								<FormControl isInvalid={isPasswordError}>
									<FormLabel>Password</FormLabel>
									<Input
										placeholder="********"
										name="password"
										type="password"
										id="password_input"
										onChange={handleChange}
									/>
									{isPasswordError ? (
										<FormErrorMessage>
											Password must be at least 8
											characters
										</FormErrorMessage>
									) : null}
								</FormControl>
							</GridItem>
							<GridItem colSpan={2}>
								{error ? (
									<Text>All fields are required!</Text>
								) : null}
							</GridItem>
							<GridItem colSpan={2}>
								{allFieldsValid ? (
									<Button
										type="submit"
										w="full"
										variant={"primary"}
									>
										Submit
									</Button>
								) : null}
							</GridItem>
						</SimpleGrid>
					</form>
				</VStack>
			</Flex>
		</Container>
	);
}

export default Login;
