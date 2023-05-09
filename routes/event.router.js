const router = require("express").Router();
const {
  getEventbyId,
  createEvent,
  updateTimeEvent,
  deleteEvent,
  userJointoEvent,
  getEventbyCalendarId,
} = require("../controllers/event.controller");
const authJWT = require("../middlewares/firebaseMiddlwares");

router.post("/create-event", createEvent);
router.post("/update-time-event", updateTimeEvent);
router.post("/:id", userJointoEvent);
router.delete("/:id", deleteEvent);
router.get("/:id", getEventbyId);
router.get("/:id/:year", authJWT, getEventbyCalendarId);
module.exports = router;
