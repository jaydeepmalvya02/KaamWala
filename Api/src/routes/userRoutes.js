const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const  authUser  = require("../middleware/authUser");


// Example: Add auth middleware later if needed
router.get("/",authUser, userController.getUser);
router.put("/", authUser,userController.updateUser);

// router.delete("/:id", userController.deleteUser);

module.exports = router;
