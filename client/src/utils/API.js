import axios from "axios";

export const ebayApiCall = (query) => {
    const options = {
        method: "GET",
        url: `/api/product?search_term=${query}`
    };

    return axios.request(options);
};