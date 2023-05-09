var express = require("express");
var router = express.Router();
const userController = require("../controllers/user.controller");
const authJWTFirebase = require("../middlewares/firebaseMiddlwares");
const { uploadCloud } = require("../config/cloudinary");

const {
  checkUserbyGoogleAuth,
  getUserbyUid,
  getUserbyId,
  getCalendarbyUserId,
  getUserListbyEmail,
  activeUser,
  register,
  login,
} = userController;

router.post("/gg-auth", checkUserbyGoogleAuth);
router.get("/by-uid/:uid", authJWTFirebase, getUserbyUid);
router.get("/by-id/:id", getUserbyId);
router.get("/calendar/:id", getCalendarbyUserId);
router.get("/find-email/:email", getUserListbyEmail);
router.get("/active/:id", activeUser);
router.post("/register", uploadCloud.single("file"), register);
router.post("/login", login);

module.exports = router;
