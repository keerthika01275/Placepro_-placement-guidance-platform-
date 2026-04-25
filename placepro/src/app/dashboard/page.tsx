"use client";

import { useEffect, useState } from "react";
import { getCurrentUser } from "@/lib/api";
import AppShell from "@/components/AppShell";
import ModuleCard from "@/components/ModuleCard";
import StatCard from "@/components/StatCard";
import { chartData, modules } from "@/lib/data";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function loadUser() {
      const data = await getCurrentUser();
       console.log("USER DATA:", data); 
      setUser(data);
    }

    loadUser();
  }, []);

  return (
    <AppShell>
      <section className="space-y-8">
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-black p-8 text-white shadow-[0_0_60px_rgba(229,9,20,0.35)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#e50914,transparent_35%),radial-gradient(circle_at_bottom_right,#ff6a00,transparent_30%)] opacity-55" />

          <div className="relative z-10">
            <p className="mb-3 inline-block rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-red-100">
              Today’s placement mission
            </p>

            <h1 className="max-w-4xl text-4xl font-black leading-tight md:text-6xl">
              Welcome back, {user?.name || "Student"} 👋
            </h1>

            <p className="mt-4 max-w-2xl text-white/75">
              Complete 10 aptitude questions, revise arrays, and update your
              resume project section today.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button className="btn-primary">Continue Learning</button>

              <button className="rounded-2xl border border-white/20 px-5 py-3 font-bold text-white transition hover:bg-white hover:text-black">
                View Roadmap
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <StatCard
            title="Readiness Score"
            value={`${user?.readinessScore || 70}%`}
            subtitle="Good progress"
          />

          <StatCard
            title="Daily Streak"
            value={`${user?.streak || 1}`}
            subtitle="Days consistent"
          />

          <StatCard
            title="Resume Score"
            value={`${user?.resumeScore || 60}%`}
            subtitle="Almost ready"
          />

          <StatCard title="Mock Accuracy" value="71%" subtitle="Last 5 tests" />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="card p-6">
            <h2 className="mb-6 text-2xl font-bold">Section Performance</h2>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="score" radius={[12, 12, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="card p-6">
            <h2 className="mb-6 text-2xl font-bold">Progress Over Time</h2>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="score" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-2xl font-black">Quick Access Modules</h2>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {modules.map((m) => (
              <ModuleCard key={m.title} {...m} />
            ))}
          </div>
        </div>
      </section>
    </AppShell>
  );
}