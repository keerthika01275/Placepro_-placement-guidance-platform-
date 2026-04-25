import AppShell from "@/components/AppShell";

const tasks = [
  { task: "Solve 10 aptitude questions", priority: "High" },
  { task: "Revise arrays and strings", priority: "High" },
  { task: "Practice one GD topic", priority: "Medium" },
  { task: "Update resume project section", priority: "Medium" },
  { task: "Take one mock test", priority: "Low" },
];

export default function PlannerPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="text-4xl font-black">Study Planner</h1>
        <p className="text-[var(--muted)]">Plan daily tasks, weekly goals and placement countdown.</p>

        <div className="card p-6">
          <h2 className="text-2xl font-bold">Today’s Tasks</h2>

          <div className="mt-5 space-y-4">
            {tasks.map((task) => (
              <div key={task.task} className="flex items-center justify-between rounded-2xl border border-black/10 p-4 dark:border-white/10">
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="h-5 w-5" />
                  <span>{task.task}</span>
                </label>
                <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
                  {task.priority}
                </span>
              </div>
            ))}
          </div>

          <button className="btn-primary mt-6">Add Task</button>
        </div>
      </div>
    </AppShell>
  );
}