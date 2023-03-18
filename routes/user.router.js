var express = require("express");
var router = express.Router();
const userController = require("../controllers/user.controller");
const authJWTFirebase = require("../middlewares/firebaseMiddlwares");

const {
  checkUserbyGoogleAuth,
  getUserbyUid,
  getUserbyId,
  getCalendarbyUserId,
  getUserListbyEmail,
} = userController;
router.post("/gg-auth", checkUserbyGoogleAuth);
router.get("/by-uid/:uid", authJWTFirebase, getUserbyUid);
router.get("/by-id/:id", getUserbyId);
router.get("/calendar/:id", getCalendarbyUserId);
router.get("/find-email/:email", getUserListbyEmail);

module.exports = router;
