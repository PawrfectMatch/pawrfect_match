const express = require("express");
const router = express.Router();

const validateUser = require("../validations/userValidations");
const { registerUser } = require("../controllers/authController");

router.post("/register", validateUser, registerUser);

module.exports = router;
