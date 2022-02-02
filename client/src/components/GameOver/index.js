import React, { useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useStoreContext } from "../../utils/GlobalState";
import {
	Heading,
	Text,
	Container,
	Link,
	Button,
	VStack,
	Flex,
	SimpleGrid,
	GridItem,
	useBreakpointValue,
	Center
} from "@chakra-ui/react";
import Auth from "../../utils/auth";
import { useNavigate } from "react-router-dom";

import { QUERY_ME } from "../../utils/queries";
import { SAVE_SCORE } from "../../utils/mutations";

function GameOver() {
	const [state] = useStoreContext();
	const navigate = useNavigate();
	const { loading, data } = useQuery(QUERY_ME);
	const [saveScore, { error }] = useMutation(SAVE_SCORE);
	const userData = data?.me || {};
	const { score } = state;

	const colSpan = useBreakpointValue({ base: 2, md: 1 });

	const showSaveScore = () => {
		if (Auth.loggedIn()) {
			if (score <= userData.highScore) {
				return (
					<>
						<GridItem colSpan={2}>
							<Text>
								This score does not beat your high score!
							</Text>
						</GridItem>
						<GridItem colSpan={2}>
							<Button variant="primary" w="full">
								<Link href="/">Try Again</Link>
							</Button>
						</GridItem>
					</>
				);
			} else {
				return (
					<>
						<GridItem colSpan={2}>
							<Button
								variant={"secondary"}
								w="full"
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
											variables: {
												userScore: scoreToSave
											}
										});

										navigate("/profile");
									} catch (err) {
										console.error(err);
									}
								}}
							>
								Save High Score!
							</Button>
						</GridItem>
					</>
				);
			}
		} else {
			return (
				<>
					<GridItem colSpan={2}>
						<Text color={"white"}>
							You must have an account to save your score!
						</Text>
					</GridItem>
					<GridItem colSpan={colSpan}>
						<Button variant="primary" w="full">
							<Link href="/login">Login</Link>
						</Button>
					</GridItem>
					<GridItem colSpan={colSpan}>
						<Button variant="primary" w="full">
							<Link href="/signup">Signup</Link>
						</Button>
					</GridItem>
				</>
			);
		}
	};

	if (loading) {
		return <div>LOADING...</div>;
	}

	return (
		<div className="gameover-bg">
			<Container
				maxW="container.xl"
				h="100vh"
				p={0}
				fontSize={"35px"}
				color="white"
			>
				<Flex h="auto" py={[0, 10, 20]}>
					<VStack w="full" h="full" p={10} spacing={10}>
						<SimpleGrid columns={2} columnGap={3} rowGap={3}>
							<GridItem colSpan={2}>
								<Center>
									<Heading
										color="primary.red"
										fontSize={"50px"}
										textShadow={
											"-3px 0 black, 0 1px black, 1px 0 black, 0 -1px black;"
										}
									>
										Game Over
									</Heading>
								</Center>
							</GridItem>
							<GridItem colSpan={2}>
								<Text color="white">{`Final Score: ${state.score}`}</Text>
							</GridItem>
							{showSaveScore()}
						</SimpleGrid>
					</VStack>
				</Flex>
			</Container>
		</div>
	);
}

export default GameOver;
