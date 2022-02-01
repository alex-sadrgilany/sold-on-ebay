import { gql } from "@apollo/client";

export const QUERY_ME = gql`
    {
        me {
            _id
            username
            email
            highScore
            savedItems {
                itemId
                title
                price
                image
                link
            }
            orders {
                _id
                donationAmount
                donationDate
            }
        }
    }
`;

export const QUERY_CHECKOUT = gql`
    query getCheckout($amount: Int!) {
        checkout(amount: $amount) {
            session
        }
    }
`;