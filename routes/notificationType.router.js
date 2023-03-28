const router = require("express").Router();

const {
  createNotificationType,
} = require("../controllers/notificationType.controller");
router.post("/create-notify-type", createNotificationType);

module.exports = router