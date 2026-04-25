import AppShell from "@/components/AppShell";
import ModuleCard from "@/components/ModuleCard";

const topics = [
  { title: "Arrays & Strings", desc: "Two pointers, sliding window, prefix sums.", progress: 80 },
  { title: "Linked List", desc: "Reverse, cycle detection, merge lists.", progress: 55 },
  { title: "Trees & BST", desc: "Traversals, height, LCA, BST operations.", progress: 45 },
  { title: "Graphs", desc: "BFS, DFS, shortest path, MST.", progress: 35 },
  { title: "Dynamic Programming", desc: "Knapsack, LIS, grid DP, memoization.", progress: 25 },
  { title: "Company Problems", desc: "TCS, Infosys, Accenture, Zoho patterns.", progress: 62 },
];

export default function CodingPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="text-4xl font-black">Coding Preparation</h1>
        <p className="text-[var(--muted)]">Track DSA roadmap, coding sheets and daily goals.</p>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {topics.map((item) => (
            <ModuleCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </AppShell>
  );
}