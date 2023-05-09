const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_Secret;

const generateToken = (user) => {
  const accessToken = jwt.sign(user.toJSON(), jwtSecret, { expiresIn: "3d" });
  const refreshToken = jwt.sign(user.toJSON(), jwtSecret);
  return { accessToken, refreshToken };
};

const decodeToken = (token, secretKey) => {
  try {
    return jwt.verify(token, secretKey, {
      ignoreExpiration: true,
    });
  } catch (error) {
    console.log(`Error in decode access token: ${error}`);
    return null;
  }
};

const decodeTokenWithExp = (token) => {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (error) {
    console.log(`Error in decode access token: ${error}`);
    return null;
  }
};
// Sử dụng hàm verifyToken để giải mã token
// verifyToken(firebaseToken)
//   .then((result) => {
//     if (result.type === "firebase") {
//       console.log("Đây là token của Firebase, UID = " + result.uid);
//     } else {
//       console.log("Đây là JWT, User ID = " + result.userId);
//     }
//   })
//   .catch((err) => {
//     console.error("Lỗi giải mã token: ", err);
//   });
module.exports = { generateToken, decodeToken, decodeTokenWithExp };
