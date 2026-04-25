export default function StatCard({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: string;
  subtitle: string;
}) {
  return (
    <div className="card p-6">
      <p className="text-sm font-semibold text-[var(--muted)]">{title}</p>

      <h2 className="mt-3 text-4xl font-black text-[var(--text)] dark:text-white">
        {value}
      </h2>

      <p className="mt-2 text-sm text-[var(--muted)]">{subtitle}</p>
    </div>
  );
}