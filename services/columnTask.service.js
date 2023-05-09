const columnTaskModel = require("../models/columnTask.model");

const columnTaskService = {
  createColumnTaskService: async (name, position, userId) => {
    const columnTask = new columnTaskModel({ name, position, userId });
    await columnTask.save();
    return columnTask;
  },
  getAllColumnTaskByUserIdService: async (userId) => {
    const columnTasks = await columnTaskModel.find({ userId });
    return columnTasks;
  },
  updatePositionColumnTaskService: async (position, _id) => {
    const columnTask = await columnTaskModel.findByIdAndUpdate(
      _id,
      {
        position,
      },
      {
        new: true,
      }
    );
    return columnTask;
  },
};

module.exports = columnTaskService;
