const InvitationModel = require("../models/invitation.model");
const {
  acceptInvitation,
  createInvitationService,
} = require("../services/invitation.service");

const invitationController = {
  createInvitation: async (data) => {
    try {
      const invitation = await createInvitationService(data);
      return invitation;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  getInvitationbyUserId: async (req, res) => {
    const { id } = req.params;
    try {
      const invitations = await InvitationModel.find({
        receiverId: id,
      })
        .populate("senderId")
        .sort({ created_at: -1 });

      return res.status(200).json({ success: true, invitations });
    } catch (error) {
      return res.status(400).json({ success: false });
    }
  },
  changeStatusInvitation: async (id, isAction, seen) => {
    try {
      const invitation = await acceptInvitation(id);
      return invitation;
    } catch (error) {
      return false;
    }
  },
  createInvitationAccepted: async (data) => {
    try {
      const invitation = await InvitationModel(data);
      await invitation.save();
      const invitationPopulate = await InvitationModel.findById(
        invitation._id
      ).populate("senderId eventId");
      await invitation.save();
      return invitationPopulate;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  seenInvitation: async (req, res) => {
    const { id } = req.body;
    try {
      await InvitationModel.findByIdAndUpdate(id, {
        seen: true,
      });
      return res.status(200).json({ success: true });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ success: false });
    }
  },
  checkInvitation: async (req, res) => {
    const { id } = req.body;
    try {
      await InvitationModel.updateMany(
        { receiverId: id },
        {
          isAction: true,
        }
      );

      return res.status(200).json({ success: true });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ success: false });
    }
  },
  createInvitationAcceptJoinEvent: async () => {},
};
module.exports = invitationController;
