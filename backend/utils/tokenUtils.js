const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (user) => {
  const userId = user._id || user.id; // <<<------ pros8esa auto gia na diavazei kai ta duo
  return jwt.sign(
    { id: userId, username: user.username },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.TOKEN_EXPIRATION }
  );
};

const generateRefreshToken = (user) => {
  const userId = user._id || user.id; // <<<------- kai to pros8esa ki edw! ola ta alla einai opws ta eixes.
  return jwt.sign(
    { id: userId, username: user.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION }
  );
};

const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};

module.exports = { generateToken, generateRefreshToken, verifyToken };
