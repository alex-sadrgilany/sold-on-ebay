import React, { createContext, useContext } from "react";
import { useItemReducer } from "./reducers";

const StoreContext = createContext();
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props}) => {
    const [ state, dispatch ] = useItemReducer(
        {
            items: [],
            score: 0,
            currentItemIndex: 0,
            isFetching: false,
            cart: 0
        }
    );
    return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
    return useContext(StoreContext);
};

export {
    StoreProvider,
    useStoreContext
};