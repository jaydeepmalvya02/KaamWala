const User = require("../models/userModel");
const UserOtp = require("../models/userOtpModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userService = require("../services/myServices");
const otpService = require("../services/otpServices");
const emailService = require("../services/emailServices");

const crypto = require("crypto");
const smsService = require("../services/smsService");
const { log } = require("console");

// ✅ Utility: sign JWT
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

// ✅ 1️⃣ Register (Step 1) — Create user record, hash password, send OTP
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, phone } = req.body;

    // Check if user already exists
    const existingUser = await userService.checkExist(User, { email });
    if (existingUser.success) {
      return res.json({ success: false, message: "User already exists" });
    }

    // OTP cooldown check
    const cooldown = await otpService.checkOtpCooldown(email);
    if (!cooldown.status) {
      return res.json({ success: false, message: cooldown.message });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user as not verified
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role,
      is_verified: false,
    });

    // ✅ Send OTP email
    await sendVerificationOtp(newUser, "register");

    res.json({
      success: true,
      message: "OTP sent to your email. Please verify.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ 1️⃣ Register (Step 2) — Verify OTP and activate account

// ✅ 2️⃣ Login (Step 1) — Check password, send OTP
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.json({ success: false, message: "Please register first" });
    }

    const matchPassword = bcrypt.compareSync(password, existingUser.password);
    if (!matchPassword) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const cooldown = await otpService.checkOtpCooldown(email);
    if (!cooldown.status) {
      return res.json({ success: false, message: cooldown.message });
    }

    // ✅ Send OTP email for login
    await sendVerificationOtp(existingUser, "login");

    res.json({
      success: true,
      message: "OTP sent to your email. Please verify.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ 2️⃣ Login (Step 2) — Verify OTP and log user in
const verifyOtp = async (req, res) => {
  try {
    const { email, otp, type } = req.body;

    if (!type || !["register", "login"].includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid type. Must be 'register' or 'login'.",
      });
    }

    const result = await otpService.verifyOtp(User, email, otp);

    if (!result.success) {
      return res.json({ success: false, message: result.message });
    }

    // ✅ Type-specific message if needed
    const message =
      type === "register"
        ? "Registration verified successfully!"
        : "Login verified successfully!";

    createPayload(result.data, res);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const sendVerificationOtp = async (newUser, type) => {
  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const email = newUser.email || newUser.data?.email;
    const name = newUser.name || newUser.data?.name || "User";
    const phone = newUser.phone || newUser.data?.phone || "";
    

    if (!email) {
      throw new Error("Email is required for OTP");
    }

    // ✅ Store OTP in DB
    await userService.create(UserOtp, { email, otp });

    // ✅ Send Email
    const subject =
      type === "register" ? "OTP for Registration" : "OTP for Login";
    const html = "welcome-email-otp.html";

    await emailService.sendEmailOTP(
      email,
      subject,
      `Your OTP is: ${otp}`,
      { name, otp },
      html
    );

    // ✅ Send SMS — only if mobile is valid
    if (phone && phone.length >= 10) {
      await smsService.sendOtpSms(phone, otp);
      console.log(`✅ OTP sent to mobile: ${phone}`);
    } else {
      console.log(`ℹ️ No valid mobile provided. SMS not sent.`);
    }

    console.log(`✅ OTP sent to email: ${email} (${type})`);

    return { success: true, otp };
  } catch (error) {
    console.error("❌ Error sending OTP:", error.message);
    throw new Error("Error sending OTP");
  }
};

module.exports = {
  registerUser,

  loginUser,
  verifyOtp,
};
