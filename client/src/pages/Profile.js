import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { QUERY_ME } from "../utils/queries";
import { DELETE_ITEM } from "../utils/mutations";
import {
	Box,
	Flex,
	Heading,
	HStack,
	Stack,
	Button,
	Text,
	Container,
	VStack,
	SimpleGrid,
	GridItem,
	useBreakpointValue,
	Image,
	Link,
	Divider
} from "@chakra-ui/react";

function Profile() {
	const { loading, data } = useQuery(QUERY_ME);
	const [deleteItem, { error }] = useMutation(DELETE_ITEM);
	const { username, highScore, savedItems, orders } = data?.me || {};

	console.log(data);

	console.log(orders);
	// function to handle deleting item from User
	const handleDeleteItem = async (id) => {
		const token = Auth.loggedIn() ? Auth.getToken() : null;

		if (!token) {
			return false;
		}

		try {
			const { data } = await deleteItem({
				variables: { itemId: id }
			});
		} catch (err) {
			console.error(err);
		}
	};

	if (loading) {
		return <div>LOADING...</div>;
	}

	return (
		<Container maxW="container.xl" p={0}>
			<VStack h="auto" py={[0, 10, 20]}>
			<Heading textAlign={"center"}>{username}'s Profile</Heading>
			<Text textAlign={"center"}>High Score {highScore}</Text>
			</VStack>
			
			<Flex
				h="auto"
				py={[0, 10, 20]}
				flexDirection={{ base: "column", md: "row" }}
			>
				<VStack
					w="full"
					h="full"
					p={10}
					spacing={10}
					alignItems="flex-start"
				>
					<Text>Saved Items</Text>

					{savedItems?.map((item) => {
						return (
							<VStack key={item.itemId}>
								<SimpleGrid
									columns={2}
									columnGap={3}
									rowGap={3}
									w="full"
								>
									<Divider borderColor={"primary.blue"}></Divider>
									<GridItem colSpan={2}>
										<Text>{item.title}</Text>
									</GridItem>
									<GridItem colSpan={1}>
										<Flex justify="space-between" h={10}>
											<Text
												fontSize="lg"
												fontWeight="semibold"
											>
												Sold Price
											</Text>
											<Text
												fontSize="xl"
												fontWeight="extrabold"
												className="checkout-number"
											>
												{item.price}
											</Text>
										</Flex>
									</GridItem>
									<GridItem colSpan={1}>
										<Link href={item.link} isExternal>
											View on eBay
										</Link>
									</GridItem>
									<GridItem colSpan={2}>
										<Image src={item.image} />
									</GridItem>
									<GridItem colSpan={2}>
										<Button
											variant={"danger"}
											onClick={() =>
												handleDeleteItem(item.itemId)
											}
										>
											Delete Item
										</Button>
									</GridItem>
									<Divider borderColor={"primary.blue"}></Divider>
								</SimpleGrid>
							</VStack>
						);
					})}
				</VStack>
				<VStack
					w="full"
					h="full"
					p={10}
					spacing={10}
					alignItems="flex-start"
				>
					<Text>Donation History</Text>
					{orders?.map(({ _id, donationAmount, donationDate }) => {
						return (
							<VStack key={_id}>
								<SimpleGrid
									columns={2}
									columnGap={3}
									rowGap={3}
									w="full"
								>
									<GridItem colSpan={1}>
										<Flex justify="space-between" h={10}>
											<Text
												fontSize="lg"
												fontWeight="semibold"
											>
												Date
											</Text>
											<Text
												fontSize="xl"
												fontWeight="extrabold"
												className="checkout-number"
											>
												{new Date(
													parseInt(donationDate)
												).toLocaleDateString()}
											</Text>
										</Flex>
									</GridItem>
									<GridItem colSpan={1}>
										<Flex justify="space-between" h={10}>
											<Text
												fontSize="lg"
												fontWeight="semibold"
											>
												Amount
											</Text>
											<Text
												fontSize="xl"
												fontWeight="extrabold"
												className="checkout-number"
											>
												${donationAmount}
											</Text>
										</Flex>
									</GridItem>
									
								</SimpleGrid>
							</VStack>
						);
					})}
				</VStack>
			</Flex>
		</Container>
	);
}

export default Profile;
