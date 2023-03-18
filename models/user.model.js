const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  uid: {
    type: String,
  },
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
});
const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
