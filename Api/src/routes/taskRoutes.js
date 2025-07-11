const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const authUser = require("../middleware/authUser");

router.post("/",authUser, taskController.createTask);
router.get("/:id", taskController.getTask);
router.put("/:id", taskController.updateTask);
router.get("/", taskController.listTasks);

module.exports = router;
