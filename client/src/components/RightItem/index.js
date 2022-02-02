import React from "react";
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
	
	return (
		<VStack>
			<Heading>"{title}"</Heading>
			<Box className="text-overlay-box" w="full" h="750px">
				<Image src={image} w="100%" h="100%" />
				<Text 
					className="price-overlay hide"
				>
					$<span className="number-animate" data-end-value={price.toFixed(2)} data-increment="0.01" data-duration="1500">0</span>
				</Text>
			</Box>

			<SimpleGrid columns={1}>
				<Button
					colSpan={1}
					variant="primary"
					onClick={() => checkAnswer("higher")}
				>
					Higher
				</Button>
				<Button
					colSpan={1}
					variant="primary"
					onClick={() => checkAnswer("lower")}
				>
					Lower
				</Button>
				<Button colSpan={1} variant="primary">
					<Link href={link} isExternal>
						Details on eBay!
					</Link>
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
