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
		<VStack w="full" h="750px">
			<Heading maxH="90px" className="item-title">"{title}"</Heading>
			<Box className="text-overlay-box" boxSize="600px">
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
