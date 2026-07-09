const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const authenticate = require("../middleware/authenticate");

router.get("/sports", eventController.getSports);
router.get("/sports/:id", eventController.getSportById);
router.post(
    "/sports",
    authenticate,
    eventController.createSport
);
router.put("/sports/:id", eventController.updateSport);
router.delete("/sports/:id", eventController.deleteSport);

module.exports = router;