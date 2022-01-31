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
        }
    }
`;