const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async function (req, res) {
  try {
    const { firstName, lastName, email, username, password, avatar } = req.body;
    const newUser = new User({
      firstName,
      lastName,
      email,
      username,
      avatar,
    });

    const hashedPassword = await bcrypt.hash(password, 12);
    newUser.password = hashedPassword;

    newUser.save();

    await res.status(201).json(newUser);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ msg: err.message || "❌ Internal server error" });
  }
};

module.exports = { registerUser };
