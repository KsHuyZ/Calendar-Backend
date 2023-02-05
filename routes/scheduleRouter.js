const router = require("express").Router();
const {
  getSchedulebyUserId,
  userJointoSchedule,
} = require("../controllers/scheduleController");

router.get("/:id/:idUser/:year", getSchedulebyUserId);
router.post("/join-schedule", userJointoSchedule);
module.exports = router;
