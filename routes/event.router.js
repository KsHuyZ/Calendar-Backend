const router = require("express").Router();
const {
  getEventbyId,
  createEvent,
  updateTimeEvent,
  deleteEvent,
  userJointoEvent,
} = require("../controllers/event.controller");

router.post("/create-event", createEvent);
router.post("/update-time-event", updateTimeEvent);
router.post("/:id", userJointoEvent);
router.delete("/:id", deleteEvent);
router.get("/:id", getEventbyId);
module.exports = router;
