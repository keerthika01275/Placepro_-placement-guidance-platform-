import AppShell from "@/components/AppShell";

const sections = [
  "Self Introduction",
  "HR Interview Questions",
  "Technical Interview",
  "Behavioral Questions",
  "STAR Method Guide",
  "Final Interview Checklist",
];

export default function InterviewPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="text-4xl font-black">Interview Preparation</h1>
        <p className="text-[var(--muted)]">Practice HR, technical, behavioral and company interview questions.</p>

        <div className="grid gap-6 md:grid-cols-3">
          {sections.map((section) => (
            <div key={section} className="card p-6">
              <h2 className="text-xl font-bold">{section}</h2>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Sample answers, tips, mistakes to avoid and practice cards.
              </p>
              <button className="btn-primary mt-5 w-full">Practice</button>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}