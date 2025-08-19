const User = require("../models/userModel");

const getUsers = async function (req, res) {
  try {
    const users = await User.find();
    if (!users)
      return res.status(404).send({ msg: "There are no available users" });
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { getUsers };
