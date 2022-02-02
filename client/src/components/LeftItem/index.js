import React, { useState, useEffect } from "react";
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

import { saveItemIds, getSavedItemIds } from "../../utils/localStorage";

import { useStoreContext } from "../../utils/GlobalState";
import { useMutation } from "@apollo/client";
import { SAVE_ITEM } from "../../utils/mutations";
import Auth from "../../utils/auth";

function LeftItem({ itemId, image, title, price, link }) {
	const [state, dispatch] = useStoreContext();
	const [saveItem, { error }] = useMutation(SAVE_ITEM);
	const [savedItemIds, setSavedItemIds] = useState(getSavedItemIds());

	const { items } = state;

	useEffect(() => {
		return () => saveItemIds(savedItemIds);
	});

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

			setSavedItemIds([...savedItemIds, itemToSave.itemId]);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<VStack
			w="full"
			h="full"
			spacing={1}
			padding={1}
			alignItems="flex-start"
			position={"relative"}
		>
			<SimpleGrid columns={2} columnGap={3} rowGap={3} w="full">
				<GridItem colSpan={2} h="100px">
					<Heading
						textAlign={"center"}
						fontSize={title.length > 50 ? "28" : null}
					>
						"{title}"
					</Heading>
				</GridItem>
				<GridItem colSpan={2}>
					<Image src={image} w="full" h="650px" />
					<Text
						className="price-overlay left-price"
						fontSize={{ base: "65px", md: "100px" }}
					>
						${price.toFixed(2)}
					</Text>
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
							disabled={savedItemIds?.some(
								(savedItemId) => savedItemId === itemId
							)}
							w="full"
							variant="danger"
							onClick={() => handleSaveItem(itemId)}
						>
							{savedItemIds?.some(
								(savedItemId) => savedItemId === itemId
							)
								? "Item Saved"
								: "Save Item"}
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
