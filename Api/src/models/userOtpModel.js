// models/UserOtp.js
const mongoose = require("mongoose");

const userOtpSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    otp: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserOtp", userOtpSchema);
