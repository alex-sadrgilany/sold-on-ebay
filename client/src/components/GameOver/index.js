import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useStoreContext } from "../../utils/GlobalState";
import { Heading, Text } from "@chakra-ui/core";
import Auth from "../../utils/auth";
import { useNavigate } from "react-router-dom";

import { QUERY_ME } from "../../utils/queries";
import { SAVE_SCORE } from "../../utils/mutations";

function GameOver() {
	const [state] = useStoreContext();
	const navigate = useNavigate();
	const [saveScore, { error }] = useMutation(SAVE_SCORE);
	const { loading, data } = useQuery(QUERY_ME);
	const userData = data?.me || {};
	console.log(userData);

	const { score } = state;
	console.log(userData.highScore);

	// const handleSaveScore = async (s) => {
	// 	const scoreToSave = s;

	// 	// get token
	// 	const token = Auth.loggedIn() ? Auth.getToken() : null;

	// 	if (!token) {
	// 		return false;
	// 	}

	// 	try {
	// 		const { data } = await saveScore({
	// 			variables: { userScore: scoreToSave }
	// 		});
	// 	} catch (err) {
	// 		console.error(err);
	// 	}
	// };

	// const ifScoreHigher = () => {

	// }

	const showSaveScore = () => {
		if (Auth.loggedIn()) {
			if (score <= userData.highScore) {
				return (
					<div>
						This score does not beat your high score! Try again!
					</div>
				);
			} else {
				return (
					<button
						onClick={() => {
							const scoreToSave = score;

							// get token
							const token = Auth.loggedIn()
								? Auth.getToken()
								: null;

							if (!token) {
								return false;
							}

							try {
								const { data } = saveScore({
									variables: { userScore: scoreToSave }
								});

								navigate("/profile");
							} catch (err) {
								console.error(err);
							}
						}}
					>
						Save High Score!
					</button>
				);
			}
		} else {
			return <div>Sign up or Log in to save your high score!</div>;
		}
	};

	return (
		<div>
			<Heading as="h1" color="black">
				Game Over
			</Heading>
			<Text color="black">{`Your final score: ${state.score}`}</Text>
			{showSaveScore()}
		</div>
	);
}

export default GameOver;
