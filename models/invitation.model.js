const mongoose = require("mongoose");
const invitationSchema = mongoose.Schema({
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
});
