import Link from "next/link";
import { ArrowRight, Brain, Code2, FileText, Mic, Trophy } from "lucide-react";

const features = [
  { title: "Aptitude Practice", icon: Brain },
  { title: "Coding Tracker", icon: Code2 },
  { title: "Mock Tests", icon: Trophy },
  { title: "GD Preparation", icon: Mic },
  { title: "Resume Builder", icon: FileText },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#070707] text-white">
      <section className="relative overflow-hidden px-6 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#e50914_0%,transparent_35%)] opacity-40" />

        <div className="relative mx-auto max-w-7xl text-center">
          <p className="mb-4 font-semibold text-red-300">
            Your complete placement preparation partner
          </p>

          <h1 className="mx-auto max-w-5xl text-5xl font-black leading-tight md:text-7xl">
            Prepare smarter. Track better. Get placement-ready with{" "}
            <span className="bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
              PlacePro
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-white/70">
            One premium platform for aptitude, coding, GD, interviews, resume,
            mock tests, analytics, roadmap and company-wise preparation.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/signup" className="btn-primary flex items-center gap-2">
              Get Started <ArrowRight size={18} />
            </Link>
            <Link
              href="/login"
              className="rounded-2xl border border-white/20 px-5 py-3 font-semibold hover:bg-white hover:text-black"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-16 md:grid-cols-5">
        {features.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:bg-red-600/20"
            >
              <Icon className="mb-4 text-red-400" />
              <h3 className="font-bold">{item.title}</h3>
            </div>
          );
        })}
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-4xl font-black">How PlacePro Works</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {["Practice", "Analyze", "Improve"].map((step, i) => (
            <div key={step} className="rounded-3xl bg-white/5 p-8">
              <p className="text-5xl font-black text-red-500">0{i + 1}</p>
              <h3 className="mt-4 text-2xl font-bold">{step}</h3>
              <p className="mt-2 text-white/60">
                Follow guided modules, track progress and focus on weak areas.
              </p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-10 text-center text-white/50">
        © 2026 PlacePro. Built for students, placements and career success.
      </footer>
    </main>
  );
}