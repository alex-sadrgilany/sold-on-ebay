import React, { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import Auth from "../../utils/auth";
import { useStoreContext } from "../../utils/GlobalState";
import { QUERY_CHECKOUT } from "../../utils/queries";

import { loadStripe } from "@stripe/stripe-js";
import { ADD_TO_CART } from "../../utils/actions";
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const Cart = () => {
	const [state, dispatch] = useStoreContext();
	const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
	const { cart } = state;
	
	useEffect(() => {
		if (data) {
			stripePromise.then((res) => {
				res.redirectToCheckout({ sessionId: data.checkout.session });
			});
		}
	}, [data]);

	function submitCheckout() {
		console.log(cart)
		getCheckout({
			variables: { amount: cart }
		});
	}

	return (
		<div>
			<h2>Donation Cart</h2>
			{cart > 0 ? (
				<div>
					<div>
						<p>Total Donation: ${cart}</p>
						{Auth.loggedIn() ? (
							<button onClick={submitCheckout}>Checkout</button>
						) : (
							<span>log in to checkout</span>
						)}
					</div>
				</div>
			) : (
				<h3>Your cart is empty!</h3>
			)}
		</div>
	);
};

export default Cart;
