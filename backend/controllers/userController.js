const User = require("../models/userModel");
const { validationResult } = require("express-validator");
const validateObjectId = require("../validations/objectIdValidation");

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

    const patchedUser = req.body;

    const validatedId = validateObjectId(req.params.id);
    if (!validatedId) return res.status(404).json({ msg: "Bad request" });

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

module.exports = { getUsers, getUser, updateUser, deleteUser };
