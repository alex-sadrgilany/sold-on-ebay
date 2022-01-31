import React from "react";
import { Heading } from "@chakra-ui/core";
import ImportDataButton from "../ImportDataButton";

function Welcome () {
    return (
        <div>
            <Heading>
                Welcome to the Game!
            </Heading>

            <ImportDataButton />
        </div>
    );
};

export default Welcome;