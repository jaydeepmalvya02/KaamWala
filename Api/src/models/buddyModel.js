const mongoose = require("mongoose");

const buddySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // 1:1 link
    },

    // KYC Details
    kycStatus: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending",
    },
    kycDocumentUrl: {
      type: String, // file storage path / S3 link
    },

    // Skills / Categories Buddy accepts
    skills: [
      {
        type: String,
      },
    ],

    // Buddy availability
    availability: {
      type: String, // Eg: "9am-6pm"
    },

    // Buddy Ratings
    averageRating: {
      type: Number,
      default: 0,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },

    // Service Area (optional)
    serviceArea: {
      type: String,
    },
    latitude: Number,
    longitude: Number,

    // Status
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Buddy", buddySchema);
