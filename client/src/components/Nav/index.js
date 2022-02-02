import React, { useState } from "react";
import { Link, Box, Flex, Text, Button, Stack } from "@chakra-ui/react";
import Auth from "../../utils/auth";
import { GrClose, GrMenu } from "react-icons/gr";
import Logo from "../Logo";

function Nav(props) {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => {
		setIsOpen(!isOpen);
	};

	const MenuToggle = ({ toggle, isOpen }) => {
		return (
			<Box display={{ base: "block", md: "none" }} onClick={toggle}>
				{isOpen ? <GrClose /> : <GrMenu />}
			</Box>
		);
	};

	const MenuItem = ({ children, isLast, to = "/", ...rest }) => {
		return (
			<Link href={to}>
				<Text display="block" {...rest}>
					{children}
				</Text>
			</Link>
		);
	};

	const MenuLinks = ({ isOpen }) => {
		return (
			<Box
				display={{ base: isOpen ? "block" : "none", md: "block" }}
				flexBasis={{ base: "100%", md: "auto" }}
			>
				<Stack
					spacing={8}
					align="center"
					justify={[
						"center",
						"space-between",
						"flex-end",
						"flex-end"
					]}
					direction={["column", "row", "row", "row"]}
					pt={[4, 4, 0, 0]}
				>
					{showNav()}
				</Stack>
			</Box>
		);
	};

	const NavBarContainer = ({ children, ...props }) => {
		return (
			<Flex
				as="nav"
				align="center"
				justify="space-between"
				wrap="wrap"
				w="100%"
				mb={8}
				p={8}
				bg={[
					"primary.red",
					"primary.red",
					"transparent",
					"transparent"
				]}
				color={["white", "white", "primary.blue", "primary.blue"]}
				{...props}
			>
				{children}
			</Flex>
		);
	};

	const showNav = () => {
		if (Auth.loggedIn()) {
			return (
				<>
					<MenuItem to="/profile">My Profile</MenuItem>
					<MenuItem to="/" isLast>
						<Button onClick={() => Auth.logout()}>Logout</Button>
					</MenuItem>
				</>
			);
		} else {
			return (
				<>
					<MenuItem to="/login">Login</MenuItem>
					<MenuItem to="/signup" isLast>
						Signup
					</MenuItem>
				</>
			);
		}
	};

	return (
		<NavBarContainer {...props}>
			<Logo
				w="100px"
				color={["white", "white", "primary.green", "primary.green"]}
			/>
			<MenuToggle toggle={toggle} isOpen={isOpen} />
			<MenuLinks isOpen={isOpen} />
		</NavBarContainer>
	);
}

export default Nav;
