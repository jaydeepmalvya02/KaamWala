const myServices = require("./myServices");
const UserOtp = require("../models/userOtpModel"); // <-- Mongoose OTP model
const User = require("../models/userModel"); // <-- Mongoose User model

const OTP_EXPIRATION_TIME = process.env.OTP_EXPIRATION_TIME || 5 * 60 * 1000; // 30 min
const MAX_ATTEMPTS = 4;
const BLOCK_TIME = 24 * 60 * 60 * 1000; // 24 hours

const otpService = {
  // ✅ Verify OTP
  verifyOtp: async (model, email, otp) => {
    // Find the user by email
    const user = await myServices.checkExist(model, { email: email });

    if (!user.success) {
      return { success: false, message: "User not found." };
    }

    // Block check
    if (
      user.data.blocked_at &&
      new Date() - new Date(user.data.blocked_at) < BLOCK_TIME
    ) {
      const remaining =
        BLOCK_TIME - (new Date() - new Date(user.data.blocked_at));
      const h = Math.floor(remaining / 3600000);
      const m = Math.floor((remaining % 3600000) / 60000);
      const s = Math.floor((remaining % 60000) / 1000);
      return {
        success: false,
        message: `Your account is temporarily blocked. Please try again after ${h} hour(s), ${m} minute(s), ${s} second(s).`,
      };
    }

    // ✅ Find latest OTP for email
    const userOtp = await UserOtp.findOne({ email }).sort({ createdAt: -1 });

    if (!userOtp) {
      return { success: false, message: "No OTP found for this user." };
    }

    // ✅ Check OTP match
    if (userOtp.otp !== otp) {
      const newAttempts = user.data.otp_attempts + 1;

      await User.findByIdAndUpdate(user.data._id, {
        otp_attempts: newAttempts,
      });

      if (newAttempts >= MAX_ATTEMPTS) {
        await User.findByIdAndUpdate(user.data._id, {
          otp_attempts: newAttempts,
          blocked_at: new Date(),
        });
        return {
          success: false,
          message:
            "Too many failed attempts. Your account is temporarily blocked. Please try again later.",
        };
      }

      return { success: false, message: "Invalid OTP." };
    }

    // ✅ Check OTP expiry
    const isExpired =
      new Date() - new Date(userOtp.createdAt) > OTP_EXPIRATION_TIME;
    if (isExpired) {
      return {
        success: false,
        message: "The OTP has expired. Kindly request a new one.",
      };
    }

    // ✅ Mark user verified & reset attempts
    const updated = await User.findByIdAndUpdate(
      user.data._id,
      { otp_attempts: 0, blocked_at: null, is_verified: true },
      { new: true }
    );

    return {
      success: true,
      data: updated,
      message: "OTP verified successfully!",
    };
  },

  // ✅ Check OTP cooldown
  checkOtpCooldown: async (email) => {
    const lastOtp = await UserOtp.findOne({ email }).sort({ createdAt: -1 });

    if (
      lastOtp &&
      new Date() - new Date(lastOtp.createdAt) < OTP_EXPIRATION_TIME
    ) {
      const remaining =
        OTP_EXPIRATION_TIME - (new Date() - new Date(lastOtp.createdAt));
      const m = Math.floor(remaining / 60000);
      const s = Math.floor((remaining % 60000) / 1000);
      return {
        status: false,
        message: `You recently requested an OTP. Please wait ${m} minute(s) and ${s} second(s) before trying again.`,
      };
    }

    return { status: true };
  },

  // ✅ Check block status
  checkBlockStatus: async (user) => {
    if (user.blocked_at) {
      const diff = new Date() - new Date(user.blocked_at);
      if (diff < BLOCK_TIME) {
        const remaining = BLOCK_TIME - diff;
        const h = Math.floor(remaining / 3600000);
        const m = Math.floor((remaining % 3600000) / 60000);
        const s = Math.floor((remaining % 60000) / 1000);

        return {
          isBlocked: true,
          isVerified: user.is_verified,
          message: `Your account is temporarily blocked. Please try again after ${h} hour(s), ${m} minute(s), ${s} second(s).`,
        };
      } else {
        // Unblock if block expired
        await User.findByIdAndUpdate(user._id, {
          blocked_at: null,
          otp_attempts: 0,
        });
      }
    }

    return { isBlocked: false, message: null };
  },
};

module.exports = otpService;
