"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { api, getErrorMessage } from "@/lib/api";
import { useAuthStore } from "@/store/auth";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const setAuth = useAuthStore((s) => s.setAuth);
  const router = useRouter();

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);

    try {
      const res = await api.post("/auth/login", {
        email: form.get("email"),
        password: form.get("password"),
      });
      setAuth(res.data.data.accessToken, res.data.data.user);
      toast.success("Logged in");
      router.push(res.data.data.user.role === "admin" ? "/admin" : "/");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="container-shell py-16">
      <div className="mx-auto w-full max-w-md rounded-2xl border border-[#2a3040] bg-[#111319]/90 p-6">
        <h1 className="text-3xl font-black">Login</h1>
        <form onSubmit={submit} className="mt-5 space-y-3">
          <input name="email" type="email" required placeholder="Email" className="w-full rounded-xl border border-[#2a3040] bg-[#0d1018] px-4 py-3 text-sm" />
          <input name="password" type="password" required placeholder="Password" className="w-full rounded-xl border border-[#2a3040] bg-[#0d1018] px-4 py-3 text-sm" />
          <button disabled={loading} className="w-full rounded-full bg-cyan-400 px-6 py-3 text-sm font-bold text-slate-950">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-4 text-sm text-slate-400">
          New user? <Link href="/signup" className="text-cyan-300">Create account</Link>
        </p>
      </div>
    </section>
  );
}
