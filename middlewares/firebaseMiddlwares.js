const { getAuth } = require("firebase-admin/auth");

const auth = getAuth();

const authJWTFirebase = async (req, res, next) => {
  const authorization = req.headers.authorization;
  const accessToken = authorization.split(" ")[1];
  auth.verifyIdToken(accessToken).then((decodedToken) => {
    next();
  });
};
module.exports = authJWTFirebase;
