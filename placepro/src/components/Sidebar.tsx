"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navGroups } from "@/lib/data";
import {
  ChevronDown,
  GraduationCap,
  Sparkles,
  X,
} from "lucide-react";

export default function Sidebar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) {
  const pathname = usePathname();

  const activeGroup =
    navGroups.find((group) =>
      group.items.some((item) => item.href === pathname)
    )?.title || "Preparation";

  const [openGroup, setOpenGroup] = useState<string | null>(activeGroup);

  return (
    <>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/75 backdrop-blur-sm"
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 z-50 h-screen w-80 overflow-y-auto
          border-r border-white/10 bg-[#050505] text-white
          shadow-[0_0_70px_rgba(229,9,20,0.35)]
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Brand */}
        <div className="sticky top-0 z-10 bg-[#050505]/95 p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-gradient-to-br from-red-600 to-orange-500 p-3 shadow-[0_0_28px_rgba(229,9,20,0.85)]">
                <GraduationCap size={24} />
              </div>

              <div>
                <h1 className="text-2xl font-black tracking-tight">
                  PlacePro
                </h1>
                <p className="text-xs font-semibold text-red-300">
                  Placement partner
                </p>
              </div>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="rounded-xl bg-white/10 p-2 transition hover:bg-red-600"
            >
              <X size={20} />
            </button>
          </div>

          {/* Readiness Card */}
          <div className="mt-6 rounded-3xl border border-red-500/20 bg-gradient-to-br from-red-600/25 via-white/5 to-orange-500/10 p-5 shadow-[0_0_35px_rgba(229,9,20,0.18)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-white/60">
                  Placement Readiness
                </p>
                <h2 className="mt-1 text-4xl font-black">78%</h2>
              </div>

              <div className="rounded-2xl bg-red-600/20 p-3 text-red-300">
                <Sparkles size={24} />
              </div>
            </div>

            <div className="mt-4 h-2 rounded-full bg-white/10">
              <div className="h-2 w-[78%] rounded-full bg-gradient-to-r from-red-500 to-orange-400 shadow-[0_0_20px_rgba(229,9,20,0.9)]" />
            </div>

            <p className="mt-3 text-xs text-white/50">
              Keep your streak alive today.
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-3 px-4 pb-8">
          {navGroups.map((group) => {
            const isOpen = openGroup === group.title;
            const groupActive = group.items.some(
              (item) => item.href === pathname
            );

            return (
              <div
                key={group.title}
                className="rounded-2xl border border-white/5 bg-white/[0.025] p-2"
              >
                <button
                  onClick={() =>
                    setOpenGroup(isOpen ? null : group.title)
                  }
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-sm font-black transition ${
                    groupActive
                      ? "bg-red-600/15 text-white"
                      : "text-white/65 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span>{group.title}</span>

                  <ChevronDown
                    size={17}
                    className={`transition duration-300 ${
                      isOpen ? "rotate-180 text-red-400" : ""
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-all duration-300 ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="mt-2 space-y-1">
                      {group.items.map((item) => {
                        const Icon = item.icon;
                        const active = pathname === item.href;

                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className={`group relative flex items-center gap-3 overflow-hidden rounded-xl px-3 py-3 text-sm font-semibold transition ${
                              active
                                ? "bg-gradient-to-r from-red-700 to-red-500 text-white shadow-[0_0_22px_rgba(229,9,20,0.45)]"
                                : "text-white/65 hover:bg-white/5 hover:text-white"
                            }`}
                          >
                            {active && (
                              <span className="absolute left-0 top-0 h-full w-1 bg-orange-400" />
                            )}

                            <span
                              className={`rounded-lg p-1.5 transition ${
                                active
                                  ? "bg-white/15 text-white"
                                  : "bg-white/5 text-white/60 group-hover:text-red-300"
                              }`}
                            >
                              <Icon size={16} />
                            </span>

                            <span>{item.label}</span>

                            {item.label === "Mock Tests" && (
                              <span className="ml-auto rounded-full bg-orange-500 px-2 py-0.5 text-[10px] font-black text-white">
                                LIVE
                              </span>
                            )}

                            {item.label === "Admin" && (
                              <span className="ml-auto rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-black text-white">
                                PRO
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}