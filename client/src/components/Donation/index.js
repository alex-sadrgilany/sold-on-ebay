import React, { useState, useEffect } from "react";
import {
	Box,
	Flex,
	Heading,
	HStack,
	Stack,
	Button,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
	Text,
	Container,
	VStack,
	SimpleGrid,
	GridItem,
	useBreakpointValue,
	Link
} from "@chakra-ui/react";
import Auth from "../../utils/auth";
import { useStoreContext } from "../../utils/GlobalState";
import { useLazyQuery } from "@apollo/client";
import { QUERY_CHECKOUT } from "../../utils/queries";
import { ADD_TO_CART, EMPTY_CART } from "../../utils/actions";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

function Donation() {
	const [state, dispatch] = useStoreContext();
	const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
	const [donation, setDonation] = useState(0);

	const format = (val) => "$" + val;
	const parse = (val) => val.replace(/^\$/, "");
	const checkoutEl = document.querySelector(".checkout-box");
	const donationEl = document.querySelector(".donate-box");
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
		checkoutTotal.innerHTML = "$" + donation;
	};

	const clearCart = () => {
		dispatch({
			type: EMPTY_CART
		});
		setDonation(0);
		checkoutTotal.innerHTML = "??";
		localStorage.removeItem("donation");
	};

	const checkout = () => {
		getCheckout({
			variables: { amount: parseInt(donation) }
		});
	};

	const colSpan = useBreakpointValue({ base: 2, md: 1})

	return (
		<Container maxW="container.xl" p={0}>
			<Flex
				h="auto"
				py={[0, 10, 20]}
				flexDirection={{ base: "column", md: "row" }}
			>
				<VStack
					w="full"
					h="full"
					p={10}
					spacing={10}
					alignItems="flex-start"
				>
					<Heading>Donate</Heading>
					<SimpleGrid columns={2} columnGap={3} rowGap={3} w="full">
						<GridItem colSpan={2}>
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
						</GridItem>
						<GridItem colSpan={colSpan}>
							<Button
								variant="primary"
								onClick={addToCart}
								w="full"
							>
								Add To Cart
							</Button>
						</GridItem>
						<GridItem colSpan={colSpan}>
							<Button
								variant="danger"
								onClick={clearCart}
								w="full"
							>
								Clear Cart
							</Button>
						</GridItem>
					</SimpleGrid>
				</VStack>
				<VStack
					w="full"
					h="full"
					p={10}
					spacing={10}
					alignItems="flex-start"
				>
					<Heading>Donation Summary</Heading>
					<SimpleGrid columns={1} columnGap={3} rowGap={3} w="full">
						<GridItem colSpan={1}>
							<Flex justify="space-between" h={10}>
								<Text fontSize="lg" fontWeight="semibold">
									Total
								</Text>
								<Text
									fontSize="xl"
									fontWeight="extrabold"
									className="checkout-number"
								>
									??
								</Text>
							</Flex>
						</GridItem>
						<GridItem colSpan={1}>
							{Auth.loggedIn() ? (
								<Button
								variant="secondary"
								onClick={checkout}
								w="full"
							>
								
								Checkout
							</Button>
							) : (
								<Button variant={"secondary"} w="full">
									<Link href="/login">Login to checkout</Link>
								</Button>
							)}
							
						</GridItem>
					</SimpleGrid>
				</VStack>
			</Flex>
		</Container>
	);
}

export default Donation;
