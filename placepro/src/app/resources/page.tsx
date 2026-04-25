import AppShell from "@/components/AppShell";

const resources = [
  "Aptitude Formula Sheet",
  "Resume Writing Guide",
  "GD Framework Notes",
  "Interview Cheat Sheet",
  "Coding Patterns PDF",
  "Company Preparation Notes",
];

export default function ResourcesPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="text-4xl font-black">Resources</h1>
        <p className="text-[var(--muted)]">Access notes, PDFs, formulas and placement preparation guides.</p>

        <div className="grid gap-6 md:grid-cols-3">
          {resources.map((resource) => (
            <div key={resource} className="card p-6">
              <h2 className="text-xl font-bold">{resource}</h2>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Useful downloadable study material for quick revision.
              </p>
              <button className="btn-primary mt-5 w-full">View Resource</button>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}