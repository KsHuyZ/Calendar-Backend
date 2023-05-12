const { decodeToken, generateToken } = require("../config/jwtToken");
const UserModel = require("../models/user.model");
const { getUserbyId } = require("../services/user.service");
const generatePassword = require("../utils/generatePassword");
const { sendMail } = require("../utils/sendMail");
const bcrypt = require("bcrypt");

const authController = {
  refreshToken: async (req, res) => {
    const authorization = req.headers.authorization;
    console.log(authorization);
    if (!authorization)
      return res.status(400).json({ success: false, msg: "pls_provide_token" });
    const accessToken = authorization.split(" ")[1];
    if (!accessToken)
      return res
        .status(400)
        .json({ success: false, msg: "not_found_accessToken" });

    const refreshToken = req.body.refreshToken;
    if (!refreshToken)
      return res
        .status(400)
        .json({ success: false, msg: "not_found_refreshToken" });
    const accessTokenSecret = process.env.JWT_Secret;
    const decoded = await decodeToken(accessToken, accessTokenSecret);
    if (!decoded) {
      return res.status(400).send("invalid_accessToken");
    }
    const email = decoded.payload.email;
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(400).send("user_not_exist");
    if (refreshToken !== user.refreshToken) {
      return res.status(400).send("invalid_refresh_token");
    }
    const newAccessToken = generateToken(user);
    if (!newAccessToken) {
      return res.status(400).send("create_accessToken_failed");
    }
    return res.status(200).json({ success: true, accessToken: newAccessToken });
  },
  userAuth: async (req, res) => {
    const authorization = req.headers.authorization;
    if (!authorization)
      return res.status(400).json({ success: false, msg: "pls_provide_token" });
    const accessToken = authorization.split(" ")[1];
    const accessTokenSecret = process.env.JWT_Secret;
    const decoded = decodeToken(accessToken, accessTokenSecret);
    if (decoded.isActive) {
      delete decoded.isActive;
    }
    delete decoded.refreshToken;
    delete decoded.password;
    delete decoded.exp;
    delete decoded.iat;

    return res.status(200).json({ success: true, user: decoded });
  },
  changePassword: async (req, res) => {
    const { id, password, newPassword } = req.body;
    const user = await getUserbyId(id);
    if (!user)
      return res.status(400).json({ success: false, msg: "user_not_exits" });
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    if (!user.password) {
      user.password = hashedPassword;
      await user.save();
      return res
        .status(200)
        .json({ success: true, msg: "update_password_success" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ success: false, msg: "wrong_password" });
    user.password = hashedPassword;
    await user.save();
    return res
      .status(200)
      .json({ success: true, msg: "update_password_success" });
  },
  forgotPassWord: async (req,res) => {
    const { id } = req.params;
    const user = await getUserbyId(id);
    const newPassword = generatePassword();
    const hashPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashPassword;
    const htmlForm = `<div>
    <h1>We received your change password request!</h1>
	<p>Your new password</p>
  <p>${newPassword}</p>
    </div>`;
    sendMail(user.email, "Change Password Request", htmlForm);
    await user.save();
    return res.status(200).json({ success: true });
  },
};
module.exports = authController;
