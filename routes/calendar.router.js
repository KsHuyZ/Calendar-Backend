const router = require("express").Router();

const {
  createCalendar,
} = require("../controllers/calendar.controller");
const uploadCloud = require("../config/cloudinary");
router.post("/create-calendar", uploadCloud.single("file"), createCalendar);

module.exports = router;
