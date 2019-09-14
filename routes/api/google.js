const router = require("express").Router();
const googleController = require("../../controllers/GoogleController");

router.route("/").get(googleController.findAll);


module.exports = router;