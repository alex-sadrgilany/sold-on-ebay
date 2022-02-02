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
	SimpleGrid
} from "@chakra-ui/react";

function RightItem({ itemId, image, title, price, link, checkAnswer }) {
	const [toggleHide, setToggleHide] = useState(true);
	return (
		<VStack>
			<Heading>"{title}"</Heading>
			<Box className="text-overlay-box" w="full" h="750px">
				<Image src={image} w="100%" h="100%" />
				<Text 
					className={`price-overlay ${toggleHide ? "hide" : ""}`}
				>
					$<span className="number-animate" data-end-value={price.toFixed(2)} data-increment="0.01" data-duration="1500">0</span>
				</Text>
			</Box>

			<SimpleGrid columns={1}>
				<Button
					colSpan={1}
					variant="danger"
					onClick={() => {
						setToggleHide(false);
						checkAnswer("higher")
						setTimeout(() => {
							setToggleHide(true)
						}, [2000]);
					}}
				>
					Higher
				</Button>
				<Button
					colSpan={1}
					variant="danger"
					onClick={() => {
						setToggleHide(false);
						checkAnswer("lower")
						setTimeout(() => {
							setToggleHide(true)
						}, [2000]);
					}}
				>
					Lower
				</Button>
			</SimpleGrid>
		</VStack>
	);
}

RightItem.defaultProps = {
	image: "",
	title: "",
	price: 0,
	link: "",
	itemId: ""
};
RightItem.propTypes = {
	image: PropTypes.string,
	title: PropTypes.string,
	price: PropTypes.number,
	link: PropTypes.string,
	itemId: PropTypes.string,
	checkAnswer: PropTypes.func.isRequired
};

export default RightItem;
