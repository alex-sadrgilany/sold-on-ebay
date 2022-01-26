import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { QUERY_ME } from "../utils/queries";
import { DELETE_ITEM } from "../utils/mutations";


function Profile() {
    
    const { loading, data } = useQuery(QUERY_ME);
    const [deleteItem, { error }] = useMutation(DELETE_ITEM);
    const userData = data?.me || {};

    // function to handle deleting item from User
    const handleDeleteItem = async (itemId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const { data } = await deleteItem({
                variables: { itemId }
            });

            // remove itemId from localstorage
        }
        catch (err) {
            console.error(err);
        };
    };

    if (loading) {
        return <div>LOADING...</div>;
    };

    return (
        <div>
            <h1>
                {userData.username}'s Profile
            </h1>
        </div>
    )
};

export default Profile;