import { gql } from "@apollo/client";

export const QUERY_ME = gql`
    {
        me {
            _id
            username
            email
            savedItems {
                itemId
                name
                price
                description
                image
                link
            }
        }
    }
`;