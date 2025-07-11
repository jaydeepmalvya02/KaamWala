const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db.js");
const authRoutes = require("./src/routes/authRoutes.js");
const userRoutes=require("./src/routes/userRoutes.js")
const taskRoutes=require("./src/routes/taskRoutes.js")
const buddyRoutes=require("./src/routes/buddyRoutes.js")
const paymentRoutes=require("./src/routes/paymentRoutes.js")
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Auth Routes
app.use("/api/auth", authRoutes);
// User Routes
app.use("/api/user",userRoutes)
app.use("/api/buddy",buddyRoutes)
app.use("/api/task",taskRoutes)
app.use("/api/task/payment",paymentRoutes)

// Default route
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
