"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDark(isDark);
  }, []);

  function toggleTheme() {
    document.documentElement.classList.toggle("dark");
    setDark(!dark);
  }

  return (
    <button
      onClick={toggleTheme}
      className="rounded-2xl bg-[var(--card)] p-3 shadow transition hover:scale-105"
    >
      {dark ? (
        <Sun size={18} className="text-yellow-400" />
      ) : (
        <Moon size={18} className="text-gray-700" />
      )}
    </button>
  );
}