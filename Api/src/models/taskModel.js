const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // Who posted the task
    },
    buddyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null, // Who accepted the task
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "in-progress", "completed", "cancelled"],
      default: "pending",
    },
    cancelReason: {
      type: String,
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid", "refunded"],
      default: "unpaid",
    },
    paymentMode: {
      type: String, // e.g., Online, Cash
    },
    orderId: {
      type: String, // Razorpay order ID
    },
    receiptId: {
      type: String, // Razorpay receipt ID
    },
    budget: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
    },
    address: {
      type: String,
    },
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
    date: {
      type: Date,
    },
    time: {
      type: String, // Keep as string: "4:30 PM"
    },
    estimatedHours: {
      type: Number,
    },
    isAccepted: {
      type: Boolean,
      default: false,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    review: {
      type: String,
    },
    attachments: [
      {
        type: String, // Image URLs, doc links
      },
    ],
    completionProof: [
      {
        type: String, // Buddy uploads after work done
      },
    ],
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
