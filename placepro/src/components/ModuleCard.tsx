export default function ModuleCard({
  title,
  desc,
  progress,
}: {
  title: string;
  desc: string;
  progress: number;
}) {
  return (
    <div className="card p-6">
      <h3 className="text-xl font-black text-[var(--text)] dark:text-white">
        {title}
      </h3>

      <p className="mt-2 text-sm text-[var(--muted)]">{desc}</p>

      <div className="mt-5 h-3 rounded-full bg-black/10 dark:bg-white/10">
        <div
          className="h-3 rounded-full bg-gradient-to-r from-red-600 to-orange-400 shadow-[0_0_18px_rgba(229,9,20,0.8)]"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="mt-3 text-sm font-bold text-[var(--text)] dark:text-white">
        {progress}% completed
      </p>
    </div>
  );
}