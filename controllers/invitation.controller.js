const calendarModel = require("../models/calendar.model");
const InvitationModel = require("../models/invitation.model");
const UserModel = require("../models/user.model");

const invitationController = {
  createInvitation: async (data) => {
    const { calendarId, senderId, receiverId } = data;
    const user = await UserModel.findById(senderId);
    const owner = await calendarModel.findById(calendarId);
    const handleCheckMsg = () => {
      return user._id.toString() === owner.ownerId.toString()
        ? "their"
        : `${user.userName}'s`;
    };
    const msg = `${user.userName} invited you to ${handleCheckMsg()} calendar`;

    const newData = { ...data, msg };

    try {
      const invitation = InvitationModel(newData);
      await invitation.save();
      const invitationPopulate = await InvitationModel.findById(
        invitation._id
      ).populate("senderId");
      return invitationPopulate;
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
      }).populate("senderId");

      return res.status(200).json({ success: true, invitations });
    } catch (error) {
      return res.status(400).json({ success: false });
    }
  },
  changeStatusInvitation: async (id, isAction, seen) => {
    try {
      const invitation = await InvitationModel.findByIdAndUpdate(
        id,
        {
          status: 1,
          isAction,
          seen,
        },
        { new: true }
      ).populate("senderId");
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
      ).populate("senderId");
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
};
module.exports = invitationController;
