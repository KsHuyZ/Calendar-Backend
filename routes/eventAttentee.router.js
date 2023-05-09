const router = require("express").Router();

const {
  getMyEventUpComming,
} = require("../controllers/eventAttentee.controller");
router.post("/get-upcoming-event", getMyEventUpComming);

module.exports = router;
