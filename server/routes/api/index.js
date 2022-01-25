const router = require("express").Router();
const ebayRoutes = require("./ebay-routes");

router.use("/ebay", ebayRoutes);

module.exports = router;