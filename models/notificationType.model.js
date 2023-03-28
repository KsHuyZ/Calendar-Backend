const mongoose = require("mongoose");

const notificationTypeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});
const NotificationTypeModel = mongoose.model(
  "notificationType",
  notificationTypeSchema
);
module.exports = NotificationTypeModel;
