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


