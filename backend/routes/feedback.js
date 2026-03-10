const express = require("express");
const router = express.Router();
const optionalAuth = require("../middleware/optionalAuth");
const { getFeedback, createFeedback, deleteFeedback, updateFeedback } = require("../controllers/feedbackController");

router.get("/", getFeedback);
router.post("/", optionalAuth, createFeedback);
router.patch("/:id", optionalAuth, updateFeedback);
router.delete("/:id", deleteFeedback);

module.exports = router;
