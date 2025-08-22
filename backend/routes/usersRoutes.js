const express = require("express");
const router = express.Router();
const { getUsers, getUser } = require("../controllers/userController");
const authenticateToken = require("../middleware/authToken");

router.get("/", authenticateToken, getUsers);
router.get("/:id", authenticateToken, getUser);

module.exports = router;
