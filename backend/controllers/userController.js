const User = require("../models/userModel");
const Pet = require("../models/petmodel");
const { validationResult } = require("express-validator");
const validateObjectId = require("../validations/objectIdValidation");
const { hashPassword } = require("../utils/passwordUtils");

// ----------------------
// Existing endpoints
// ----------------------
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users)
      return res.status(404).json({ msg: "There are no available users" });
    res.status(200).json(users);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ msg: err.message || "Internal server error" });
  }
};

const getUser = async (req, res) => {
  try {
    const validatedId = validateObjectId(req.params.id);
    if (!validatedId) return res.status(404).json({ msg: "Bad request" });

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    return res
      .status(err.status || 500)
      .json({ msg: err.message || "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.json(errors);
    
    const validatedId = validateObjectId(req.params.id);
    if (!validatedId) return res.status(404).json({ msg: "Bad request" });

    const patchedUser = { ...req.body };

    // Only hash password if provided
    if (patchedUser.password && patchedUser.password.trim() !== "") {
      patchedUser.password = await hashPassword(patchedUser.password);
    } else {
      delete patchedUser.password; // prevent overwriting with empty
    }

    const user = await User.findByIdAndUpdate(req.params.id, patchedUser, {
      new: true,
    });
    if (!user) return res.status(404).json({ msg: "User doesn't exist" });

    res.json(patchedUser);
  } catch (err) {
    return res
      .status(err.status || 500)
      .json({ msg: err.message || "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const validatedId = validateObjectId(req.params.id);
    if (!validatedId) return res.status(404).json({ msg: "Bad request" });

    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) return res.status(404).json({ msg: "User doesn't exist" });

    res.json({ msg: "User deleted successfully" });
  } catch (err) {
    return res
      .status(err.status || 500)
      .json({ msg: err.message || "Internal server error" });
  }
};

// ----------------------
// 🔹 Favorites endpoints
// ----------------------

// Επιλογή πεδίων pet για μικρό payload
const FAVORITE_PET_FIELDS =
  "name species breed age gender adopted image_url description health_status createdAt updatedAt";

const getMyFavorites = async (req, res) => {
  try {
    const me = await User.findById(req.user.id).populate({
      path: "favorites",
      select: FAVORITE_PET_FIELDS,
    });
    if (!me) return res.status(404).json({ msg: "User not found" });

    res.status(200).json(me.favorites || []);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ msg: err.message || "Internal server error" });
  }
};

const addFavorite = async (req, res) => {
  try {
    const { petId } = req.params;

    if (!validateObjectId(petId))
      return res.status(400).json({ msg: "Invalid pet id" });

    const pet = await Pet.findById(petId);
    if (!pet) return res.status(404).json({ msg: "Pet not found" });

    if (pet.adopted)
      return res.status(400).json({ msg: "Cannot favorite an adopted pet" });

    // $addToSet to avoid duplicates
    await User.findByIdAndUpdate(
      req.user.id,
      { $addToSet: { favorites: petId } },
      { new: true }
    );

    // returns updated list (populated)
    const me = await User.findById(req.user.id).populate({
      path: "favorites",
      select: FAVORITE_PET_FIELDS,
    });

    res.status(200).json(me.favorites || []);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ msg: err.message || "Internal server error" });
  }
};

const removeFavorite = async (req, res) => {
  try {
    const { petId } = req.params;

    if (!validateObjectId(petId))
      return res.status(400).json({ msg: "Invalid pet id" });

    await User.findByIdAndUpdate(
      req.user.id,
      { $pull: { favorites: petId } },
      { new: true }
    );

    const me = await User.findById(req.user.id).populate({
      path: "favorites",
      select: FAVORITE_PET_FIELDS,
    });

    res.status(200).json(me.favorites || []);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ msg: err.message || "Internal server error" });
  }
};

module.exports = {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  // favorites
  getMyFavorites,
  addFavorite,
  removeFavorite,
};
