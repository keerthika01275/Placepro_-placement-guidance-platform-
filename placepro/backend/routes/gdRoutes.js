const express = require("express");
const GDTopic = require("../models/GDTopic");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// GET all GD topics
router.get("/topics", authMiddleware, async (req, res) => {
  try {
    const { category, difficulty, search } = req.query;

    const filter = {};

    if (category && category !== "All") {
      filter.category = category;
    }

    if (difficulty && difficulty !== "All") {
      filter.difficulty = difficulty;
    }

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    const topics = await GDTopic.find(filter).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: topics.length,
      topics,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch GD topics",
    });
  }
});

// GET single GD topic
router.get("/topics/:id", authMiddleware, async (req, res) => {
  try {
    const topic = await GDTopic.findById(req.params.id);

    if (!topic) {
      return res.status(404).json({
        success: false,
        message: "GD topic not found",
      });
    }

    res.json({
      success: true,
      topic,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch GD topic",
    });
  }
});

module.exports = router;