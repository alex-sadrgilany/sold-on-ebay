require("dotenv").config();
const axios = require("axios");

module.exports = {
	ebayData: function (req, res) {

		const searchTerm = req.query.search_term;

		const url = "https://api.countdownapi.com/request";
		const params = {
			api_key: process.env.API_KEY,
			type: "search",
			ebay_domain: "ebay.com",
			search_term: searchTerm,
			sold_items: "true",
			completed_items: "true",
			condition: "all",
			sort_by: "best_match"
		};
		axios
			.get(url, { params })
			.then(function(response) {
                if (!response.data.request_info.success) {
                    console.log("product not found :(")
                    return module.exports.ebayData();
                }
				console.log(response.data);
				res.json(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}
};
