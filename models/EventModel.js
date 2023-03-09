const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  idSchedule: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "Schedule",
  },
  backgroundColor: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  isHoliday: {
    type: Boolean,
    default: false,
  },
  location: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Location",
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  createdBy: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "User",
  },
  userJoin: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: "User",
  },
});

const EventModel = mongoose.model("Event", eventSchema);
module.exports = EventModel;
