import React from "react";
import Jumbotron from "../components/Jumbotron";

function NoMatch() {
    return (
        <div>
            <Jumbotron>
                <h1>404 Page Not Found =/</h1>
                <h1>
                    <span role="img" aria-label="Serious Face with Symbols Covering Mouth">
                        🤬
                    </span>
                </h1>
            </Jumbotron>
        </div>
    )
};

export default NoMatch;