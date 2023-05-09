const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"ColumnTask",
    required: true,
  },
  position: {
    type: Number,
  },
});

const TaskModel = mongoose.model("Task", taskSchema);
module.exports = TaskModel;
