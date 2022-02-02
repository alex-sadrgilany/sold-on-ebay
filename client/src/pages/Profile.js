import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { QUERY_ME } from "../utils/queries";
import { DELETE_ITEM } from "../utils/mutations";
import {
	Flex,
	Heading,
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

import { removeItemId } from "../utils/localStorage";

function Profile() {
	const { loading, data } = useQuery(QUERY_ME);
	const [deleteItem, { error }] = useMutation(DELETE_ITEM);
	const { username, highScore, savedItems, orders } = data?.me || {};

	const colSpan = useBreakpointValue({ base: 2, md: 1 });

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

			removeItemId(id);
		} catch (err) {
			console.error(err);
		}
	};

	if (loading) {
		return <div>LOADING...</div>;
	}

	return (
		<Container maxW="container.xl" p={0}>
			<Flex
				h="auto"
				py={[0, 10, 20]}
				flexDirection={{ base: "column", md: "row" }}
			>
				<VStack h="full" w="full" py={[0, 10, 20]}>
					<VStack>
						<Heading>{username}'s Profile</Heading>
						<Heading>High Score {highScore}</Heading>
					</VStack>
					<SimpleGrid columns={2} columnGap={3} rowGap={3} w="full">
						<GridItem colSpan={colSpan}>
							{savedItems.length ? (
								savedItems.map((item) => {
									return (
										<SimpleGrid
											columns={2}
											columnGap={3}
											rowGap={3}
											w="full"
											p={2}
											key={item.itemId}
										>
											<Divider
												borderColor={"primary.blue"}
											></Divider>
											<GridItem colSpan={2}>
												<Text>{item.title}</Text>
											</GridItem>
											<GridItem colSpan={2}>
												<Flex
													justify="space-between"
													h={10}
												>
													<Text fontSize="lg">
														Sold Price
													</Text>
													<Text
														fontSize="xl"
														fontWeight="extrabold"
													>
														${item.price}
													</Text>
												</Flex>
											</GridItem>
											<GridItem colSpan={2}>
												<Button
													variant={"primary"}
													w="full"
												>
													<Link
														href={item.link}
														isExternal
													>
														View on eBay
													</Link>
												</Button>
											</GridItem>
											<GridItem colSpan={2}>
												<Image
													src={item.image}
													w="full"
												/>
											</GridItem>
											<GridItem colSpan={2}>
												<Button
													w="full"
													variant={"danger"}
													onClick={() =>
														handleDeleteItem(
															item.itemId
														)
													}
												>
													Delete Item
												</Button>
											</GridItem>
										</SimpleGrid>
									);
								})
							) : (
								<Text>You have no saved items</Text>
							)}
						</GridItem>

						<GridItem colSpan={colSpan}>
							{orders.length ? (
								orders.map(
									({ _id, donationAmount, donationDate }) => {
										return (
											<SimpleGrid
												columns={2}
												columnGap={3}
												rowGap={3}
												w="full"
												p={2}
												key={_id}
											>
												<Divider
													borderColor={"primary.blue"}
												></Divider>

												<GridItem colSpan={2}>
													<Flex
														justify="space-between"
														h={10}
													>
														<Text fontSize="lg">
															Date
														</Text>
														<Text
															fontSize="xl"
															fontWeight="extrabold"
															className="checkout-number"
														>
															{new Date(
																parseInt(
																	donationDate
																)
															).toLocaleDateString()}
														</Text>
													</Flex>
												</GridItem>
												<GridItem colSpan={2}>
													<Flex
														justify="space-between"
														h={10}
													>
														<Text fontSize="lg">
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
										);
									}
								)
							) : (
								<Text>You have no donations</Text>
							)}
						</GridItem>
					</SimpleGrid>
				</VStack>
			</Flex>
		</Container>
	);
}

export default Profile;
