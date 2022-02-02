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
			bottom="0px"
			left="46.3%"
			minWidth="6rem"
			bgColor={"primary.yellow"}
			textAlign={"center"}
		>
			<Text fontWeight="bold">Score: {state.score}</Text>
		</Box>
	);
};

export default Score;
