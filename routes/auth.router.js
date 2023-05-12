const router = require("express").Router();
const {
  refreshToken,
  userAuth,
  changePassword,
  forgotPassWord,
} = require("../controllers/auth.controller");

router.post("/refresh-token", refreshToken);
router.get("/authorize", userAuth);
router.post("/change-password", changePassword);
router.get("/forgot-password/:id", forgotPassWord);

module.exports = router;
