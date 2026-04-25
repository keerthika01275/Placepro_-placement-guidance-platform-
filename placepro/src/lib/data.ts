import {
  LayoutDashboard,
  Brain,
  ClipboardList,
  Code,
  MessageSquare,
  Mic,
  FileText,
  Building2,
  Map,
  BarChart3,
  Bell,
  Bookmark,
  Calendar,
  BookOpen,
  Settings,
  Shield,
} from "lucide-react";

export const navGroups = [
  {
    title: "Dashboard",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    title: "Preparation",
    items: [
      { label: "Aptitude", href: "/aptitude", icon: Brain },
      { label: "Mock Tests", href: "/mock-tests", icon: ClipboardList },
      { label: "Coding", href: "/coding", icon: Code },
      { label: "GD", href: "/gd", icon: MessageSquare },
      { label: "Interview", href: "/interview", icon: Mic },
    ],
  },
  {
    title: "Career",
    items: [
      { label: "Resume", href: "/resume", icon: FileText },
      { label: "Companies", href: "/companies", icon: Building2 },
      { label: "Roadmap", href: "/roadmap", icon: Map },
    ],
  },
  {
    title: "Insights",
    items: [
      { label: "Analytics", href: "/analytics", icon: BarChart3 },
      { label: "Notifications", href: "/notifications", icon: Bell },
      { label: "Bookmarks", href: "/bookmarks", icon: Bookmark },
    ],
  },
  {
    title: "System",
    items: [
      { label: "Planner", href: "/planner", icon: Calendar },
      { label: "Resources", href: "/resources", icon: BookOpen },
      { label: "Settings", href: "/settings", icon: Settings },
      { label: "Admin", href: "/admin", icon: Shield },
    ],
  },
];

export const chartData = [
  { name: "Mon", score: 60 },
  { name: "Tue", score: 70 },
  { name: "Wed", score: 65 },
  { name: "Thu", score: 80 },
  { name: "Fri", score: 75 },
  { name: "Sat", score: 85 },
  { name: "Sun", score: 90 },
];

export const modules = [
  {
    title: "Aptitude Mastery",
    desc: "Practice quantitative aptitude, reasoning, verbal and DI.",
    progress: 74,
  },
  {
    title: "Mock Tests",
    desc: "Take timed placement-style tests with result analysis.",
    progress: 68,
  },
  {
    title: "Coding Tracker",
    desc: "Track DSA topics, coding problems and revision status.",
    progress: 58,
  },
  {
    title: "Group Discussion",
    desc: "Prepare GD topics, pros, cons, introductions and conclusions.",
    progress: 61,
  },
  {
    title: "Interview Prep",
    desc: "Practice HR, technical, behavioral and company questions.",
    progress: 69,
  },
  {
    title: "Resume Builder",
    desc: "Create ATS-friendly resumes with score and live preview.",
    progress: 82,
  },
];

export const companies = [
  {
    name: "TCS",
    package: "3.5 - 7 LPA",
    rounds: "Aptitude, Coding, Interview",
    progress: 72,
  },
  {
    name: "Infosys",
    package: "3.6 - 8 LPA",
    rounds: "Aptitude, Pseudo Code, HR",
    progress: 64,
  },
  {
    name: "Accenture",
    package: "4.5 - 6.5 LPA",
    rounds: "Cognitive, Coding, Communication",
    progress: 58,
  },
];

export const aptitudeQuestions = [
  {
    topic: "Percentages",
    difficulty: "Easy",
    question:
      "A number is increased by 20% and then decreased by 20%. What is the net change?",
    options: ["No change", "4% decrease", "4% increase", "2% decrease"],
    answer: "4% decrease",
    explanation: "100 → 120 → 96, so final value is 4% less.",
  },
  {
    topic: "Time and Work",
    difficulty: "Medium",
    question:
      "A can complete a work in 10 days and B in 15 days. Together they finish it in?",
    options: ["5 days", "6 days", "7 days", "8 days"],
    answer: "6 days",
    explanation: "1/10 + 1/15 = 1/6, so they finish in 6 days.",
  },
];