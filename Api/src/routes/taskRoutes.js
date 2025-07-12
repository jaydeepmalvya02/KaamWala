const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const authUser = require("../middleware/authUser");

router.post("/",authUser, taskController.createTask);

router.put("/:id", taskController.updateTask);
router.get("/", taskController.listTasks);
router.get("/my-task",authUser,taskController.myTasks)
router.get("/:id", taskController.getTask);

module.exports = router;
