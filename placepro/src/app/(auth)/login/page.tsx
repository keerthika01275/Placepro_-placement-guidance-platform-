"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success("Login successful");
      window.location.href = "/dashboard";
    } catch (error) {
      toast.error("Backend not connected");
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[#050505] px-4 text-white">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-[30px] border border-white/10 bg-white/5 p-8 shadow-[0_0_60px_rgba(229,9,20,0.25)] backdrop-blur-xl"
      >
        <h1 className="text-4xl font-black">Login</h1>

        <p className="mt-2 text-white/60">
          Continue your placement journey.
        </p>

        <input
          required
          className="mt-8 w-full rounded-2xl bg-white/10 px-4 py-3 text-white outline-none"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          required
          className="mt-4 w-full rounded-2xl bg-white/10 px-4 py-3 text-white outline-none"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn-primary mt-6 w-full">
          Login
        </button>

        <div className="mt-5 flex justify-between text-sm text-white/60">
          <Link href="/forgot-password">Forgot password?</Link>
          <Link href="/signup">Create account</Link>
        </div>
      </form>
    </main>
  );
}