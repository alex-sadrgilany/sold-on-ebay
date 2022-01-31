import {
	FETCH_DATA_START,
	FETCH_DATA_FAILURE,
	FETCH_DATA_SUCCESS,
	CORRECT_GUESS,
	ADD_TO_CART,
	EMPTY_CART,
} from "./actions";

import { useReducer } from "react";

export const reducer = (state, action) => {
	switch (action.type) {
		case FETCH_DATA_START:
			return {
				...state,
				isFetching: true
			};
		case FETCH_DATA_FAILURE:
			const error = action.payload;
			alert(
				`There was an error fetching the data: ${error.message}. Please try again.`
			);
			return {
				...state,
				isFetching: false
			};
		case FETCH_DATA_SUCCESS:
			return {
				...state,
				isFetching: false,
				items: action.payload
			};
		case CORRECT_GUESS:
			return {
				...state,
				score: state.score + 1,
				currentItemIndex: state.currentItemIndex + 1
			};
		case ADD_TO_CART:
			return {
				...state,
				cart: action.payload
			}
		case EMPTY_CART:
			return {
				...state,
				cart: 0
			}
		default:
			return state;
	}
};

export function useItemReducer(initialState) {
	return useReducer(reducer, initialState);
}
