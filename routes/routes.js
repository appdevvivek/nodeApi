const express = require("express");
const router = express.Router();

const { getAllDetails, login } = require("../controllers/login_controllers");

router.route("/").get(getAllDetails);

router.route("/api/login").post(login);

module.exports = router;
