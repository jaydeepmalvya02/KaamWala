const Task = require("../models/taskModel");
const myServices = require("../services/myServices");

// Post a new task
exports.createTask = async (req, res) => {
  
  const response = await myServices.create(Task, req.body);
  res.json(response);
};

// Get task by ID
exports.getTask = async (req, res) => {
  const { id } = req.params;
  const response = await myServices.read(Task, id);
  res.json(response);
};

// Update task (status, assign buddy)
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const response = await myServices.update(Task, id, req.body);
  res.json(response);
};

// List tasks (with pagination)
exports.listTasks = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const response = await myServices.listPagination(Task, null, page, limit);
  res.json(response);
};
// Get My Tasks
exports.myTasks = async (req, res) => {
  try {
    const userId = req.userId; // or req.userId from auth middleware

    const tasks = await Task.find({
      $or: [{ userId: userId }, { buddyId: userId }],
    }).sort({ createdAt: -1 });

    res.json({ success: true, data: tasks });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: "Error retrieving tasks" });
  }
};



