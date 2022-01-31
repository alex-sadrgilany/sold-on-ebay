import React from "react";
import { useStoreContext } from "../../utils/GlobalState";
import { Heading, Text } from "@chakra-ui/core";
import Auth from "../../utils/auth";

function GameOver() {
    const [state] = useStoreContext();

    const saveScore = () => {
        if (Auth.loggedIn()) {
            return (
                <button>Save Score!</button>
            )
        } else {
            return (
                <div>Sign up or Log in to save your high score!</div>
            )
        }
    }

    return (
        <div>
            <Heading as="h1" color="black">
                Game Over
            </Heading>
            <Text color="black">
                {`Your final score: ${state.score}`}
            </Text>
            {saveScore()}
        </div>
    );
};

export default GameOver;