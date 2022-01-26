import React, { useState } from "react";
import axios from "axios";

function Item() {

	const [userSearchTerm, setUserSearchTerm] = useState("cats");
	const options = {
		method: "GET",
		url: "http://localhost:3001/api/product",
		params: {
			search_term: userSearchTerm
		}
	};

	axios.request(options)
		.then(response => {
			console.log(response.data);
		})
		.catch(err => {
			console.error(err);
		})
	
	return <div>Item!
		<input type="text" name="search-term" value={userSearchTerm} onChange={(e) => setUserSearchTerm(e.target.value)}></input>
	</div>;
}

export default Item;
