import React from "react";
import { Text, Flex, Center } from "@chakra-ui/react";
import { useStoreContext } from "../../utils/GlobalState";

function Score() {
	const [state] = useStoreContext();

	return (
		<Flex>
			<Center w="100px" bg="black" h="50px">
				<Text color="white" fontWeight="bold">
					Score: {state.score}
				</Text>
			</Center>
		</Flex>
	);
}

export default Score;
