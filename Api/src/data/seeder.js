require("dotenv").config(); // ✅ Load .env first!

const mongoose = require("mongoose");
const connectDB = require("../config/db"); // ✅ adjust path if needed
const User = require("../models/userModel");
const Buddy = require("../models/buddyModel");


// Example dummy data
const users = [
  {
    name: "Rahul Sharma",
    email: "rahul@example.com",
    password: "password123",
    role: "buddy",
    profileUrl: "https://randomuser.me/api/portraits/men/55.jpg",
  },
  {
    name: "Priya Singh",
    email: "priya@example.com",
    password: "password123",
    role: "buddy",
    profileUrl: "https://randomuser.me/api/portraits/women/55.jpg",
  },
];

const seedData = async () => {
  try {
    await connectDB();

    // Clean old
    await User.deleteMany();
    await Buddy.deleteMany();

    console.log("Old data cleared.");

    // Insert Users
    const createdUsers = await User.insertMany(users);
    console.log("Users seeded.");

    // Create Buddy profile for each user with role 'buddy'
    const buddyPromises = createdUsers.map((user) =>
      Buddy.create({
        userId: user._id,
        kycStatus: "verified",
        skills: ["Delivery", "Grocery"],
        availability: "9am-6pm",
        averageRating: 4.8,
        totalReviews: 100,
        serviceArea: "City Center",
        latitude: 19.076,
        longitude: 72.8777,
      })
    );

    await Promise.all(buddyPromises);

    console.log("Buddy profiles created ✅");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();
