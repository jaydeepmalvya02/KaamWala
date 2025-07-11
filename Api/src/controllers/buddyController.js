const jwt = require("jsonwebtoken");
const Buddy = require("../models/buddyModel");
const myServices = require("../services/myServices");


// Register buddy
exports.createBuddy = async (req, res) => {
  const response = await myServices.create(Buddy, req.body);

  const token=jwt.sign(response,process.env.JWT_SECRET)
  res.json(response,token);
};

exports.getDashboard = async (req, res) => {
  try {
    const buddyId = req.body.userId;

    const activeTasks = await Task.find({
      buddyId,
      status: { $in: ["accepted", "in-progress"] },
    });

    const completedTasks = await Task.find({
      buddyId,
      status: "completed",
    });

    const totalEarnings = completedTasks.reduce((sum, t) => sum + t.budget, 0);

    res.json({
      success: true,
      data: {
        name: req.user.name, // Or get from user model
        activeTasks,
        completedTasks,
        totalEarnings,
      },
    });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
