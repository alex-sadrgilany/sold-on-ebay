import React from "react";
import { Heading, Flex, Container, VStack, Text, Center, Box, SimpleGrid,
	GridItem, } from "@chakra-ui/react";
import ImportDataButton from "../ImportDataButton";


function Welcome() {
	return (
			<VStack>
				<Heading>Welcome!</Heading>
				<SimpleGrid columns={1}>
					<GridItem colSpan={1}></GridItem>
					<GridItem colSpan={1}><Text>The best way to describe this game is that it is HigherLower: eBay Edition</Text></GridItem>
					<GridItem colSpan={1}><Text>If you've never played HigherLower before, the rules are very simple. You must guess if the item presented to you sold for more or less than the control item.</Text></GridItem>
					<GridItem colSpan={1}><Text>Enter a category to get started!</Text></GridItem>
					<GridItem colSpan={1}><ImportDataButton /></GridItem>
				
				</SimpleGrid>
			</VStack>
	);
}

export default Welcome;
