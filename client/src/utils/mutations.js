import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const SAVE_ITEM = gql`
    mutation saveItem($itemData: itemInput!) {
        saveItem(itemData: $itemData) {
            _id
            username
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

export const DELETE_ITEM = gql`
    mutation deleteItem($itemId: ID!) {
        deleteItem(itemId: $itemId) {
            _id
            username
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