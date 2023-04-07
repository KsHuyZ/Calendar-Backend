const { getUser } = require("../data/users");
const {
  changeStatusInvitation,
  createInvitationAccepted,
} = require("../controllers/invitation.controller");
const {
  createCalendarUser,
  acceptedJoinCalendar,
} = require("../controllers/calendarUser.controller");
const InvitationModel = require("../models/invitation.model");

const {
  acceptJoinEventAttentee,
} = require("../controllers/eventAttentee.controller");

const notifySocket = (socket, io) => {
  const handleAcceptJoinCalendar = async (
    invitationId,
    isAction,
    seen,
    calendarId
  ) => {
    try {
      const invitation = await changeStatusInvitation(
        invitationId,
        isAction,
        seen
      );
      await acceptedJoinCalendar(calendarId, true);
      return invitation;
    } catch (error) {
      console.log("1", error);
      return false;
    }
  };
  socket.on("accept-join", async ({ id, calendarId, eventId, receiverId }) => {
    try {
      if (calendarId) {
        const invitation = await handleAcceptJoinCalendar(
          id,
          true,
          true,
          calendarId
        );
        console.log(invitation);
        if (invitation) {
          socket.emit("accept-success", invitation);
          const msg = `${socket.userName} accepted your invite`;
          await createInvitationAccepted({
            calendarId,
            senderId: socket._id,
            receiverId,
            status: -1,
            seen: false,
            isAction: false,
            msg,
          });
          const invitationPopulate = await InvitationModel.findOne({
            senderId: socket._id,
          }).populate("senderId");

          const user = getUser(receiverId._id);

          if (user) {
            io.sockets
              .to(user.id)
              .emit("notify-accept-success", invitationPopulate);
          }
        }
      }
    } catch (error) {
      console.log("2", error);
    }
  });
  socket.on(
    "accept-join-event",
    async ({ eventId, invitationId, receiverId }) => {
      const eventAttentee = await acceptJoinEventAttentee(eventId);
      const invitation = await changeStatusInvitation(invitationId, true, true);
      socket.emit("accept-success", invitation);
      const invitationAcp = await createInvitationAccepted({
        eventId,
        senderId: socket._id,
        receiverId,
        status: -1,
        msg: `${socket.userName} accepted your invite`,
      });
      const user = getUser(receiverId);
      if (user) {
        io.sockets
          .to(user.id)
          .emit("new-notify", invitationAcp, function (err, success) {
            console.log(err);
            console.log(success);
          });
      }
      const room = eventAttentee.eventId.calendarId.toString();
      io.to(room).emit("user-join-event", {
        user: eventAttentee.userId,
        eventId: eventAttentee.eventId._id,
      });
    }
  );
};
module.exports = notifySocket;
