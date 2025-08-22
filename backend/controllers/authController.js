const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { hashPassword, comparePassword } = require("../utils/passwordUtils");
const {
  generateToken,
  generateRefreshToken,
  verifyToken,
} = require("../utils/tokenUtils");

const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.json(errors);

  try {
    const { firstName, lastName, email, username, password, avatar } = req.body;

    const hash = await hashPassword(password);

    const newUser = new User({
      firstName,
      lastName,
      email,
      username,
      avatar,
      password: hash,
    });

    await newUser.save();

    await res.status(201).json(newUser);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ msg: err.message || "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  const { username, email, password } = req.body;

  var user = await User.findOne({ $or: [{ username }, { email }] });
  if (!user) return res.status(400).json({ msg: "User not found" });

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch)
    return res.status(400).json({ msg: "Wrong username or password" });

  const accessToken = generateToken(user);
  const refreshToken = generateRefreshToken(user);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true, // HTTPSd
    sameSite: "Strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  res.json({ accessToken: accessToken, refreshToken: refreshToken });
};

const refreshUserToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).json({ msg: "Session expired" });

  try {
    const verifiedUser = verifyToken(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const accessToken = generateToken({ username: verifiedUser.username });

    res.json({ accessToken: accessToken });
  } catch (err) {
    if(err.name === "TokenExpiredError")  return res.status(401).json({ msg: "Unauthorized. Please login again." });
    if(err.name === "JsonWebTokenError")  return res.status(403).json({ msg: "Invalid. Please login again." });
    res
      .status(err.status || 500)
      .json({ msg: err.message || "Internal server error" });
  }
};

module.exports = { registerUser, loginUser, refreshUserToken };
