const mongoose = require("mongoose");
const dotenv = require("dotenv");
const GDTopic = require("./models/GDTopic");

dotenv.config();

const topics = [
  {
    title: "Artificial Intelligence: Boon or Threat?",
    category: "Technology",
    difficulty: "Medium",
    background:
      "Artificial Intelligence is transforming education, healthcare, business, finance, and daily life. However, it also raises concerns about job loss, privacy, bias, and overdependence.",
    keyPoints: [
      "AI improves automation and productivity",
      "AI is used in healthcare, education, finance, and transport",
      "Job displacement is a major concern",
      "Ethical AI and regulation are important",
    ],
    pros: [
      "Saves time and reduces human effort",
      "Improves accuracy in repetitive tasks",
      "Helps in medical diagnosis and research",
      "Supports personalized learning",
    ],
    cons: [
      "May replace certain jobs",
      "Can create privacy and security risks",
      "Biased data can lead to unfair decisions",
      "Overdependence may reduce human skills",
    ],
    intro:
      "Artificial Intelligence has become one of the most influential technologies of the modern era. It has the power to improve human life, but it must be used responsibly.",
    conclusion:
      "AI is neither completely a boon nor a threat. Its impact depends on how humans design, regulate, and use it for the benefit of society.",
  },
  {
    title: "Work From Home vs Work From Office",
    category: "Business",
    difficulty: "Easy",
    background:
      "After the pandemic, work culture changed significantly. Many companies adopted remote or hybrid work models, while others returned to office-based work.",
    keyPoints: [
      "Work from home offers flexibility",
      "Office work improves team collaboration",
      "Hybrid work is becoming popular",
      "Productivity depends on role and discipline",
    ],
    pros: [
      "Saves travel time and cost",
      "Improves work-life balance",
      "Allows companies to hire talent globally",
    ],
    cons: [
      "May reduce face-to-face collaboration",
      "Can cause communication gaps",
      "Home distractions may affect productivity",
    ],
    intro:
      "Work from home and work from office are two important models in today’s corporate world. Both have their own advantages and challenges.",
    conclusion:
      "A hybrid model can be the best solution because it combines flexibility with collaboration.",
  },
  {
    title: "Is Social Media Good for Society?",
    category: "Social",
    difficulty: "Medium",
    background:
      "Social media platforms connect people, spread information, support businesses, and create awareness. At the same time, they can spread misinformation and affect mental health.",
    keyPoints: [
      "Social media improves communication",
      "It supports digital marketing and awareness",
      "Fake news is a major issue",
      "Excessive usage affects mental health",
    ],
    pros: [
      "Connects people globally",
      "Helps small businesses grow",
      "Creates awareness about social issues",
      "Supports learning and networking",
    ],
    cons: [
      "Can spread fake news quickly",
      "May cause addiction",
      "Can affect privacy",
      "May increase comparison and anxiety",
    ],
    intro:
      "Social media has become a powerful part of modern life. It influences communication, business, education, and public opinion.",
    conclusion:
      "Social media is useful when used responsibly. Awareness, digital discipline, and fact-checking are necessary.",
  },
  {
    title: "Online Education vs Traditional Education",
    category: "Education",
    difficulty: "Easy",
    background:
      "Online education has grown rapidly due to digital platforms. Traditional classroom education still remains important for discipline, interaction, and practical learning.",
    keyPoints: [
      "Online education provides flexibility",
      "Traditional education improves discipline",
      "Digital divide affects online learning",
      "Blended learning can be effective",
    ],
    pros: [
      "Learn from anywhere",
      "Access to recorded lectures",
      "Cost-effective for many students",
    ],
    cons: [
      "Less physical interaction",
      "Requires internet and devices",
      "Practical learning can be limited",
    ],
    intro:
      "Education is changing with technology. Online and traditional education both play important roles in student development.",
    conclusion:
      "The best approach is blended learning, where technology supports classroom education.",
  },
  {
    title: "Startup Culture in India",
    category: "Business",
    difficulty: "Medium",
    background:
      "India has become one of the largest startup ecosystems in the world. Young entrepreneurs are solving problems using technology, innovation, and scalable business models.",
    keyPoints: [
      "Startups create jobs",
      "Government schemes support entrepreneurs",
      "Funding and competition are major challenges",
      "Innovation drives economic growth",
    ],
    pros: [
      "Encourages innovation",
      "Creates employment",
      "Solves real-world problems",
      "Improves economic development",
    ],
    cons: [
      "High failure rate",
      "Funding challenges",
      "Work pressure can be high",
      "Market competition is intense",
    ],
    intro:
      "Startup culture in India is growing rapidly and encouraging young people to become job creators instead of only job seekers.",
    conclusion:
      "Startup culture is beneficial for India, but entrepreneurs need proper planning, mentorship, and financial support.",
  },
  {
    title: "Impact of Technology on Jobs",
    category: "Technology",
    difficulty: "Hard",
    background:
      "Technology is changing the job market. Automation, AI, robotics, and digital platforms are replacing some jobs while creating new opportunities.",
    keyPoints: [
      "Automation replaces repetitive jobs",
      "New jobs are created in tech fields",
      "Upskilling is essential",
      "Human creativity remains important",
    ],
    pros: [
      "Creates high-skilled job opportunities",
      "Improves productivity",
      "Reduces manual workload",
      "Supports innovation",
    ],
    cons: [
      "Low-skilled jobs may reduce",
      "Skill gap may increase unemployment",
      "Continuous learning becomes necessary",
    ],
    intro:
      "Technology has always influenced employment. Today, the speed of technological change is much faster than before.",
    conclusion:
      "Technology will not remove all jobs, but it will change the nature of jobs. Students must focus on continuous learning.",
  },
];

async function seedGD() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");

    await GDTopic.deleteMany();
    await GDTopic.insertMany(topics);

    console.log("GD topics seeded successfully");
    process.exit();
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
}

seedGD();