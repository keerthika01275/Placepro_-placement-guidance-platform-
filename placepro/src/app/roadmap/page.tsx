import AppShell from "@/components/AppShell";

const roadmap = [
  {
    stage: "Beginner",
    goal: "Build basics in aptitude, Java, communication and resume.",
    progress: 85,
  },
  {
    stage: "Intermediate",
    goal: "Solve DSA sheets, take mock tests and prepare GD topics.",
    progress: 58,
  },
  {
    stage: "Advanced",
    goal: "Company-wise preparation, interview practice and analytics.",
    progress: 32,
  },
];

export default function RoadmapPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="text-4xl font-black">Learning Roadmap</h1>

        <p className="text-[var(--muted)]">
          A personalized weekly roadmap for placement readiness.
        </p>

        <div className="space-y-5">
          {roadmap.map((item) => (
            <div key={item.stage} className="card p-6">
              <h2 className="text-2xl font-bold">{item.stage}</h2>

              <p className="mt-2 text-[var(--muted)]">{item.goal}</p>

              <div className="mt-5 h-3 rounded-full bg-black/10 dark:bg-white/10">
                <div
                  className="h-3 rounded-full bg-gradient-to-r from-red-600 to-orange-400"
                  style={{ width: `${item.progress}%` }}
                />
              </div>

              <p className="mt-2 text-sm font-semibold">
                {item.progress}% completed
              </p>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}