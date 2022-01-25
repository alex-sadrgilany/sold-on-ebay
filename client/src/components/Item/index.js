import React from "react";

function Item() {
	var headers = new Headers();
	headers.append("Content-Type", "application/x-www-form-urlencoded");
	headers.append("x-api-key", `${process.env.REACT_APP_API_KEY}`);
	headers.append(
		"Authorization",
		"Bearer 12345678.jKBPLnOiYt7vpWlsny_lDKqINn4Ny_jwH89hA4IZgggyzqmV_bmQHGJ3HOHH2DmZxOJn5V1qQFnVP9bCn9jnrggCRz"
	);

	var urlencoded = new URLSearchParams();
	urlencoded.append("quantity", "5");
	urlencoded.append("title", "Vintage Duncan Toys Butterfly Yo-Yo, Red");
	urlencoded.append(
		"description",
		"Vintage Duncan Yo-Yo from 1976 with string, steel axle, and plastic body."
	);
	urlencoded.append("price", "1000");
	urlencoded.append("who_made", "someone_else");
	urlencoded.append("when_made", "1970s");
	urlencoded.append("taxonomy_id", "1");
	urlencoded.append("image_ids", "378848,238298,030076");

	var requestOptions = {
		method: "POST",
		headers: headers,
		body: urlencoded,
		redirect: "follow"
	};

	fetch(
		"https://api.etsy.com/v3/application/shops/12345678/listings",
		requestOptions
	)
		.then((response) => response.text())
		.then((result) => console.log(result))
		.catch((error) => console.log("error", error));
	return <div>Item!</div>;
}

export default Item;
