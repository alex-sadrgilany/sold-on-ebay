import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { useStoreContext } from "../../utils/GlobalState";

function Score() {
	const [state] = useStoreContext();

	return (
		<Box
			rounded="sm"
			borderWidth="2px"
			background="white"
			padding=".5rem"
			margin="1rem"
			position="absolute"
			top="1rem"
			left="1%"
			minWidth="5rem"
		>
			<Text fontWeight="bold">Score:</Text>
			<Text fontWeight="bold">{state.score}</Text>
		</Box>
	);
};

export default Score;
