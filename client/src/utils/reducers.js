import { REMOVE_ITEM, ADD_ITEMS } from "./actions";

const initialState = {
    items: []
};

export const reducers = (state = initialState, action) => {
    switch (action.type) {
        case REMOVE_ITEM:
            let newState = state.items.filter((item) => {
                return item._id !== action._id;
            });

            return {
                ...state,
                items: newState
            };
        case ADD_ITEMS:
            return {
                ...state,
                items: [...action.items]
            };
        default:
            return state;
    }
};

export default reducers;