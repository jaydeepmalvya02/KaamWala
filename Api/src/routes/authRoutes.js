const express = require("express");

const {
  registerUser,
  loginUser,
  verifyOtp,
  forgotPasswordStart,
  verifyForgotPassword,
} = require("../controllers/authController.js");

const router = express.Router();

router.post("/register",registerUser);
router.post("/login", loginUser);
router.post("/verify-otp", verifyOtp);
router.post("/forgot-password", forgotPasswordStart);
router.post("/verify-forgot-password", verifyForgotPassword);
//  router.post("/login", loginUser); // Add this too

module.exports = router;
