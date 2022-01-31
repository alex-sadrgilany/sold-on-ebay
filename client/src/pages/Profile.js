import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { QUERY_ME } from "../utils/queries";
import { DELETE_ITEM } from "../utils/mutations";
import { Box, Heading, Divider, Link, Image, Button } from "@chakra-ui/core";

function Profile() {
	const { loading, data } = useQuery(QUERY_ME);
	const [deleteItem, { error }] = useMutation(DELETE_ITEM);
	const { username, highScore, savedItems } = data?.me || {};

	// function to handle deleting item from User
	const handleDeleteItem = async (id) => {
		const token = Auth.loggedIn() ? Auth.getToken() : null;

		if (!token) {
			return false;
		}

		try {
			const { data } = await deleteItem({
				variables: { itemId: id}
			});

			// remove itemId from localstorage
		} catch (err) {
			console.error(err);
		}
	};

	if (loading) {
		return <div>LOADING...</div>;
	}

	return (
		<div>
			<h1>{username}'s Profile</h1>
			<h2>Your high score: {highScore}</h2>
			<div>
				{savedItems.map((item) => {
					return (
						<Box
							rounded="lg"
							textAlign="center"
							borderWidth="2px"
							background="white"
							padding="2rem"
							width="85vw"
							key={decodeURIComponent(item.itemId)}
						>
							<Image src={decodeURIComponent(item.image)} />
							<Heading as="h2" size="xl">
								{decodeURIComponent(item.title)}
							</Heading>
							<Divider borderColor="black.600" />
							<Heading as="h3" size="lg">
								${decodeURIComponent(item.price.toFixed(2))}
							</Heading>
							<Link href={decodeURIComponent(item.link)} isExternal>
								View on eBay!
							</Link>
							{Auth.loggedIn() && (
								<Button onClick={() => handleDeleteItem(item.itemId)}>
									Delete this Item!
								</Button>
							)}
							{error && <div>Delete Item failed =/</div>}
						</Box>
					);
				})}
			</div>
		</div>
	);
}

export default Profile;
