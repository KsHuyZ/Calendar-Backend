const NotificationTypeModel = require("../models/notificationType.model");

const notificationTypeController = {
  createNotificationType: async (req, res) => {
    const { name } = req.body;
    try {
      const notificationType = NotificationTypeModel({
        name,
      });
      await notificationType.save();
      return res.status(200).json({ success: true, notificationType });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ success: false });
    }
  },
};
module.exports = notificationTypeController;
