const express = require("express");
const router = express.Router();

const apiController = require("../controllers/login_controllers");


router.post("/api/login",apiController.login)
router.post("/api/create",apiController.createUser)

// router.route("/").get(getAllDetails);

// router.route("/api/login").post(login);

module.exports = router;
