"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function SignupPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Signup failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success("Account created successfully");
      window.location.href = "/dashboard";
    } catch (error) {
      toast.error("Backend not connected");
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[#050505] px-4 text-white">
      <form
        onSubmit={handleSignup}
        className="w-full max-w-md rounded-[30px] border border-white/10 bg-white/5 p-8 shadow-[0_0_60px_rgba(229,9,20,0.25)] backdrop-blur-xl"
      >
        <h1 className="text-4xl font-black">Create Account</h1>

        <p className="mt-2 text-white/60">
          Start preparing with PlacePro.
        </p>

        <input
          required
          className="mt-8 w-full rounded-2xl bg-white/10 px-4 py-3 text-white outline-none"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          required
          className="mt-4 w-full rounded-2xl bg-white/10 px-4 py-3 text-white outline-none"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          required
          className="mt-4 w-full rounded-2xl bg-white/10 px-4 py-3 text-white outline-none"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="btn-primary mt-6 w-full">
          Sign Up
        </button>

        <p className="mt-5 text-center text-sm text-white/60">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-red-400">
            Login
          </Link>
        </p>
      </form>
    </main>
  );
}