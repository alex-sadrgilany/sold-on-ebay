import React, { useState } from "react";
import PropTypes from "prop-types";
import {
	Box,
	Heading,
	Divider,
	Link,
	Image,
	Button,
	VStack,
	Stack,
	Text,
	SimpleGrid
} from "@chakra-ui/react";

import { useStoreContext } from "../../utils/GlobalState";
import { useMutation } from "@apollo/client";
import { SAVE_ITEM } from "../../utils/mutations";
import Auth from "../../utils/auth";

function LeftItem({ itemId, image, title, price, link }) {
	const [state, dispatch] = useStoreContext();
	const [saveItem, { error }] = useMutation(SAVE_ITEM);

	const { items } = state;

	const handleSaveItem = async (id) => {
		const itemToSave = items.find((item) => item.itemId === id);

		// get token
		const token = Auth.loggedIn() ? Auth.getToken() : null;

		if (!token) {
			console.log("no token found");
			return false;
		}

		try {
			const { data } = await saveItem({
				variables: { itemData: { ...itemToSave } }
			});
		} catch (err) {
			console.error(err);
		}
	};

	return (
		// <Box
		// 	rounded="lg"
		// 	textAlign="center"
		// 	borderWidth="2px"
		// 	background="white"
		// 	padding="2rem"
		// 	width="40%"
		// 	key={decodeURIComponent(itemId)}
		// >
		// 	<Image src={decodeURIComponent(image)} />
		// 	<Heading as="h2" size="xl">
		// 		{decodeURIComponent(title)}
		// 	</Heading>
		// 	<Divider borderColor="black.600" />
		// 	<Heading as="h3" size="lg">
		// 		${decodeURIComponent(price.toFixed(2))}
		// 	</Heading>
		// <Link href={decodeURIComponent(link)} isExternal>
		// 	View on eBay!
		// </Link>
		// {Auth.loggedIn() && (
		// 	<Button
		// 		onClick={() => handleSaveItem(itemId)}
		// 	>
		// 		Save this Item!
		// 	</Button>
		// )}
		// {error && <div>Save Item failed =/</div>}
		// </Box>

		<VStack>
			<Heading>"{title}"</Heading>
			<Box className="text-overlay-box" w="full" h="750px">
				<Image src={image} w="100%" h="100%" />
				<Text className="price-overlay">${price.toFixed(2)}</Text>
			</Box>

			<SimpleGrid columns={2}>
				<Button colSpan={1} variant="danger">
					<Link href={link} isExternal>
						Details on eBay!
					</Link>
				</Button>
				{Auth.loggedIn() ? (
					<Button
						colSpan={1}
						variant="danger"
						onClick={() => handleSaveItem(itemId)}
					>
						Save this Item!
					</Button>
				) : (
					<Text colSpan={1}>
						Signup/Login to Save
					</Text>
				)}
			</SimpleGrid>
		</VStack>
	);
}

LeftItem.defaultProps = {
	image: "",
	title: "",
	price: 0,
	link: "",
	itemId: ""
};
LeftItem.propTypes = {
	image: PropTypes.string,
	title: PropTypes.string,
	price: PropTypes.number,
	link: PropTypes.string,
	itemId: PropTypes.string
};

export default LeftItem;
