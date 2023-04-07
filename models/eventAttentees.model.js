const mongoose = require("mongoose");

const eventAttendees = mongoose.Schema({
  eventId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Event",
  },
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  accepted: {
    type: Boolean,
    default: false,
  },
});

const EventAttenteesModel = mongoose.model("EventAttentee", eventAttendees);
module.exports = EventAttenteesModel;
