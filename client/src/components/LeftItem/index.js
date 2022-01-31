import React from "react";
import PropTypes from "prop-types";
import { Box, Heading, Divider, Link, Image } from "@chakra-ui/core";

function LeftItem({ itemId, image, title, price, link }) {
	console.log(itemId, image, title, price, link);
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
			<Heading as="h3" size="lg">
				${decodeURIComponent(price)}
			</Heading>
			<Link href={decodeURIComponent(link)} isExternal>
				View on eBay!
			</Link>
		</Box>
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
