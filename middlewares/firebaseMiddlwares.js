// const { getAuth } = require("firebase-admin/auth");
const { decodeTokenWithExp } = require("../config/jwtToken");

const authJWT = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) return res.status(400).send("Access Denied");
  const accessToken = authorization.split(" ")[1];
  const decode = decodeTokenWithExp(accessToken);
  if (!decode)
    return res.status(401).json({ success: false, msg: "Invalid Token" });
  req.user = decode;
  next();
};
module.exports = authJWT;
