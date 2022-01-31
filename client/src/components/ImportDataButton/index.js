import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useStoreContext } from "../../utils/GlobalState";
import {
	FETCH_DATA_START,
	FETCH_DATA_SUCCESS,
	FETCH_DATA_FAILURE
} from "../../utils/actions";

import { ebayApiCall } from "../../utils/API";

import { Button, Spinner } from "@chakra-ui/core";

function ImportDataButton() {
	const navigate = useNavigate();
	const [state, dispatch] = useStoreContext();
	const [searchInput, setSearchInput] = useState("");

	const shuffle = (array) => {
		let m = array.length,
			t,
			i;

		// While there remain elements to shuffle…
		while (m) {
			// Pick a remaining element…
			i = Math.floor(Math.random() * m--);

			// And swap it with the current element.
			t = array[m];
			array[m] = array[i];
			array[i] = t;
		}

		return array;
	};

	const loadData = async (event) => {
		event.preventDefault();

		if (!searchInput) {
			return false;
		}

		try {
			dispatch({
				type: FETCH_DATA_START
			});
			console.log("trying to fetch");
			const response = await ebayApiCall(searchInput);

			if (!response.data.request_info.success) {
				throw new Error("oops");
			}

			const { search_results } = response.data;

			const items = search_results.map((result) => ({
				itemId: result.epid,
				title: result.title,
				image: result.image,
				link: result.link,
				price:
					result.price.value +
					(result.shipping_cost ? result.shipping_cost : 0)
			}));

			dispatch({
				type: FETCH_DATA_SUCCESS,
				payload: shuffle(items)
			});

			setSearchInput("");
			navigate("/play");
			// ebayApiCall(searchInput)
			// 	.then((response) => {
			// 		const relevantData = response.data.search_results;
			// 		console.log(relevantData);
			// 		data.push(relevantData);

			// 		const items = data.map((result) => ({
			// 			itemId: result.epid,
			// 			title: result.title,
			// 			image: result.image,
			// 			link: result.link,
			// 			price:
			// 				result.price.value +
			// 				(result.shipping_cost ? result.shipping_cost : 0)
			// 		}));

			// 		dispatch({
			// 			type: FETCH_DATA_SUCCESS,
			// 			payload: shuffle(items)
			// 		});

			// 		navigate("/play");
			// 	})
			// 	.catch((error) => {
			// 		dispatch({
			// 			type: FETCH_DATA_FAILURE,
			// 			payload: error
			// 		});
			// 	});
		} catch (err) {
			dispatch({
				type: FETCH_DATA_FAILURE,
				payload: error
			});
		}
	};

	const clickToStart = () => (
		<form onSubmit={loadData}>
			<input
				type="text"
				name="searchInput"
				value={searchInput}
				onChange={(e) => setSearchInput(e.target.value)}
				placeholder="Pick your category"
			/>
			<Button type="submit">Submit!</Button>
		</form>
	);

	const dataLoading = () => <Spinner>Loading Data...Please Wait</Spinner>;

	return <>{state.isFetching ? dataLoading() : clickToStart()}</>;
}

export default ImportDataButton;
