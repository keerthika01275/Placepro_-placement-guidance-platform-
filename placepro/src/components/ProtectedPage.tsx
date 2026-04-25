"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedPage({
  children,
  adminOnly = false,
}: {
  children: React.ReactNode;
  adminOnly?: boolean;
}) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      router.push("/login");
      return;
    }

    const user = JSON.parse(userData);

    if (adminOnly && user.role !== "admin") {
      router.push("/dashboard");
      return;
    }

    setAllowed(true);
  }, [router, adminOnly]);

  if (!allowed) {
    return (
      <div className="grid min-h-screen place-items-center bg-[var(--bg)]">
        <div className="card p-8 text-center">
          <h1 className="text-2xl font-black">Loading...</h1>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}