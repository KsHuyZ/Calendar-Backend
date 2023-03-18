const mongoose = require("mongoose");

const eventHistorySchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    eventId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Event",
    },
    fieldName: {
      type: String,
      required: true,
    },
    newValue: {
      type: String,
      required: true,
    },
    oldValue: {
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
