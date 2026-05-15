"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  Brain,
  CheckCircle,
  ChevronRight,
  Lightbulb,
  MessageSquareText,
  Search,
  ShieldCheck,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
  X,
} from "lucide-react";
import { getGDTopics } from "@/lib/api";

type GDTopic = {
  _id: string;
  title: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  background: string;
  keyPoints: string[];
  pros: string[];
  cons: string[];
  intro: string;
  conclusion: string;
};

const categories = [
  "All",
  "Technology",
  "Social",
  "Business",
  "Education",
  "Current Affairs",
  "General",
];

const difficulties = ["All", "Easy", "Medium", "Hard"];

export default function GDPage() {
  const [topics, setTopics] = useState<GDTopic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<GDTopic | null>(null);
  const [category, setCategory] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadTopics() {
    try {
      setLoading(true);

      const data = await getGDTopics({
        category,
        difficulty,
        search,
      });

      setTopics(data.topics || []);
    } catch (error) {
      console.error(error);
      setTopics([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const delay = setTimeout(() => {
      loadTopics();
    }, 300);

    return () => clearTimeout(delay);
  }, [category, difficulty, search]);

  const totalTopics = topics.length;

  const categoryCount = useMemo(() => {
    const set = new Set(topics.map((topic) => topic.category));
    return set.size;
  }, [topics]);

  return (
    <main className="min-h-screen bg-[#080808] text-white">
      <section className="relative overflow-hidden px-6 py-8 md:px-10">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-red-700/20 blur-3xl" />
        <div className="absolute right-0 top-20 h-72 w-72 rounded-full bg-red-900/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-8 rounded-3xl border border-red-900/40 bg-gradient-to-br from-[#171717] via-[#101010] to-[#050505] p-6 shadow-2xl">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-red-800/50 bg-red-950/30 px-4 py-2 text-sm text-red-200">
                  <Sparkles size={16} />
                  Real GD Preparation Module
                </div>

                <h1 className="text-3xl font-bold md:text-5xl">
                  Group Discussion Practice
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400 md:text-base">
                  Explore real GD topics, understand background context, prepare
                  strong points, compare pros and cons, and practice structured
                  introductions and conclusions.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <StatCard icon={<BookOpen />} label="Topics" value={totalTopics} />
                <StatCard icon={<Brain />} label="Categories" value={categoryCount} />
              </div>
            </div>
          </div>

          <div className="mb-6 grid gap-4 lg:grid-cols-[1fr_auto_auto]">
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                size={20}
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search GD topics..."
                className="w-full rounded-2xl border border-zinc-800 bg-[#111] py-4 pl-12 pr-4 text-sm text-white outline-none transition focus:border-red-700"
              />
            </div>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-2xl border border-zinc-800 bg-[#111] px-4 py-4 text-sm text-white outline-none transition focus:border-red-700"
            >
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="rounded-2xl border border-zinc-800 bg-[#111] px-4 py-4 text-sm text-white outline-none transition focus:border-red-700"
            >
              {difficulties.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>

          <div className="mb-6 flex flex-wrap gap-3">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  category === item
                    ? "bg-red-700 text-white shadow-lg shadow-red-900/30"
                    : "border border-zinc-800 bg-[#111] text-zinc-400 hover:border-red-800 hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="h-64 animate-pulse rounded-3xl border border-zinc-800 bg-[#111]"
                />
              ))}
            </div>
          ) : topics.length === 0 ? (
            <div className="rounded-3xl border border-zinc-800 bg-[#111] p-10 text-center">
              <MessageSquareText className="mx-auto mb-4 text-red-500" size={44} />
              <h2 className="text-xl font-semibold">No GD topics found</h2>
              <p className="mt-2 text-zinc-400">
                Try changing category, difficulty, or search keyword.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {topics.map((topic) => (
                <TopicCard
                  key={topic._id}
                  topic={topic}
                  onClick={() => setSelectedTopic(topic)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedTopic && (
        <TopicModal topic={selectedTopic} onClose={() => setSelectedTopic(null)} />
      )}
    </main>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-red-900/40 bg-black/40 p-5">
      <div className="mb-3 text-red-500">{icon}</div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-sm text-zinc-400">{label}</p>
    </div>
  );
}

function TopicCard({
  topic,
  onClick,
}: {
  topic: GDTopic;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group rounded-3xl border border-zinc-800 bg-[#111] p-6 text-left transition hover:-translate-y-1 hover:border-red-800 hover:bg-[#151515] hover:shadow-xl hover:shadow-red-950/20"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="rounded-full bg-red-950/50 px-3 py-1 text-xs text-red-300">
          {topic.category}
        </span>

        <span
          className={`rounded-full px-3 py-1 text-xs ${
            topic.difficulty === "Easy"
              ? "bg-green-950/40 text-green-300"
              : topic.difficulty === "Medium"
              ? "bg-yellow-950/40 text-yellow-300"
              : "bg-red-950/40 text-red-300"
          }`}
        >
          {topic.difficulty}
        </span>
      </div>

      <h2 className="mb-3 text-xl font-bold text-white group-hover:text-red-400">
        {topic.title}
      </h2>

      <p className="line-clamp-4 text-sm leading-6 text-zinc-400">
        {topic.background}
      </p>

      <div className="mt-5 flex items-center justify-between border-t border-zinc-800 pt-4">
        <span className="text-sm text-zinc-500">
          {topic.keyPoints.length} key points
        </span>

        <span className="inline-flex items-center gap-1 text-sm text-red-400">
          View details <ChevronRight size={16} />
        </span>
      </div>
    </button>
  );
}

function TopicModal({
  topic,
  onClose,
}: {
  topic: GDTopic;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur">
      <div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-3xl border border-zinc-800 bg-[#101010] shadow-2xl">
        <div className="sticky top-0 z-10 flex items-start justify-between border-b border-zinc-800 bg-[#101010]/95 p-6 backdrop-blur">
          <div>
            <div className="mb-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-red-950/50 px-3 py-1 text-xs text-red-300">
                {topic.category}
              </span>
              <span className="rounded-full bg-zinc-900 px-3 py-1 text-xs text-zinc-300">
                {topic.difficulty}
              </span>
            </div>

            <h2 className="text-2xl font-bold md:text-3xl">{topic.title}</h2>
          </div>

          <button
            onClick={onClose}
            className="rounded-full border border-zinc-800 bg-black p-2 text-zinc-400 transition hover:border-red-700 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <div className="grid gap-5 p-6 lg:grid-cols-2">
          <InfoBox
            icon={<Lightbulb />}
            title="Background"
            content={topic.background}
          />

          <InfoBox
            icon={<MessageSquareText />}
            title="Sample Introduction"
            content={topic.intro}
          />

          <ListBox
            icon={<CheckCircle />}
            title="Key Points"
            items={topic.keyPoints}
          />

          <InfoBox
            icon={<ShieldCheck />}
            title="Sample Conclusion"
            content={topic.conclusion}
          />

          <ListBox icon={<ThumbsUp />} title="Pros" items={topic.pros} />

          <ListBox icon={<ThumbsDown />} title="Cons" items={topic.cons} />
        </div>
      </div>
    </div>
  );
}

function InfoBox({
  icon,
  title,
  content,
}: {
  icon: React.ReactNode;
  title: string;
  content: string;
}) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-[#151515] p-5">
      <div className="mb-3 flex items-center gap-2 text-red-400">
        {icon}
        <h3 className="font-semibold text-white">{title}</h3>
      </div>

      <p className="text-sm leading-7 text-zinc-400">{content}</p>
    </div>
  );
}

function ListBox({
  icon,
  title,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-[#151515] p-5">
      <div className="mb-4 flex items-center gap-2 text-red-400">
        {icon}
        <h3 className="font-semibold text-white">{title}</h3>
      </div>

      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex gap-3 text-sm leading-6 text-zinc-400">
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-red-600" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}