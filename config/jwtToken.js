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

module.exports = { generateToken, decodeToken, decodeTokenWithExp };
