const mongoose = require("mongoose");

const eventAttendees = mongoose.Schema({
  eventId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Event",
  },
  userId: mongoose.SchemaTypes.ObjectId,
  ref:"User"
});
