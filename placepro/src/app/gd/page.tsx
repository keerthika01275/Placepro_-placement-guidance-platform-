import AppShell from "@/components/AppShell";

const topics = [
  "Impact of AI on Jobs",
  "Social Media: Boon or Bane",
  "Online Education vs Offline Education",
  "Is India Ready for Electric Vehicles?",
  "Work From Home vs Office Work",
];

export default function GDPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="text-4xl font-black">Group Discussion</h1>
        <p className="text-[var(--muted)]">Prepare GD topics, key points, pros, cons and conclusions.</p>

        <div className="grid gap-6 md:grid-cols-2">
          {topics.map((topic) => (
            <div key={topic} className="card p-6">
              <h2 className="text-xl font-bold">{topic}</h2>
              <p className="mt-3 text-sm text-[var(--muted)]">
                Includes background, opening line, key points, pros, cons and conclusion.
              </p>
              <button className="btn-primary mt-5">Open Topic</button>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}