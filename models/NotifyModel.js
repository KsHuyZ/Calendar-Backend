const mongoose = require("mongoose");

const notifySchema = mongoose.Schema(
  {
    idUser: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    idSchedule: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    idUserSend: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    msg: {
      type: String,
      required: true,
    },
    //   0: yes/no notify
    //   1: normal
    type: {
      type: Number,
      required: true,
    },
    // exist if type = 0
    linkType: {
      type: String,
    },
    seen: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
      updatedAt: "updated_at", // and `updated_at` to store the last updated date
    },
  }
);
const NotifyModel = mongoose.model("Notify", notifySchema);
module.exports = NotifyModel;
