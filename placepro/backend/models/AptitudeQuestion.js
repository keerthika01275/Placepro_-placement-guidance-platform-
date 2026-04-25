const mongoose = require("mongoose");

const aptitudeQuestionSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Easy",
    },
    question: {
      type: String,
      required: true,
    },
    options: [String],
    answer: {
      type: String,
      required: true,
    },
    explanation: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AptitudeQuestion", aptitudeQuestionSchema);