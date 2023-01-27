const mongoose = require("mongoose");

const scheduleSchema = mongoose.Schema({
  idOwner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  idEvent: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Event",
  },
  view: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
  },
  edit: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
  },
  addUser: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
  },
});
const ScheduleModel = mongoose.model("Schedule", scheduleSchema);
module.exports = ScheduleModel;
