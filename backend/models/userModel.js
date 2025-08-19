const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    avatar: {
      type: String,
    },
    // pets: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Pet",
    //   },
    // ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
