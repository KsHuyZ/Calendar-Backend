var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");

const {
  checkUserbyGoogleAuth,
  getUserbyEmail,
  getUserbyId,
  getSchedulebyUserId,
  getUserListbyEmail
} = userController;
router.post("/gg-auth", checkUserbyGoogleAuth);
router.get("/by-email/:email", getUserbyEmail);
router.get("/by-id/:id", getUserbyId);
router.get("/schedule/:id", getSchedulebyUserId);
router.get("/find-email/:email",getUserListbyEmail )

module.exports = router;
