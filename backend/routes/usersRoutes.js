const express = require("express");
const router = express.Router();

const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getMyFavorites,
  addFavorite,
  removeFavorite,
} = require("../controllers/userController");

const authenticateToken = require("../middleware/authToken");
const {validateUpdateUser} = require("../validations/userValidations");

// --------- Favorites (per logged-in user) ---------
router.get("/me/favorites", authenticateToken, getMyFavorites);
router.post("/me/favorites/:petId", authenticateToken, addFavorite);
router.delete("/me/favorites/:petId", authenticateToken, removeFavorite);

// --------- Users ---------
router.get("/", authenticateToken, getUsers);
router.get("/:id", authenticateToken, getUser);
router.patch("/:id", authenticateToken, validateUpdateUser, updateUser);
router.delete("/:id", authenticateToken, deleteUser);



module.exports = router;
