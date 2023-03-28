const mongoose = require("mongoose");
const invitationSchema = mongoose.Schema(
  {
    calendarId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Calendar",
    },
    eventId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Event",
    },
    senderId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    // -1 is normal notify
    // 0 is pending
    // 1 is accept
    // 2 is reject
    status: {
      type: Number,
      default: 0,
    },
    seen: {
      type: Boolean,
      default: false,
    },
    isAction: {
      type: Boolean,
      default: false,
    },
    msg: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
      updatedAt: "updated_at", // and `updated_at` to store the last updated date
    },
  }
);

const InvitationModel = mongoose.model("Invitation", invitationSchema);
module.exports = InvitationModel;
