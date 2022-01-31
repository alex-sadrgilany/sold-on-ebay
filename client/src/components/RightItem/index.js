import React from "react";
import PropTypes from "prop-types";
import {
	Box,
	Button,
	Heading,
	Divider,
	Image,
	Link,
	Text
} from "@chakra-ui/core";

function RightItem({ itemId, image, title, price, link, checkAnswer }) {
	return (
		<Box
			rounded="lg"
			textAlign="center"
			borderWidth="2px"
			background="white"
			padding="2rem"
			width="85vw"
			key={decodeURIComponent(itemId)}
		>
			<Image src={decodeURIComponent(image)} />
			<Heading as="h2" size="xl">
				{decodeURIComponent(title)}
			</Heading>
			<Divider borderColor="black.600" />
			<Heading as="h3" size="lg" className="hide">
				${decodeURIComponent(price.toFixed(2))}
			</Heading>
			<Link href={decodeURIComponent(link)} isExternal>
				View on eBay!
			</Link>
			<div className="buttons">
				<Button
					variantColor="blue"
					display="block"
					margin="1rem auto"
					onClick={() => checkAnswer("higher")}
				>
					<Text>Higher</Text>
				</Button>
				<Button
					variantColor="yellow"
					display="block"
					margin="1rem auto"
					onClick={() => checkAnswer("lower")}
				>
					<Text>Lower</Text>
				</Button>
			</div>
		</Box>
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
