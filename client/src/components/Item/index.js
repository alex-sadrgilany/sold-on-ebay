import React, { useState } from "react";
import axios from "axios";

function Item() {

	const [userSearchTerm, setUserSearchTerm] = useState("cats");
	let url = `/api/product?search_term=${userSearchTerm}`;

	const ebayFetch = function () {
		fetch(url)
		.then(response=> {
			console.log(response);
			return response.json();
		})
		.then(response => {
			console.log(response);
		})
		.catch(err => {
			console.error(err);
		});
	};
	// axios.request(options)
	// 	.then(response => {
	// 		console.log(response.data);
	// 	})
	// 	.catch(err => {
	// 		console.error(err);
	// 	})
	
	return <div>Item!
		<input type="text" name="search-term" value={userSearchTerm} onBlur={(e) => setUserSearchTerm(e.target.value)}>
			
		</input>
		<button type="submit" onClick={ebayFetch}>Run me</button>
	</div>;
}

export default Item;
