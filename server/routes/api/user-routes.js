const router = require("express").Router();
const { getUser } = require("../../controllers/user-controller");

router.route("/:username")
    .get(getUser);

module.exports = router;