const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

  displayName: {
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
  schedules: {
    type: [mongoose.Schema.Types.ObjectId],
    ref:"Schedule"
  }
});
const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
