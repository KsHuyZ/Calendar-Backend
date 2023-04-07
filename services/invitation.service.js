const calendarModel = require("../models/calendar.model");
const EventModel = require("../models/event.model");
const InvitationModel = require("../models/invitation.model");

const invitationServices = {
  createInvitationService: async (data) => {
    const { calendarId, senderId, eventId, receiverId } = data;
    const user = await UserModel.findById(senderId);

    const owner = calendarId
      ? await calendarModel.findById(calendarId)
      : await EventModel.findById(eventId);

    const handleCheckMsg = () => {
      return user._id.toString() ===
        (calendarId ? owner.ownerId.toString() : owner.createdBy.toString())
        ? "their"
        : `${user.userName}'s`;
    };
    const msg = `${user.userName} invited you to ${handleCheckMsg()} ${
      calendarId ? "calendar" : "event"
    }`;

    const newData = { ...data, msg };

    const invitation = InvitationModel(newData);
    await invitation.save();
    const invitationPopulate = await InvitationModel.findById(
      invitation._id
    ).populate("senderId");
    return invitationPopulate;
  },
  acceptInvitation: async (id) => {
    const invitation = await InvitationModel.findByIdAndUpdate(
      id,
      {
        status: 1,
        isAction: true,
        seen: true,
      },
      { new: true }
    ).populate("senderId");
    return invitation;
  },
};
module.exports = invitationServices;
