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
      // small delay so the toast provider is hydrated
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
        router.refresh();
        router.replace("/author");
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
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-6 rounded-md border bg-white">
        <h2 className="text-xl font-semibold mb-4">Admin Login</h2>

        {error && <p className="text-sm text-red-600 mb-2">{error}</p>}

        <div className="mb-3">
          <label className="block text-sm mb-1">Username</label>
          <input className="w-full border px-3 py-2" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Password</label>
          <input type="password" className="w-full border px-3 py-2" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button type="submit" className="w-full py-2 bg-black text-white" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}
