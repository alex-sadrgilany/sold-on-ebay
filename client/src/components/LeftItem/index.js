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
	SimpleGrid,
	GridItem
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
		<VStack w="full" h="full" p={10} spacing={10} alignItems="flex-start">
			<SimpleGrid columns={2} columnGap={3} rowGap={3} w="full">
				<GridItem colSpan={2} h="100px">
					<Heading textAlign={"center"}>"{title}"</Heading>
				</GridItem>
				<GridItem colSpan={2}>
					<Image src={image} w="full" h="650px"/>
					<Text className="price-overlay">${price.toFixed(2)}</Text>
				</GridItem>
				<GridItem colSpan={2}>
					<Button w="full" variant="danger">
						<Link href={link} isExternal>
							Details on eBay!
						</Link>
					</Button>
				</GridItem>
				<GridItem colSpan={2}>
					{Auth.loggedIn() ? (
						<Button
							w="full"
							variant="danger"
							onClick={() => handleSaveItem(itemId)}
						>
							Save this Item!
						</Button>
					) : (
						<Text textAlign={"center"}>Signup/Login to Save</Text>
					)}
				</GridItem>
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
