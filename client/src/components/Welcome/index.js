import React from "react";
import {
	Heading,
	Flex,
	Container,
	VStack,
	Text,
	Center,
	Box,
	SimpleGrid,
	GridItem
} from "@chakra-ui/react";
import ImportDataButton from "../ImportDataButton";

function Welcome() {
	return (
		<Container maxW="container.xl" p={0}>
			<Flex h="auto" py={[0, 10, 20]}>
				<VStack w="full" h="full">
					<Heading>What did these items sell for on eBay?</Heading>
					<SimpleGrid columns={1}>
						<GridItem p={2} colSpan={1}>
							<Text>
								This is a simple guessing game inspired by HigherLower.
							</Text>
						</GridItem>
						<GridItem p={2} colSpan={1}>
							<Text>
								If you've played HigherLower before, the only difference here is you search for your own category.
							</Text>
						</GridItem>
						<GridItem  p={2} colSpan={1}>
							<Text>
								If you haven't ever played HigherLower, the object is to guess whether one item sold for more or less than the other.
							</Text>
						</GridItem>
						<GridItem p={2} colSpan={1}>
							<ImportDataButton />
						</GridItem>
					</SimpleGrid>
				</VStack>
			</Flex>
		</Container>
	);
}

export default Welcome;
