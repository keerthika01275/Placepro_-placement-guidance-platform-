import AppShell from "@/components/AppShell";

export default function SettingsPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="text-4xl font-black">Settings</h1>
        <p className="text-[var(--muted)]">Manage account, theme, privacy and notifications.</p>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="card p-6">
            <h2 className="text-2xl font-bold">Account Settings</h2>
            <input className="mt-4 w-full rounded-2xl border border-black/10 bg-transparent px-4 py-3 dark:border-white/10" placeholder="Name" />
            <input className="mt-4 w-full rounded-2xl border border-black/10 bg-transparent px-4 py-3 dark:border-white/10" placeholder="Email" />
            <input className="mt-4 w-full rounded-2xl border border-black/10 bg-transparent px-4 py-3 dark:border-white/10" placeholder="Phone" />
            <button className="btn-primary mt-5">Save Changes</button>
          </div>

          <div className="card p-6">
            <h2 className="text-2xl font-bold">Preferences</h2>
            {["Mock test reminders", "Daily practice reminder", "Interview tips", "Company updates"].map((x) => (
              <label key={x} className="mt-4 flex items-center justify-between rounded-2xl border border-black/10 p-4 dark:border-white/10">
                <span>{x}</span>
                <input type="checkbox" defaultChecked />
              </label>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}