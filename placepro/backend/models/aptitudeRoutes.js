const express = require("express");
const AptitudeQuestion = require("../models/AptitudeQuestion");
const AptitudeAttempt = require("../models/AptitudeAttempt");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// GET QUESTIONS
router.get("/questions", protect, async (req, res) => {
  try {
    const { topic, difficulty, category } = req.query;

    const filter = {};

    if (topic) filter.topic = topic;
    if (difficulty) filter.difficulty = difficulty;
    if (category) filter.category = category;

    const questions = await AptitudeQuestion.find(filter).sort({
      createdAt: -1,
    });

    res.json({ questions });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch questions" });
  }
});

// ADD QUESTION - admin/simple for now
router.post("/questions", protect, async (req, res) => {
  try {
    const question = await AptitudeQuestion.create(req.body);

    res.status(201).json({
      message: "Question added successfully",
      question,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add question",
      error: error.message,
    });
  }
});

// SUBMIT ATTEMPT
router.post("/submit", protect, async (req, res) => {
  try {
    const { answers, topic } = req.body;

    const questionIds = answers.map((a) => a.questionId);

    const questions = await AptitudeQuestion.find({
      _id: { $in: questionIds },
    });

    let score = 0;

    const checkedAnswers = answers.map((ans) => {
      const q = questions.find((item) => item._id.toString() === ans.questionId);

      const correct = q && q.answer === ans.selected;

      if (correct) score++;

      return {
        questionId: ans.questionId,
        selected: ans.selected,
        correct,
      };
    });

    const total = answers.length;
    const accuracy = total > 0 ? Math.round((score / total) * 100) : 0;

    const attempt = await AptitudeAttempt.create({
      user: req.user.id,
      score,
      total,
      accuracy,
      topic,
      answers: checkedAnswers,
    });

    res.json({
      message: "Attempt submitted",
      score,
      total,
      accuracy,
      attempt,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to submit attempt",
      error: error.message,
    });
  }
});

// GET MY ATTEMPTS
router.get("/attempts", protect, async (req, res) => {
  try {
    const attempts = await AptitudeAttempt.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    res.json({ attempts });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch attempts" });
  }
});

module.exports = router;