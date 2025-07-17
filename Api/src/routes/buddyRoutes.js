const express = require("express");
const router = express.Router();
const buddyController = require("../controllers/buddyController");

router.post("/", buddyController.createBuddy);
router.get("/all", buddyController.getBuddy);
// router.put("/:id", buddyController.updateBuddy);

module.exports = router;
