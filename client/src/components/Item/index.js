import React, { useState, useEffect } from "react";
import axios from "axios";

function Item() {

	const [userSearchTerm, setUserSearchTerm] = useState("cats");
	const [results, setResults] = useState(null);


	

	

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		try {
			const options = {
				method: "GET",
				url: `/api/product?search_term=${userSearchTerm}`
			};
	
			axios.request(options)
			.then(response => {
				console.log(response);
				setResults(response.data.search_results);
			})
			.catch(err => {
				console.error(err);
			})
		}
		catch(err) {
			console.error(err);
		}
	};

	console.log(results);
	
	return (
		<div>
			<h2>Let's Play</h2>
			<form>
				<div>
					<label>Search Term</label>
					<input
						placeholder="cats"
						name="search"
						type="text"
						id="search_input"
						onBlur={(e) => setUserSearchTerm(e.target.value)}
					/>
				</div>
				<div>
					<button type="submit" onClick={handleFormSubmit}>Submit</button>
				</div>
				
			</form>

			
		</div>
	)
}

export default Item;
