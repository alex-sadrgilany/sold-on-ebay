const router = require("express").Router();
const userRoutes = require("./user-routes");
const ebayRoutes = require("./ebay-routes");

router.use("/users", userRoutes);

module.exports = router;