const router = require("express").Router();

const { getNotifybyUser,getNotifybyIdAndSeen } = require("../controllers/notifyController");

router.get("/:idUser", getNotifybyUser);
router.post("/:id",getNotifybyIdAndSeen)

module.exports = router;
