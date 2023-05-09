const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  photoURL: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    // required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  refreshToken: {
    type: String,
  },
});
const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
