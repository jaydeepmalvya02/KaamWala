const express = require("express");
const router = express.Router();

const paymentController = require("../controllers/paymentController");
const authUser = require("../middleware/authUser");
router.post("/create-task-order", authUser, paymentController.createTaskOrder);

router.post("/verify-task-payment", paymentController.verifyTaskPayment);

module.exports = router;
