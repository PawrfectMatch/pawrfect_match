const express = require("express");
const router = express.Router();

const validateUser = require("../validations/userValidations");
const { registerUser, loginUser, refreshUserToken } = require("../controllers/authController");

router.post("/register", validateUser, registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshUserToken)

module.exports = router;
