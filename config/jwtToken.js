const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_Secret;
const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, { expiresIn: "3d" });
};

function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        if (
          decoded.iss &&
          decoded.iss.startsWith("https://securetoken.google.com/")
        ) {
          // Đây là token của Firebase
          resolve({
            type: "firebase",
            uid: decoded.uid,
          });
        } else {
          // Đây là JWT
          resolve({
            type: "jwt",
            userId: decoded.userId,
          });
        }
      }
    });
  });
}

// Sử dụng hàm verifyToken để giải mã token
verifyToken(firebaseToken)
  .then((result) => {
    if (result.type === "firebase") {
      console.log("Đây là token của Firebase, UID = " + result.uid);
    } else {
      console.log("Đây là JWT, User ID = " + result.userId);
    }
  })
  .catch((err) => {
    console.error("Lỗi giải mã token: ", err);
  });
module.exports = { generateToken };
