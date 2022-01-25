const router = require("express").Router();
const { ebayRoute } = require("../../controllers/ebay-controller");

router.route("/accountDeletion")
    .get(ebayRoute);

module.exports = router;