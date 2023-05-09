const { decodeToken, generateToken } = require("../config/jwtToken");
const UserModel = require("../models/user.model");

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
    console.log("authorize", authorization);
    const accessToken = authorization.split(" ")[1];
    const accessTokenSecret = process.env.JWT_Secret;
    const decoded = await decodeToken(accessToken, accessTokenSecret);
    delete decoded.isActive;
    delete decoded.refreshToken;
    delete decoded.password;
    delete decoded.exp;
    delete decoded.iat;

    return res.status(200).json({ success: true, user: decoded });
  },
};
module.exports = authController;
