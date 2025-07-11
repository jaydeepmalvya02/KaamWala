const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userService = require("../services/myServices");

const createPayload = (user, res) => {
  const payload = {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  res.json({ success: true, token });
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await userService.checkExist(User, { email });
    const newUser=await userService.create(User,req.body)
    createPayload(newUser, res);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.json({ success: false, message: "Please Register First" });
    }

    const matchPassword = bcrypt.compareSync(password, existingUser.password);
    if (!matchPassword) {
      return res.json({ success: false, message: "Enter Valid Credentials" });
    }

    createPayload(existingUser, res);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { registerUser, loginUser };
