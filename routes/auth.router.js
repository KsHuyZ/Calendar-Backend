const router = require("express").Router();
const { refreshToken, userAuth } = require("../controllers/auth.controller");

router.post("/refresh-token", refreshToken);
router.get("/authorize", userAuth);

module.exports = router;
