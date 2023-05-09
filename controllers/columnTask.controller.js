const {
  createColumnTaskService,
  getAllColumnTaskByUserIdService,
  updatePositionColumnTaskService,
} = require("../services/columnTask.service");

const columnTaskControler = {
  createColumnTask: async (req, res) => {
    const { name, position, userId } = req.body;
    try {
      const columnTask = await createColumnTaskService(name, position, userId);
      return res.status(200).json({ sucess: true, columnTask });
    } catch (error) {
      return res.status(400).json({ sucess: false, msg: "Error" });
    }
  },
  getAllColumnTaskByUserId: async (req, res) => {
    const { userId } = req.params;
    try {
      const columnTasks = await getAllColumnTaskByUserIdService(userId);
      return res.status(200).json({ sucess: true, columnTasks });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ sucess: false, msg: "Error" });
    }
  },
  updateColumnTaskPosition: async (req, res) => {
    const { position, _id } = req.body;
    try {
      await updatePositionColumnTaskService(position, _id);
      return res.status(200).json({ sucess: true, msg: "update_success" });
    } catch (error) {
      return res.status(400).json({ sucess: false, msg: "error" });
    }
  },
};
module.exports = columnTaskControler;
