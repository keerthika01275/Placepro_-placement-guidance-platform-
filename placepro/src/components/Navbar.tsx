"use client";

import { Bell, LogOut, Menu, Search, Sparkles, UserCircle } from "lucide-react";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar({
  setOpen,
}: {
  setOpen?: (value: boolean) => void;
}) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  }

  return (
    <header className="fixed left-0 right-0 top-0 z-40 border-b border-[var(--border)] bg-[var(--bg)]/80 px-4 py-3 shadow-[0_0_30px_rgba(229,9,20,0.12)] backdrop-blur-2xl">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {setOpen && (
            <button
              onClick={() => setOpen(true)}
              className="rounded-2xl bg-[var(--card)] p-3 shadow transition hover:scale-105"
            >
              <Menu size={22} className="text-[var(--text)]" />
            </button>
          )}

          <div>
            <h1 className="text-xl font-black text-[var(--text)]">PlacePro</h1>
            <p className="hidden text-xs text-[var(--muted)] sm:block">
              Placement Preparation Platform
            </p>
          </div>
        </div>

        <div className="hidden max-w-xl flex-1 items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 shadow md:flex">
          <Search size={18} className="text-[var(--muted)]" />
          <input
            placeholder="Search aptitude, coding, companies..."
            className="w-full bg-transparent text-sm text-[var(--text)] outline-none"
          />
        </div>

        <div className="flex items-center gap-3">
          {user && (
            <div className="hidden items-center gap-2 rounded-2xl bg-gradient-to-r from-red-600 to-orange-500 px-4 py-3 text-sm font-bold text-white shadow-[0_0_22px_rgba(229,9,20,0.45)] lg:flex">
              <Sparkles size={16} />
              {user?.readinessScore || 78}% Ready
            </div>
          )}

          <ThemeToggle />

          <button className="rounded-2xl bg-[var(--card)] p-3 shadow transition hover:scale-105">
            <Bell size={18} className="text-[var(--text)]" />
          </button>

          {user && (
            <>
              <div className="hidden items-center gap-2 rounded-2xl bg-[var(--card)] px-3 py-2 shadow md:flex">
                <UserCircle size={22} className="text-[var(--text)]" />
                <div>
                  <p className="text-sm font-bold text-[var(--text)]">
                    {user?.name || "User"}
                  </p>
                  <p className="text-xs text-[var(--muted)]">
                    {user?.role || "student"}
                  </p>
                </div>
              </div>

              <button
                onClick={logout}
                className="rounded-2xl bg-red-600 p-3 text-white shadow transition hover:scale-105"
              >
                <LogOut size={18} />
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}