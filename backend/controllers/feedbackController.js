const Feedback = require("../models/Feedback");

function sanitizeName(name = "Anonymous") {
  const trimmed = String(name).trim();
  if (!trimmed) return "Anonymous";
  return trimmed;
}

exports.getFeedback = async (_req, res) => {
  try {
    const entries = await Feedback.find({})
      .sort({ createdAt: -1 })
      .limit(30)
      .select("name rating message location createdAt");

    const publicEntries = entries.map((entry) => ({
      _id: entry._id,
      name: sanitizeName(entry.name),
      rating: entry.rating,
      message: entry.message,
      location: entry.location,
      createdAt: entry.createdAt,
    }));

    return res.json(publicEntries);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.deleteFeedback = async (req, res) => {
  try {
    const entry = await Feedback.findByIdAndDelete(req.params.id);
    if (!entry) return res.status(404).json({ message: "Not found" });
    return res.json({ message: "Deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.createFeedback = async (req, res) => {
  try {
    const { name, email, rating, message, location } = req.body;

    if (!name || !email || !rating || !message) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const normalizedRating = Number(rating);
    if (!Number.isFinite(normalizedRating) || normalizedRating < 1 || normalizedRating > 5) {
      return res.status(400).json({ message: "Rating must be from 1 to 5" });
    }

    const entry = await Feedback.create({
      userId: req.user?.id || null,
      name,
      email,
      rating: normalizedRating,
      message,
      location,
    });

    return res.status(201).json({
      _id: entry._id,
      name: sanitizeName(entry.name),
      rating: entry.rating,
      message: entry.message,
      location: entry.location,
      createdAt: entry.createdAt,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
