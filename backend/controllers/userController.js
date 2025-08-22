const User = require("../models/userModel");

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
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    //  return res
    //   .status(err.status || 500)
    //   .json({ msg: err.message || "Internal server error" });
    console.log(err);
    
  }
};

module.exports = { getUsers, getUser };
