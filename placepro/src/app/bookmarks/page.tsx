import AppShell from "@/components/AppShell";

const bookmarks = [
  "Percentage shortcut formulas",
  "AI impact on jobs GD topic",
  "Tell me about yourself answer",
  "Binary search interview problems",
  "TCS previous aptitude questions",
];

export default function BookmarksPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="text-4xl font-black">Bookmarks & Revision</h1>
        <p className="text-[var(--muted)]">View saved questions, GD topics and interview answers.</p>

        <div className="grid gap-5 md:grid-cols-2">
          {bookmarks.map((item) => (
            <div key={item} className="card p-6">
              <h2 className="text-xl font-bold">{item}</h2>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Saved for quick revision before placement drives.
              </p>
              <button className="btn-primary mt-5">Mark Revised</button>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}