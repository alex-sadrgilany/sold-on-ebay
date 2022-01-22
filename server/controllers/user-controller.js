const { User } = require("../models");
const { signToken } = require("../utils/auth");

module.exports = {
    async getUser({ user = null, params }, res) {
        const foundUser = await User.findOne({
            $or: [
                {
                    _id: user ? user._id : params.id
                },
                {
                    username: params.username
                }
            ]
        });

        if (!foundUser) {
            return res.json(400).json({ message: "Cannot find a user with this id or username!" });
        }
        res.json(foundUser);
    },
    async ebayRoute({ query }, res) {
        const challengeCode = query;
        const verificationUrl;
        const verificationToken;

        let response = {};

        
    }
};