const mongoose = require("mongoose");

const notificationTypeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});
