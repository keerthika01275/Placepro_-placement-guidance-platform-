"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg)]">
      <Navbar setOpen={setOpen} />
      <Sidebar open={open} setOpen={setOpen} />

      <main className="flex-1 px-4 pt-24 md:px-8 lg:px-10">
        {children}
      </main>

      <Footer />
    </div>
  );
}