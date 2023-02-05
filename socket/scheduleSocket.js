const {
  createEvent,
  deleteEvent,
  updateTimeEvent,
} = require("../controllers/eventController");

const { addUser, getUser } = require("../data/users");

const { userJointoSchedule } = require("../controllers/scheduleController");

const scheduleSocket = (socket, io) => {
  socket.on("join-schedule", (room) => {
    socket.join(room);
    const { error, user } = addUser({
      id: socket.id,
      _id: socket._id,
      displayName: socket.displayName,
      room,
    });
    console.log(`User ${socket.displayName} join to ${room}`);
    socket.on("create-event", async (event) => {
      const res = await createEvent(event);
      if (res.success) {
        socket.emit("create-success", res.event);
        socket.broadcast.to(room).emit("new-event", res.event);
      } else {
        socket.emit("remove-event-error");
      }
    });

    socket.on("delete-event", async ({ idEvent, idSchedule }) => {
      try {
        const res = await deleteEvent(idEvent, idSchedule);
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
      console.log(users, permissions);
      const notifies = await userJointoSchedule(
        users,
        room,
        socket._id,
        permissions
      );
      await Promise.all(notifies).then(function (results) {
        results.map((notify) => {
          const user = getUser(notify.idUser.toString());
          if (user) {
            io.sockets.to(user.id).emit("new-notify", notify);
          }
        });
      });
    });
  });
};
module.exports = scheduleSocket;
