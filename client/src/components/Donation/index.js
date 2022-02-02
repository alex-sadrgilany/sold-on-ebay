
import React, { useState, useEffect } from "react";
import {loadStripe} from '@stripe/stripe-js';
import {
	Box,
	Flex,
	Heading,
	HStack,
	Link,
	Stack,
	Button,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
	Text
} from "@chakra-ui/react";
import { useStoreContext } from "../../utils/GlobalState";
import { useLazyQuery } from "@apollo/client";
import { QUERY_CHECKOUT } from "../../utils/queries";
import { ADD_TO_CART, EMPTY_CART } from "../../utils/actions";
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");


function Donation() {
	const [state, dispatch] = useStoreContext();
	const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
	const [donation, setDonation] = useState(0);
	const [opacity, setOpacity] = useState("1");

	const format = (val) => "$" + val;
	const parse = (val) => val.replace(/^\$/, "");
	const checkoutEl = document.querySelector(".half-opacity");
	const donationEl = document.querySelector(".full-opacity");
	const checkoutTotal = document.querySelector(".checkout-number");

	useEffect(() => {
		if (data) {
			stripePromise.then((res) => {
				res.redirectToCheckout({ sessionId: data.checkout.session });
			});
		}
	}, [data]);

	const addToCart = () => {
		dispatch({
			type: ADD_TO_CART,
			payload: donation
		});

		localStorage.setItem("donation", donation);

		checkoutEl.classList.remove("half-opacity");
		checkoutEl.classList.add("full-opacity");

		donationEl.classList.remove("full-opacity");
		donationEl.classList.add("half-opacity");

		checkoutTotal.innerHTML = "$" + donation;
	};

	const clearCart = () => {
		dispatch({
			type: EMPTY_CART
		});

		localStorage.removeItem("donation");
	};

	const checkout = () => {
		getCheckout({
			variables: { amount: parseInt(donation) }
		});
	};

	return (
		<Box
			maxW={{ base: "3xl", lg: "12xl" }}
			mx="auto"
			px={{ base: "4", md: "8", lg: "9" }}
			py={{ base: "6", md: "8", lg: "9" }}
			bgColor={"primary.yellow"}
		>
			<Stack
				direction={{ base: "column", lg: "row" }}
				align={{ lg: "flex-start" }}
				spacing={{ base: "8", md: "16" }}
			>
				<Flex direction="column" align="center" flex="1">
					<Stack
						spacing="4"
						borderWidth="1px"
						rounded="lg"
						padding="8"
						width="full"
						className="full-opacity"
					>
						<Heading size="md">Donate</Heading>

						<Stack spacing="6">
							<NumberInput
								defaultValue={0}
								min={0}
								max={30}
								clampValueOnBlur={false}
								value={format(donation)}
								onChange={(val) => setDonation(parse(val))}
								allowMouseWheel
							>
								<NumberInputField />
								<NumberInputStepper>
									<NumberIncrementStepper
										bg="green.200"
										_active={{ bg: "green.300" }}
										children="+"
									/>
									<NumberDecrementStepper
										bg="pink.200"
										_active={{ bg: "pink.300" }}
										children="-"
									/>
								</NumberInputStepper>
							</NumberInput>
						</Stack>
						<HStack>
							<Button variant="primary" onClick={addToCart}>
								Add To Cart
							</Button>
							<Button variant="danger" onClick={clearCart}>
								Clear Cart
							</Button>
						</HStack>
					</Stack>
				</Flex>

				<Flex direction="column" align="center" flex="1">
					<Stack
						spacing="8"
						borderWidth="1px"
						rounded="lg"
						padding="8"
						width="full"
						className="half-opacity"
					>
						<Heading size="md">Donation Summary</Heading>

						<Flex justify="space-between">
							<Text fontSize="lg" fontWeight="semibold">
								Total
							</Text>
							<Text fontSize="xl" fontWeight="extrabold" className="checkout-number">
								??
							</Text>
						</Flex>
						<Button variant="secondary" onClick={checkout}>
							Checkout
						</Button>
					</Stack>
				</Flex>
			</Stack>
		</Box>
	);
}

export default Donation;
