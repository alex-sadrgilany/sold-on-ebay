import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useStoreContext } from "../../utils/GlobalState";
import { CORRECT_GUESS } from "../../utils/actions";

import Score from "../Score";
import LeftItem from "../LeftItem";
import RightItem from "../RightItem";

import {
	FormControl,
	FormLabel,
	Input,
	VStack,
	Heading,
	Text,
	SimpleGrid,
	GridItem,
	Select,
	Checkbox,
	Button,
	Link,
	Stack,
	Container,
	Flex,
	Divider,
	Center,
	Circle,
	Square,
	Box
} from "@chakra-ui/react";

import anime from "animejs";

function PlayGame() {
	const navigate = useNavigate();
	const [state, dispatch] = useStoreContext();

	const { items, currentItemIndex } = state;

	const leftObj = items[currentItemIndex];
	const rightObj = items[currentItemIndex + 1];

	const [wrongAns, setWrongAns] = useState(false);
	const [correctAns, setCorrectAns] = useState(false);

	const redirectHome = () => {
		if (!rightObj && !leftObj) {
			window.location.assign("/");
		}
	};

	const noMoreItems = () => {
		if (currentItemIndex === items.length) {
			alert("wow you answered every single one correctly!!");
			gameOver();
		}
	};

	useEffect(redirectHome, [leftObj, rightObj]);
	useEffect(noMoreItems, [currentItemIndex, items.length]);
	useEffect(() => {
		if (wrongAns) {
			const rightPriceEl = document.querySelector(".right-price-green");
			rightPriceEl.classList.remove("right-price-green");
			rightPriceEl.classList.add("right-price-red");
		}
	}, [wrongAns]);

	const {
		itemId: leftItemId,
		image: leftImage,
		title: leftTitle,
		price: leftPrice,
		link: leftLink
	} = leftObj || "";

	const {
		itemId: rightItemId,
		image: rightImage,
		title: rightTitle,
		price: rightPrice,
		link: rightLink
	} = rightObj || "";

	const gameOver = () => {
		navigate("/gameover");
	};
	const runAnime = () => {
		document.querySelectorAll(".number-animate").forEach((el) => {
			const endValue = el.getAttribute("data-end-value");
			const incrementValue = el.getAttribute("data-increment");
			const durationValue = el.getAttribute("data-duration");

			if (endValue)
				numberAnimation(el, endValue, incrementValue, durationValue);
		});

		function numberAnimation(el, endValue, incrementor, duration) {
			anime({
				targets: el,
				textContent: endValue,
				round: incrementor ? 1 / incrementor : 1 / 5,
				easing: "easeInOutQuad",
				duration: duration ? duration : 1500
			});
		}
	};

	const checkAnswer = (guess) => {
		if (guess === "higher") {
			if (rightPrice > leftPrice) {
				setCorrectAns(true);
				runAnime();

				setTimeout(() => {
					dispatch({
						type: CORRECT_GUESS
					});
					setCorrectAns(false);
				}, 2000);
			} else {
				setWrongAns(true);
				runAnime();

				setTimeout(() => {
					gameOver();
				}, 2001);
			}
		} else {
			if (rightPrice < leftPrice) {
				setCorrectAns(true);
				runAnime();

				setTimeout(() => {
					dispatch({
						type: CORRECT_GUESS
					});
					setCorrectAns(false);
				}, 2000);
			} else {
				setWrongAns(true);
				runAnime();

				setTimeout(() => {
					gameOver();
				}, 2001);
			}
		}
	};

	console.log("right", rightPrice);
	return (
		<Container maxW="container.xl" p={0}>
			<Center>
				<Score />
			</Center>

			<Flex
				h="auto"
				py={[0, 10, 20]}
				flexDirection={{ base: "column", md: "row" }}
			>
				<LeftItem
					itemId={leftItemId}
					image={leftImage}
					title={leftTitle}
					price={leftPrice}
					link={leftLink}
				/>

				<Circle
					size="100px"
					backgroundColor={
						wrongAns
							? "primary.red"
							: correctAns
							? "primary.green"
							: "primary.blue"
					}
					color="white"
					className="vs-overlay"
					display={{ base: "none", md: "flex" }}
				>
					VS.
				</Circle>

				<RightItem
					itemId={rightItemId}
					image={rightImage}
					title={rightTitle}
					price={rightPrice}
					link={rightLink}
					checkAnswer={checkAnswer}
				/>
			</Flex>
		</Container>
	);
}

export default PlayGame;
