const express = require("express");
const router = express.Router();
const { getUsers, getUser, updateUser, deleteUser } = require("../controllers/userController");
const authenticateToken = require("../middleware/authToken");
const validateUser = require("../validations/userValidations");

router.get("/", authenticateToken, getUsers);
router.get("/:id", authenticateToken, getUser);
router.put("/:id", authenticateToken, validateUser, updateUser);
router.delete("/:id", authenticateToken, deleteUser);

module.exports = router;
