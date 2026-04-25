import AppShell from "@/components/AppShell";
import StatCard from "@/components/StatCard";

const students = [
  { name: "Keerthika", email: "keerthika@gmail.com", score: "78%", status: "Active" },
  { name: "Arun", email: "arun@gmail.com", score: "72%", status: "Active" },
  { name: "Priya", email: "priya@gmail.com", score: "81%", status: "Inactive" },
];

export default function AdminPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="text-4xl font-black">Admin Dashboard</h1>
        <p className="text-[var(--muted)]">Manage students, tests, questions, GD topics and analytics.</p>

        <div className="grid gap-6 md:grid-cols-4">
          <StatCard title="Total Students" value="1,245" subtitle="Registered users" />
          <StatCard title="Active Users" value="842" subtitle="This month" />
          <StatCard title="Tests Taken" value="3,920" subtitle="All mock tests" />
          <StatCard title="Avg Resume Score" value="76%" subtitle="Student resumes" />
        </div>

        <div className="card overflow-hidden p-6">
          <h2 className="mb-5 text-2xl font-bold">Manage Students</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-black/10 dark:border-white/10">
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Score</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s.email} className="border-b border-black/10 dark:border-white/10">
                    <td className="p-3 font-semibold">{s.name}</td>
                    <td className="p-3">{s.email}</td>
                    <td className="p-3">{s.score}</td>
                    <td className="p-3">{s.status}</td>
                    <td className="p-3">
                      <button className="rounded-xl bg-red-600 px-4 py-2 text-sm text-white">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}