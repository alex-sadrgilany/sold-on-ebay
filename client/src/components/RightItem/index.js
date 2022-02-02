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

function RightItem({ itemId, image, title, price, link, checkAnswer }) {
	const [toggleHide, setToggleHide] = useState(true);
	return (
		<VStack w="full" h="full" spacing={1} padding={1} alignItems="flex-start" position={"relative"}>
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
						className={`price-overlay right-price-green ${toggleHide ? "hide" : ""}`}
						fontSize={{ base: "65px", md: "100px" }}
					>
						$
						<span
							className="number-animate right-price-int"
							data-end-value={price.toFixed(2)}
							data-increment="0.01"
							data-duration="1500"
						>
							0
						</span>
					</Text>
				</GridItem>
				<GridItem colSpan={2}>
					<Button
						w="full"
						variant="danger"
						onClick={() => {
							setToggleHide(false);
							checkAnswer("higher");
							setTimeout(() => {
								setToggleHide(true);
							}, 2000);
						}}
					>
						Higher
					</Button>
				</GridItem>
				<GridItem colSpan={2}>
					<Button
						w="full"
						variant="danger"
						onClick={() => {
							setToggleHide(false);
							checkAnswer("lower");
							setTimeout(() => {
								setToggleHide(true);
							}, 2000);
						}}
					>
						Lower
					</Button>
				</GridItem>
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
