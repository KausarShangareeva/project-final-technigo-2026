const Suggestion = require("../models/Suggestion");

exports.createSuggestion = async (req, res) => {
  try {
    const { name, email, projectType, title, details } = req.body;

    if (!name || !email || !projectType || !title || !details) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const suggestion = await Suggestion.create({
      userId: req.user?.id || null,
      name,
      email,
      projectType,
      title,
      details,
    });

    return res.status(201).json(suggestion);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

