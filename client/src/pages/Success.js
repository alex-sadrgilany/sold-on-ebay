import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ADD_ORDER } from "../utils/mutations";
import { useStoreContext } from "../utils/GlobalState";

function Success(amount) {
	const [addOrder] = useMutation(ADD_ORDER);
    const [state] = useStoreContext();
	const { cart } = state;

	useEffect(() => {
		
		async function saveOrder() {
			addOrder({
				variables: { amount: parseInt(cart)}
			});	
			console.log(cart);
		}

		saveOrder();
	}, [addOrder]);

	
	return (
		<div>
				<h1>Success!</h1>
				<h2>Thank you for your purchase!</h2>
				<h2>You will now be directed to the homepage</h2>
		</div>
	);
}

export default Success;
