const notifyModel = require("../models/NotifyModel");

const notifyController = {
  createAceptNotify: async (idUsers, idSchedule, idUserSend, msg, type) => {
    try {
      const notifies = idUsers.map(async (idUser) => {
        const notify = new notifyModel({
          idUser,
          idSchedule,
          idUserSend,
          msg,
          type,
        });

        await notify.save();

        const notifyPopulate = await notifyModel
          .findById(notify._id)
          .populate("idUserSend");
        return notifyPopulate;
      });
      return notifies;
    } catch (error) {
      console.log("error", error);
      return null;
    }
  },
  createNotifyAccepted: async (idUser, idUserSend, msg) => {
    try {
      const notify = new notifyModel({
        idUser,
        idUserSend,
        msg,
      });
      await notify.save();
      const notifyPopulate = await notifyModel
        .findById(notify._id)
        .populate("idUserSend");
      return notifyPopulate;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  createNotifyInvitedJoinEvent : async (idUserSend, idUser, event,msg) => {
    try {
      const notify = new notifyModel({
        idUser,
        idUserSend,
        msg,
      });
    } catch (error) {
      
    }
  },

  getNotifybyUser: async (req, res) => {
    const { idUser } = req.params;
    try {
      const notifies = await notifyModel
        .find({ idUser })
        .populate("idUserSend")
        .sort([["created_at", -1]]);
      return res.status(200).json({ success: true, notifies });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ success: false });
    }
  },
  getNotifybyIdAndSeen: async (req, res) => {
    const { id } = req.params;
    try {
      const notify = await notifyModel.findOneAndUpdate(
        { _id: id },
        { seen: true }
      );
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(400).json({ success: false });
    }
  },
  getNotifybyIdAndAccept: async (id) => {
    try {
      const notify = await notifyModel.findOneAndUpdate(
        { _id: id },
        { seen: true, accept: 1 }
      );
      return true;
    } catch (error) {
      return null;
    }
  },
  getNotifybyIdAndDeny: async (id) => {
    try {
      const notify = await notifyModel.findOneAndUpdate(
        { _id: id },
        { seen: true, accept: 2 }
      );
      return true;
    } catch (error) {
      return null;
    }
  },
  
};

module.exports = notifyController;
