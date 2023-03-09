const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  const jwtSecret = process.env.JWT_Secret;
  return jwt.sign({ id }, jwtSecret, { expiresIn: "3d" });
};
module.exports = { generateToken };
