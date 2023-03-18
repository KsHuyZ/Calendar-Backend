const mongoose = require("mongoose");

const eventSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
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
    calendarId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "Calendar",
    },
  },
  {
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
      updatedAt: "updated_at", // and `updated_at` to store the last updated date
    },
  }
);

const EventModel = mongoose.model("Event", eventSchema);
module.exports = EventModel;
