const router = require("express").Router();

const {
  createColumnTask,
  getAllColumnTaskByUserId,
} = require("../controllers/columnTask.controller");

router.post("/create-columntask", createColumnTask);
router.get("/get-columntask/:id", getAllColumnTaskByUserId);

module.exports = router;
