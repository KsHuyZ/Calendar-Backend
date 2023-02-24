const { acceptJointoSchedule } = require("../controllers/scheduleController");
const { createNotifyAccepted } = require("../controllers/notifyController");
const { getUser } = require("../data/users");

const notifySocket = (socket, io) => {
  socket.on("accept-join", async ({ id, idSchedule, idUserSend }) => {
    try {
      const res = await acceptJointoSchedule({
        idUser: socket._id,
        idSchedule: idSchedule,
        idNotify: id,
      });

      if (res) {
        socket.emit("accept-success", { id, idUser: socket._id });
        const msg = `${socket.displayName} accepted your invite`;
        const notify = await createNotifyAccepted(idUserSend, socket._id, msg);
        const user = getUser(notify.idUser.toString());
        io.sockets.to(user.id).emit("notify-accept-success", notify);
      }
    } catch (error) {
      console.log(error);
    }
  });
};
module.exports = notifySocket;
