const notifyModel = require("../models/NotifyModel");

const notifyController = {
  createAceptNotify: async (
    idUsers,
    idSchedule,
    idUserSend,
    msg,
    type,
    linkType
  ) => {
    try {
      const notifies = idUsers.map(async (idUser) => {
        const notify = new notifyModel({
          idUser,
          idSchedule,
          idUserSend,
          msg,
          type,
          linkType,
        });
        await notify.save();
        return notify;
      });
      return notifies;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  getNotifybyUser: async (req, res) => {
    const { idUser } = req.params;
    try {
      const notifies = await notifyModel
        .find({ idUser })
        .populate("idUserSend");
      return res.status(200).json({ success: true, notifies });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ success: false });
    }
  },
};
module.exports = notifyController;
