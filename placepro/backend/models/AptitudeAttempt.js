const mongoose = require("mongoose");

const aptitudeAttemptSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    score: Number,
    total: Number,
    accuracy: Number,
    topic: String,
    timeSpent: Number,

    answers: [
      {
        questionId: String,
        selected: String,
        correct: Boolean,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("AptitudeAttempt", aptitudeAttemptSchema);