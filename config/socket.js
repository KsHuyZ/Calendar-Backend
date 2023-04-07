const { Server } = require("socket.io");
const scheduleSocket = require("../socket/calendarSocket");
const { removeUser, getUser, getUsersInRoom } = require("../data/users");
const notifySocket = require("../socket/notifySocket");
const { getAuth } = require("firebase-admin/auth");
const socket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["POST", "GET", "DELETE", "PUT"],
    },
  });

  io.on("connection", (socket) => {
    socket.auth = false;
    socket.on("authenticate", function (data) {
      // check data được send tới client
      // console.log(data);
      getAuth()
        .verifyIdToken(data.token)
        .then((decodedToken) => {
          // console.log(decodedToken);
          socket.auth = true;
        })
        .catch((error) => {
          console.log(error);
        });
    });

    // setTimeout(function () {
    //   //sau 1s mà client vẫn chưa dc auth, lúc đấy chúng ta mới disconnect.
    //   if (!socket.auth) {
    //     console.log("Disconnecting socket ", socket.id);
    //     socket.disconnect("unauthorized");
    //   }
    // }, 1000);

    socket.once("create-user", ({ id, userName, photoURL }) => {
      socket._id = id;
      socket.userName = userName;
      socket.photoURL = photoURL;
    });

    scheduleSocket(socket, io);
    notifySocket(socket, io);
    socket.on("disconnect", () => {
      const user = getUser(socket.id);
      removeUser(socket.id);
      console.log(`User ${socket.userName} is disconnect`);
      if (user) {
        const users = getUsersInRoom(user.room);
        io.to(user.room).emit("new-user-join", users);
      }
    });
  });
};
module.exports = socket;
