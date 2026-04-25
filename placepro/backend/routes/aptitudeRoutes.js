const express = require("express");
const AptitudeQuestion = require("../models/AptitudeQuestion");
const AptitudeAttempt = require("../models/AptitudeAttempt");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/questions", protect, async (req, res) => {
  try {
    const questions = await AptitudeQuestion.find().sort({ createdAt: -1 });
    res.json({ questions });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch questions" });
  }
});

router.post("/submit", protect, async (req, res) => {
  try {
    const { answers, topic } = req.body;

    const questionIds = answers.map((a) => a.questionId);

    const questions = await AptitudeQuestion.find({
      _id: { $in: questionIds },
    });

    let score = 0;

    const checkedAnswers = answers.map((ans) => {
      const q = questions.find(
        (item) => item._id.toString() === ans.questionId
      );

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