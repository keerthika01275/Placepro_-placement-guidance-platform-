import AppShell from "@/components/AppShell";

const notifications = [
  { title: "Mock test reminder", msg: "Your weekly mock test is pending.", type: "Unread" },
  { title: "Resume alert", msg: "Add project metrics to improve resume score.", type: "Unread" },
  { title: "Interview tip", msg: "Practice your self-introduction today.", type: "Read" },
  { title: "New company update", msg: "Accenture preparation pattern added.", type: "Read" },
];

export default function NotificationsPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="text-4xl font-black">Notifications</h1>
        <p className="text-[var(--muted)]">Track reminders, alerts and placement updates.</p>

        <div className="space-y-4">
          {notifications.map((n) => (
            <div key={n.title} className="card flex items-center justify-between p-6">
              <div>
                <h2 className="text-xl font-bold">{n.title}</h2>
                <p className="text-sm text-[var(--muted)]">{n.msg}</p>
              </div>
              <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
                {n.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}