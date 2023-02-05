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
  view: [
    {
      idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      accept: {
        type: Boolean,
        default: false,
      },
    },
  ],

  edit: [
    {
      idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      accept: {
        type: Boolean,
        default: false,
      },
    },
  ],
  addUser: [
    {
      idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      accept: {
        type: Boolean,
        default: false,
      },
    },
  ],
});
const ScheduleModel = mongoose.model("Schedule", scheduleSchema);
module.exports = ScheduleModel;
