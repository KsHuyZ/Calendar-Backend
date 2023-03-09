const {
  createEvent,
  deleteEvent,
  updateTimeEvent,
} = require("../controllers/eventController");

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

const scheduleSocket = (socket, io) => {
  socket.on("join-schedule", (room) => {
    socket.join(room);

    console.log(`User ${socket.displayName} join to ${room}`);
    const u = getUserInRoom(socket._id, room);
    console.log(u.length);
    if (u.length === 0) {
      const { error, user } = addUser({
        id: socket.id,
        _id: socket._id,
        displayName: socket.displayName,
        photoURL: socket.photoURL,
        room,
      });
      const users = getUsersInRoom(room);
      io.to(room).emit("new-user-join", users);
    }

    // socket.emit("new-user-join", user);

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
      const notifies = await userJointoSchedule(
        users,
        room,
        socket._id,
        permissions
      );

      Promise.all(notifies)
        .then(function (results) {
          results.map((notify) => {
            const user = getUser(notify.idUser.toString());
            if (user) {
              io.sockets
                .to(user.id)
                .emit("new-notify", notify, function (err, success) {
                  console.log(err);
                  console.log(success);
                });
            }
          });
        })
        .catch((err) => console.log(err));
    });

    socket.on("attend-event", ({ users, event }) => {
      users.map(async (user) => {
        const notify = await createNotifyInvitedJoinEvent(
          socket._id,
          user,
          event
        );
        const us = getUser(notify.idUser.toString());
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
