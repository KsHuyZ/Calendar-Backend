const { Server } = require("socket.io");
const scheduleSocket = require("../socket/scheduleSocket");
const { removeUser } = require("../data/users");
const socket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["POST", "GET", "DELETE", "PUT"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("create-user", ({ id, displayName }) => {
      socket._id = id;
      socket.displayName = displayName;
    });

    scheduleSocket(socket, io);

    socket.on("disconnect", () => {
      removeUser(socket.id);
      console.log(`User ${socket.id} is disconnect`);
    });
  });
};
module.exports = socket;
