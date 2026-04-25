"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/AppShell";
import { getCurrentUser } from "@/lib/api";
import StatCard from "@/components/StatCard";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function loadUser() {
      const data = await getCurrentUser();
      setUser(data);
    }

    loadUser();
  }, []);

  return (
    <AppShell>
      <div className="space-y-8">
        <div>
          <h1 className="premium-heading text-5xl">My Profile</h1>
          <p className="mt-2 text-[var(--muted)]">
            Manage your student details, skills and placement preferences.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <StatCard
            title="Readiness Score"
            value={`${user?.readinessScore || 70}%`}
            subtitle="Placement progress"
          />
          <StatCard
            title="Resume Score"
            value={`${user?.resumeScore || 60}%`}
            subtitle="Profile strength"
          />
          <StatCard
            title="Daily Streak"
            value={`${user?.streak || 1}`}
            subtitle="Practice consistency"
          />
        </div>

        <div className="card p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <div className="grid h-24 w-24 place-items-center rounded-3xl bg-gradient-to-br from-red-600 to-orange-400 text-4xl font-black text-white shadow-[0_0_35px_rgba(229,9,20,0.45)]">
              {user?.name?.charAt(0)?.toUpperCase() || "S"}
            </div>

            <div>
              <h2 className="text-3xl font-black">{user?.name || "Student"}</h2>
              <p className="text-[var(--muted)]">{user?.email || "student@email.com"}</p>
              <p className="mt-2 inline-block rounded-full bg-red-100 px-4 py-2 text-sm font-bold text-red-700 dark:bg-red-600/20 dark:text-red-300">
                {user?.role || "student"}
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <ProfileField label="Phone" value={user?.phone || "Not added"} />
            <ProfileField label="Department" value={user?.department || "Not added"} />
            <ProfileField label="College" value={user?.college || "Not added"} />
            <ProfileField label="Year" value={user?.year || "Not added"} />
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function ProfileField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-white/40 p-5 dark:bg-white/5">
      <p className="text-sm font-semibold text-[var(--muted)]">{label}</p>
      <p className="mt-1 text-lg font-bold">{value}</p>
    </div>
  );
}