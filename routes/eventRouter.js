const router = require("express").Router();
const eventController = require("../controllers/eventController");

const { createEvent, updateTimeEvent, deleteEvent } = eventController;

router.post("/create-event", createEvent);
router.post("/update-time-event", updateTimeEvent);
router.delete("/:id", deleteEvent);
module.exports = router;
