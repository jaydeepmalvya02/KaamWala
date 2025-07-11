const express =require("express");
const { registerUser, loginUser } = require( "../controllers/authController.js");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
//  router.post("/login", loginUser); // Add this too

module.exports=router;
