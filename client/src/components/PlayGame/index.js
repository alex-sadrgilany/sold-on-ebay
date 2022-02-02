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
	Box
} from "@chakra-ui/react";

import anime from "animejs";

function PlayGame() {
	const navigate = useNavigate();
	const [state, dispatch] = useStoreContext();

	const { items, currentItemIndex } = state;

	const leftObj = items[currentItemIndex];
	const rightObj = items[currentItemIndex + 1];

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

	useEffect(redirectHome, []);
	useEffect(noMoreItems, [currentItemIndex]);

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

	const flashGreen = () => {
		const container = document.querySelector(".chakra-container");
		container.classList.add("green-background");

		setTimeout(() => {
			container.classList.remove("green-background");
		}, 1300);
	};

	const flashRed = () => {
		const container = document.querySelector(".chakra-container");
		container.classList.add("red-background");

		setTimeout(() => {
			container.classList.remove("red-background");
		}, 1300);
	};

	const checkAnswer = (guess) => {
		if (guess === "higher") {
			if (rightPrice > leftPrice) {
				flashGreen();
				runAnime();

				setTimeout(() => {
					dispatch({
						type: CORRECT_GUESS
					});
				}, 2000);
			} else {
				flashRed();
				runAnime();

				setTimeout(() => {
					gameOver();
				}, 2600);
			}
		} else {
			if (rightPrice < leftPrice) {
				flashGreen();
				runAnime();

				setTimeout(() => {
					dispatch({
						type: CORRECT_GUESS
					});
				}, 2000);
			} else {
				flashRed();
				runAnime();

				setTimeout(() => {
					gameOver();
				}, 2600);
			}
		}
	};

	console.log("right", rightPrice);
	return (
		<SimpleGrid columns={2} spacing={5}>
			<GridItem colSpan={1}>
				<Box bg="white">
					<LeftItem
						itemId={leftItemId}
						image={leftImage}
						title={leftTitle}
						price={leftPrice}
						link={leftLink}
					/>
				</Box>
			</GridItem>
			<GridItem colSpan={1}>
				<Box bg="white" colSpan={1}>
					<RightItem
						itemId={rightItemId}
						image={rightImage}
						title={rightTitle}
						price={rightPrice}
						link={rightLink}
						checkAnswer={checkAnswer}
					/>
				</Box>
			</GridItem>

			<Score />
		</SimpleGrid>
	);
}

export default PlayGame;
