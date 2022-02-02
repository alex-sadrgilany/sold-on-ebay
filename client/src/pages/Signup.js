import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { ADD_USER } from "../utils/mutations";
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
	Button,
	Link,
	FormErrorMessage,
	FormHelperText,
	Container,
	Flex,
	useBreakpointValue
} from "@chakra-ui/react";

function Signup() {
	const [formState, setFormState] = useState({
		username: "",
		email: "",
		password: ""
	});
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

	const isPasswordError = formState.password.length < 8;
	const isEmailError = !formState.email.match(/.+@.+\..+/);
	const isUsernameError = formState.username === "";
	const allFieldsValid =
		!isPasswordError && !isEmailError && !isUsernameError;

	const colSpan = useBreakpointValue({ base: 2, md: 1 });

	return (
		<Container maxW="container.xl" p={0}>
			<Flex h="auto" py={[0, 10, 20]}>
				<VStack w="full" h="full" p={10} spacing={10}>
					<VStack>
						<Heading>Signup Form</Heading>
						<Text>
							<Link href="/login" color="primary.green">
								Already a user?
							</Link>
						</Text>
					</VStack>
					<form id="signup-form" onSubmit={handleFormSubmit}>
						<SimpleGrid
							columns={2}
							w="full"
							columnGap={5}
							rowGap={3}
						>
							<GridItem colSpan={2}>
								<FormControl isInvalid={isEmailError}>
									<FormLabel>Email</FormLabel>
									<Input
										placeholder="email@mail.com"
										name="email"
										type="email"
										id="email_input"
										value={formState.email}
										onChange={handleChange}
									/>
									{isEmailError ? (
										<FormErrorMessage>
											Email must be a valid email address
										</FormErrorMessage>
									) : (
										<FormHelperText>
											We will never share your data
										</FormHelperText>
									)}
								</FormControl>
							</GridItem>
							<GridItem colSpan={colSpan}>
								<FormControl isInvalid={isUsernameError}>
									<FormLabel>Username</FormLabel>
									<Input
										placeholder="user123"
										name="username"
										type="username"
										id="username-input"
										value={formState.username}
										onChange={handleChange}
									/>
									{isUsernameError ? (
										<FormErrorMessage>
											Username is required
										</FormErrorMessage>
									) : null}
								</FormControl>
							</GridItem>
							<GridItem colSpan={colSpan}>
								<FormControl isInvalid={isPasswordError}>
									<FormLabel>Password</FormLabel>
									<Input
										placeholder="********"
										name="password"
										type="password"
										id="password_input"
										value={formState.password}
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
									<Text color="primary.red">
										Username and/or Email already exist!
									</Text>
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

export default Signup;
