"use client";

import { useEffect, useState } from "react";
import { useRouter, } from "next/navigation";
import { toast } from "sonner";

export default function AuthorLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();


  useEffect(() => {
    if (typeof window === "undefined") return;

    const search = window.location.search;
    if (!search) return;

    const params = new URLSearchParams(search);

    if (params.get("message") === "login-required") {
      setTimeout(() => {
        toast.error("Please login");
      }, 50);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        cache: "no-store",
      });
      const json = await res.json();

      console.log(res)
      if (res.ok && json.success) {
        // router.refresh();
        // router.replace("/author");
        router.refresh();               // revalidate server components
        // small delay so the browser applies Set-Cookie
        await new Promise((r) => setTimeout(r, 100));
        router.replace("/author");
        toast.success("login success")
      } else {
        setError(json.message || "Login failed");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div className="min-h-screen flex items-center justify-center">
    //   <form onSubmit={handleSubmit} className="w-full max-w-md p-6 rounded-md border bg-white">
    //     <h2 className="text-xl font-semibold mb-4">Admin Login</h2>

    //     {error && <p className="text-sm text-red-600 mb-2">{error}</p>}

    //     <div className="mb-3">
    //       <label className="block text-sm mb-1">Username</label>
    //       <input className="w-full border px-3 py-2" value={username} onChange={(e) => setUsername(e.target.value)} />
    //     </div>

    //     <div className="mb-4">
    //       <label className="block text-sm mb-1">Password</label>
    //       <input type="password" className="w-full border px-3 py-2" value={password} onChange={(e) => setPassword(e.target.value)} />
    //     </div>

    //     <button type="submit" className="w-full py-2 bg-black text-white" disabled={loading}>
    //       {loading ? "Signing in..." : "Sign in"}
    //     </button>
    //   </form>
    // </div>


    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 rounded-md border border-border bg-white/60 dark:bg-neutral-900/70 backdrop-blur-sm transition-colors"
      >
        <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">Admin Login</h2>

        {error && <p className="text-sm text-rose-600 mb-2">{error}</p>}

        <div className="mb-3">
          <label className="block text-sm mb-1 text-neutral-700 dark:text-neutral-300">Username</label>
          <input
            className="w-full rounded-md border border-input px-3 py-2 bg-white/0 dark:bg-transparent text-black dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-accent transition"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
            aria-label="username"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1 text-neutral-700 dark:text-neutral-300">Password</label>
          <input
            type="password"
            className="w-full rounded-md border border-input px-3 py-2 bg-white/0 dark:bg-transparent text-black dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-accent transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            aria-label="password"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 rounded-md inline-flex items-center justify-center gap-2 text-sm font-medium
                 bg-black text-white hover:bg-neutral-900
                 dark:bg-white dark:text-black dark:hover:bg-neutral-200
                 disabled:opacity-60 disabled:cursor-not-allowed transition"
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>

  );
}
