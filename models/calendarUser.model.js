const mongoose = require("mongoose");

const calendarUserSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "User",
    },
    calendarId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "Calendar",
    },
    canView: {
      type: Boolean,
      default: false,
    },
    canEdit: {
      type: Boolean,
      default: false,
    },
    canShare: {
      type: Boolean,
      default: false,
    },
    accepted: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
      updatedAt: "updated_at", // and `updated_at` to store the last updated date
    },
  }
);

const calendarUserModel = mongoose.model("calendarUser", calendarUserSchema);
module.exports = calendarUserModel;
