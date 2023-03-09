const { Server } = require("socket.io");
const scheduleSocket = require("../socket/scheduleSocket");
const { removeUser, getUser, getUsersInRoom } = require("../data/users");
const notifySocket = require("../socket/notifySocket");
const socket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "https://calendar-backend-1ck8.vercel.app/",
      methods: ["POST", "GET", "DELETE", "PUT"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("create-user", ({ id, displayName, photoURL }) => {
      socket._id = id;
      socket.displayName = displayName;
      socket.photoURL = photoURL;
    });

    scheduleSocket(socket, io);
    notifySocket(socket, io);
    socket.on("disconnect", () => {
      const user = getUser(socket.id);
      if (user) {
        removeUser(socket.id);
        const users = getUsersInRoom(user.room);
        console.log(users);
        io.to(user.room).emit("new-user-join", users);
        console.log(`User ${socket.displayName} is disconnect`);
      }
    });
  });
};
module.exports = socket;
