import AppShell from "@/components/AppShell";
import StatCard from "@/components/StatCard";

export default function ResumePage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="text-4xl font-black">Resume Builder</h1>
        <p className="text-[var(--muted)]">Create an ATS-friendly professional resume with live preview.</p>

        <div className="grid gap-6 md:grid-cols-3">
          <StatCard title="Resume Score" value="84%" subtitle="Almost complete" />
          <StatCard title="Sections Added" value="8/10" subtitle="Good progress" />
          <StatCard title="ATS Status" value="Good" subtitle="Needs minor fixes" />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="card p-6">
            <h2 className="text-2xl font-bold">Resume Form</h2>
            {["Personal Details", "Career Objective", "Education", "Skills", "Projects", "Certifications"].map((x) => (
              <input
                key={x}
                placeholder={x}
                className="mt-4 w-full rounded-2xl border border-black/10 bg-transparent px-4 py-3 outline-none dark:border-white/10"
              />
            ))}
            <button className="btn-primary mt-5 w-full">Save Resume</button>
          </div>

          <div className="card p-6">
            <h2 className="text-2xl font-bold">Live Preview</h2>
            <div className="mt-5 rounded-2xl bg-white p-6 text-black">
              <h3 className="text-2xl font-black">Keerthika</h3>
              <p className="text-sm">AI & Data Science Student</p>
              <hr className="my-4" />
              <p className="font-bold">Skills</p>
              <p className="text-sm">Java, React, MongoDB, Python, DSA</p>
              <p className="mt-4 font-bold">Projects</p>
              <p className="text-sm">PlacePro - Placement Preparation Platform</p>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}