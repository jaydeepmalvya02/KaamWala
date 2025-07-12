const User = require("../models/userModel");
const myServices = require("../services/myServices");

// GET single user
const getUser = async (req, res) => {
  const  userId  = req.userId;
  const response = await myServices.read(User, userId);
  res.json(response);
};
// Update user profile
const updateUser = async (req, res) => {
  const  userId  = req.userId;
  const response = await myServices.update(User, userId, req.body);
  res.json(response);
};

module.exports = { getUser, updateUser };
