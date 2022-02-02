import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ADD_ORDER } from "../utils/mutations";
import { useStoreContext } from "../utils/GlobalState";

function Success() {
	const [addOrder] = useMutation(ADD_ORDER);
    
	const donatedAmount = localStorage.getItem("donation");

	useEffect(() => {
		
		async function saveOrder() {
			addOrder({
				variables: { amount: parseInt(donatedAmount) }
			});	
		}
		
		setTimeout(() => {
			window.location.assign("/");
			localStorage.removeItem("donation");
		}, 3000);

		saveOrder();
	}, [addOrder]);

	
	return (
		<div>
				<h1>Success!</h1>
				<h2>Thank you so much for the donation!</h2>
				<h2>You will now be directed to the homepage</h2>
		</div>
	);
}

export default Success;
