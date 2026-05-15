const mongoose = require("mongoose");

const gdTopicSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Technology", "Social", "Business", "Education", "Current Affairs", "General"],
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Medium",
    },
    background: {
      type: String,
      required: true,
    },
    keyPoints: {
      type: [String],
      default: [],
    },
    pros: {
      type: [String],
      default: [],
    },
    cons: {
      type: [String],
      default: [],
    },
    intro: {
      type: String,
      required: true,
    },
    conclusion: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("GDTopic", gdTopicSchema);