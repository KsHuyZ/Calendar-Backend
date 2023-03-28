const {
  seenInvitation,
  getInvitationbyUserId,
  checkInvitation,
} = require("../controllers/invitation.controller");

const router = require("express").Router();

router.get("/:id", getInvitationbyUserId);
router.post("/seen", seenInvitation);
router.post("/check-invitation", checkInvitation);

module.exports = router;
