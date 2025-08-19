const User = require("../models/userModel");

const getUsers = async function (req, res) {
  try {
    const users = await User.find();
    if (!users)
      return res.status(404).send({ msg: "❌ There are no available users" });
    res.status(200).json(users);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ msg: err.message || "❌ Internal server error" });
  }
};

module.exports = { getUsers };
