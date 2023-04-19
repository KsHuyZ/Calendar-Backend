const {
  createEvent,
  deleteEvent,
  updateTimeEvent,
} = require("../controllers/event.controller");

const {
  addUser,
  getUser,
  getUsersInRoom,
  getUserInRoom,
} = require("../data/users");

const {
  userJointoSchedule,
  acceptJointoSchedule,
} = require("../controllers/scheduleController");

const {
  getNotifybyIdAndSeen,
  createNotifyInvitedJoinEvent,
} = require("../controllers/notifyController");
const InvitationModel = require("../models/invitation.model");
const { createInvitation } = require("../controllers/invitation.controller");
const calendarUserController = require("../controllers/calendarUser.controller");
const {
  createInvitationJoinEvent,
} = require("../controllers/invitation.controller");
const {
  createEventAttentees,
} = require("../controllers/eventAttentee.controller");

const scheduleSocket = (socket, io) => {
  let count = 0;

  socket.once("join-schedule", (room) => {
    const handleListenInvited = async (
      userId,
      calendarId,
      canView,
      canEdit,
      canShare,
      accepted
    ) => {
      try {
        console.log(socket._id);
        const invitation = await createInvitation({
          calendarId: room,
          senderId: socket._id,
          receiverId: userId,
        });
        await calendarUserController.createCalendarUser(
          userId,
          calendarId,
          canView,
          canEdit,
          canShare,
          accepted
        );
        return invitation;
      } catch (error) {
        console.log("error", error);
        return false;
      }
    };
    const handleInvitedJoinEvent = async ({ eventId, receiverId }) => {
      const notify = await createInvitation({
        eventId,
        senderId: socket._id,
        receiverId,
      });
      createEventAttentees(eventId, receiverId);
      return notify;
    };
    let rooms = [];
    for (const room of socket.rooms) {
      rooms.push(room);
    }
    if (!rooms.includes(room)) {
      socket.join(room);
      console.log(`User ${socket.userName} join to ${room}`);
      const u = getUserInRoom(socket._id, room);
      if (u.length === 0) {
        const { error, user } = addUser({
          id: socket.id,
          _id: socket._id,
          displayName: socket.userName,
          photoURL: socket.photoURL,
          room,
        });
        const users = getUsersInRoom(room);
        io.to(room).emit("new-user-join", users);
      }
    }

    socket.on("create-event", async (data) => {
      const {
        title,
        backgroundColor,
        description,
        start,
        end,
        location,
        calendarId,
        file,
        isMeeting,
      } = data;
      const event = {
        title,
        backgroundColor,
        description,
        start,
        end,
        location,
        file,
        calendarId,
        createdBy: socket._id,
        isMeeting,
      };
      const res = await createEvent(event);
      if (res.success) {
        socket.emit("create-success", res.event);
        socket.broadcast.to(room).emit("new-event", res.event);
      } else {
        socket.emit("remove-event-error");
      }
    });

    socket.on("delete-event", async ({ idEvent }) => {
      try {
        const res = await deleteEvent(idEvent);
        socket.emit("delete-success", idEvent);
        socket.broadcast.to(room).emit("remove-event", idEvent);
      } catch (error) {
        socket.emit("delete-event-error");
      }
    });

    socket.on("update-time", async ({ startDay, endDay, id }) => {
      try {
        const res = await updateTimeEvent(id, startDay, endDay);
        socket.emit("update-success", { id, startDay, endDay });
        socket.broadcast
          .to(room)
          .emit("new-event-update", { id, startDay, endDay });
      } catch (error) {
        socket.emit("update-error");
      }
    });

    socket.on("invite-join", async ({ users, permissions }) => {
      const canView = permissions.view;
      const canEdit = permissions.update;
      const canShare = permissions.share;
      users.map(async (user) => {
        try {
          const invitation = await handleListenInvited(
            user,
            room,
            canView,
            canEdit,
            canShare,
            false
          );
          console.log("invitation", invitation);
          console.log("user", user);
          const userOnline = getUser(user);
          console.log("userOnline", userOnline);
          if (userOnline) {
            io.sockets
              .to(userOnline.id)
              .emit("new-notify", invitation, function (err, success) {
                console.log(err);
                console.log(success);
              });
          }
        } catch (error) {
          console.log(error);
        }
      });
    });

    socket.on("attend-event", ({ users, event }) => {
      users.map(async (user) => {
        const notify = await handleInvitedJoinEvent({
          receiverId: user,
          eventId: event,
          senderId: socket._id,
        });
        const us = getUser(user);
        if (us) {
          io.sockets
            .to(us.id)
            .emit("new-notify", notify, function (err, success) {
              console.log(err);
              console.log(success);
            });
        }
      });
    });
  });
};
module.exports = scheduleSocket;
