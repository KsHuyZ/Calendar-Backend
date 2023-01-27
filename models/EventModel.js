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
});

const EventModel = mongoose.model("Event", eventSchema);
module.exports = EventModel;
