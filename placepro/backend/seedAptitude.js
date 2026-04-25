const dotenv = require("dotenv");
const connectDB = require("./config/db");
const AptitudeQuestion = require("./models/AptitudeQuestion");

dotenv.config();
connectDB();

const questions = [
  {
    category: "Quantitative Aptitude",
    topic: "Percentages",
    difficulty: "Easy",
    question:
      "A number is increased by 20% and then decreased by 20%. What is the net change?",
    options: ["No change", "4% decrease", "4% increase", "2% decrease"],
    answer: "4% decrease",
    explanation: "100 becomes 120. Then 20% decrease of 120 is 96. Net decrease is 4%.",
  },
  {
    category: "Quantitative Aptitude",
    topic: "Time and Work",
    difficulty: "Medium",
    question:
      "A can complete a work in 10 days and B in 15 days. Together they finish it in?",
    options: ["5 days", "6 days", "7 days", "8 days"],
    answer: "6 days",
    explanation: "A's work = 1/10, B's work = 1/15. Together = 1/6.",
  },
  {
    category: "Logical Reasoning",
    topic: "Syllogism",
    difficulty: "Easy",
    question:
      "Statements: All cats are animals. All animals are living beings. Conclusion: All cats are living beings.",
    options: ["True", "False", "Cannot be determined", "None"],
    answer: "True",
    explanation: "Cats are animals and animals are living beings, so cats are living beings.",
  },
];

async function seed() {
  await AptitudeQuestion.deleteMany();
  await AptitudeQuestion.insertMany(questions);
  console.log("Aptitude questions seeded");
  process.exit();
}

seed();