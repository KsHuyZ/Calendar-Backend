const router = require("express").Router();
const scheduleController = require("../controllers/scheduleController");

router.get("/:id/:idUser/:year", scheduleController.getSchedulebyUserId);
module.exports = router;
