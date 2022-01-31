import React from "react";
import { useStoreContext } from "../../utils/GlobalState";
import { Heading, Text } from "@chakra-ui/core";

function GameOver() {
    const [state] = useStoreContext();

    return (
        <div>
            <Heading as="h1" color="black">
                Game Over
            </Heading>
            <Text color="black">
                {`Your final score: ${state.score}`}
            </Text>
        </div>
    );
};

export default GameOver;