require("dotenv").config();
const Razorpay = require("razorpay");
const Task = require("../models/taskModel");
const crypto = require("crypto");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createTaskOrder = async (req, res) => {
  const { taskId, amount } = req.body;

  const task = await Task.findById(taskId);
  if (!task) {
    return res.json({ success: false, message: "Task not found" });
  }

  const options = {
    amount: amount * 100, // paise
    currency: "INR",
    receipt: taskId,
  };

  const order = await razorpay.orders.create(options);

  res.json({ success: true, order });
};

exports.verifyTaskPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (generated_signature === razorpay_signature) {
    const orderInfo = await razorpay.orders.fetch(razorpay_order_id);
    const taskId = orderInfo.receipt;

    await Task.findByIdAndUpdate(taskId, { paymentStatus: "paid" });

    res.json({ success: true, message: "Payment verified & Task updated!" });
  } else {
    res.json({ success: false, message: "Invalid payment signature" });
  }
};
