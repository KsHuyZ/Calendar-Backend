const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");

const userService = {
  getUserbyUid: async (uid) => {
    const user = await UserModel.findOne({ uid });
    return user;
  },
  activeUserService: async (id) => {
    const user = await UserModel.findByIdAndUpdate(id, {
      isActive: true,
    });
    return user;
  },
  createUser: async (userName, email, password, photoURL, phoneNumber) => {
    const isExist = await UserModel.findOne({ email });
    if (isExist) return "user_exist";
    const user = UserModel({
      userName,
      email,
      password,
      photoURL,
      phoneNumber,
    });
    await user.save();
    return user;
  },
  loginService: async (email, password) => {
    const existEmail = await UserModel.findOne({ email });
    if (!existEmail) return "user_not_exist";
    const isMatch = await bcrypt.compare(password, existEmail.password);
    if (!isMatch) return "wrong_password";
    if (!existEmail.isActive) return "Pls_active_acc";
    return existEmail;
  },
  getUserbyId: async (id) => {
    const user = await UserModel.findById(id);
    return user;
  },
};

module.exports = userService;
