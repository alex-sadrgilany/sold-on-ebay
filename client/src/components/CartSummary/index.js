import React, { useState, useEffect } from "react";
import { useStoreContext } from "../../utils/GlobalState";

import {
	Button,
	Flex,
	Heading,
	Link,
	Stack,
	Text,
	useColorModeValue as mode
} from "@chakra-ui/react";

import { FaArrowRight } from "react-icons/fa";

function CartSummary() {
    const [state, dispatch] = useStoreContext();
    const [donationAmount, setDonationAmount] = useState(0);

	const OrderSummaryItem = (props) => {
		const { label, value, children } = props;
		return (
			<Flex justify="space-between" fontSize="sm">
				<Text fontWeight="medium" color={mode("gray.600", "gray.400")}>
					{label}
				</Text>
				{value ? <Text fontWeight="medium">{value}</Text> : children}
			</Flex>
		);
	};
	return (
		<Stack
			spacing="8"
			borderWidth="1px"
			rounded="lg"
			padding="8"
			width="full"
		>
			<Heading size="md">Donation Summary</Heading>

			<Stack spacing="6">
				<OrderSummaryItem label="Subtotal" value="" />
				<Flex justify="space-between">
					<Text fontSize="lg" fontWeight="semibold">
						Total
					</Text>
					<Text fontSize="xl" fontWeight="extrabold">
						254
					</Text>
				</Flex>
			</Stack>
			<Button
				colorScheme="blue"
				size="lg"
				fontSize="md"
				rightIcon={<FaArrowRight />}
			>
				Checkout
			</Button>
		</Stack>
	);
}

export default CartSummary;
