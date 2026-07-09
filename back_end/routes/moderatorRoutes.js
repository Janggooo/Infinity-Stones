const express = require("express");
const router = express.Router();
const moderatorController = require("../controllers/moderatorController");

router.get("/pending", moderatorController.getPendingModerators);

router.put("/:uid/approve", moderatorController.approveModerator);
router.put("/:uid/reject", moderatorController.rejectModerator);

module.exports = router;