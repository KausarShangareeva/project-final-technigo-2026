const express = require("express");
const router = express.Router();
const optionalAuth = require("../middleware/optionalAuth");
const { createSuggestion } = require("../controllers/suggestionController");

router.post("/", optionalAuth, createSuggestion);

module.exports = router;

