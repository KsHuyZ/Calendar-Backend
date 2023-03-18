const router = require("express").Router();

const {
  createCalendar,
  getEventbyCalendarId,
} = require("../controllers/calendar.controller");
const uploadCloud = require("../config/cloudinary");
router.post("/create-calendar", uploadCloud.single("file"), createCalendar);
router.get("/:id/:year", getEventbyCalendarId);
module.exports = router;
