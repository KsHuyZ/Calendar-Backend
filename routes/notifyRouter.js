const router = require("express").Router();

const { getNotifybyUser } = require("../controllers/notifyController");

router.get("/:idUser", getNotifybyUser);

module.exports = router;
