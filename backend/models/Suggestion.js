const mongoose = require("mongoose");

const suggestionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 120 },
    projectType: { type: String, required: true, trim: true, maxlength: 80 },
    title: { type: String, required: true, trim: true, maxlength: 120 },
    goal: { type: String, required: true, trim: true, maxlength: 300 },
    details: { type: String, required: true, trim: true, maxlength: 2000 },
    timeline: { type: String, trim: true, maxlength: 80, default: "" },
    budget: { type: String, trim: true, maxlength: 80, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Suggestion", suggestionSchema);

