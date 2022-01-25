const crypto = require("crypto");

module.exports = {
	async ebayRoute({ query }, res) {
		const { challengeCode } = query;
		const endpoint = "https://localhost:3001/api/ebay/accountDeletion";
		const verificationToken = "shs87vUD3grtHkushs87vUD-grtHkushsdfhsh817vUD3grtHku";

		let response = crypto.createHash("sha256");
		response.update(challengeCode);
		response.update(verificationToken);
		response.update(endpoint);

		const responseHash = response.digest("hex");

		res.json({
			challengeResponse: responseHash
		});
	}
};
