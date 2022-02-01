import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useStoreContext } from "../../utils/GlobalState";
import { CORRECT_GUESS } from "../../utils/actions";

import Score from "../Score";
import LeftItem from "../LeftItem";
import RightItem from "../RightItem";

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
	}

	useEffect(redirectHome, []);
	useEffect(noMoreItems, [currentItemIndex]);

	console.log("left item", leftObj);
	console.log("right item", rightObj);

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

	console.log(leftItemId);

	const gameOver = () => {
		navigate("/gameover");
	};

	const checkAnswer = (guess) => {
		if (guess === "higher") {
			if (rightPrice > leftPrice) {
				alert("correct!");
				dispatch({
					type: CORRECT_GUESS
				});
			} else {
				gameOver();
			}
		} else {
			if (rightPrice < leftPrice) {
				alert("correct!");
				dispatch({
					type: CORRECT_GUESS
				});
			} else {
				gameOver();
			}
		}
	};

	return (
		<div>
			<Score />
			<LeftItem
				itemId={leftItemId}
				image={leftImage}
				title={leftTitle}
				price={leftPrice}
				link={leftLink}
			/>
			<RightItem
				itemId={rightItemId}
				image={rightImage}
				title={rightTitle}
				price={rightPrice}
				link={rightLink}
				checkAnswer={checkAnswer}
			/>
		</div>
	);
};

export default PlayGame;
