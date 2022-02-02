import React from "react";
import { Heading, Flex, Container, VStack, Text, Center } from "@chakra-ui/react";
import ImportDataButton from "../ImportDataButton";


function Welcome() {
	return (
			<VStack>
				<Heading>Welcome!</Heading>
				<Text>The best way to describe this game is that it is HigherLower: eBay Edition</Text>
				<Text>If you've never played HigherLower before, the rules are very simple. You must guess if the item presented to you sold for more or less than the control item.</Text>
				<Text>Enter a category to get started!</Text>
				<ImportDataButton />
			</VStack>
	);
}

export default Welcome;
