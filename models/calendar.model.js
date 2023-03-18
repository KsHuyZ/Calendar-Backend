const mongoose = require("mongoose");

const calendarSchema = mongoose.Schema(
  {
    calendarName: {
      type: String,
      required: true,
    },
    ownerId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "User",
    },
    description: {
      type: String,
    },
    photoCalendar: {
      type: String,
      default:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Circle-icons-calendar.svg/1200px-Circle-icons-calendar.svg.png",
    },
  },
  {
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
      updatedAt: "updated_at", // and `updated_at` to store the last updated date
    },
  }
);
const calendarModel = mongoose.model("Calendar", calendarSchema);
module.exports = calendarModel;
