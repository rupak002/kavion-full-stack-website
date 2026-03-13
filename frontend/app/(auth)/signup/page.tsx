"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { api, getErrorMessage } from "@/lib/api";

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const password = String(form.get("password") || "");
    const confirmPassword = String(form.get("confirmPassword") || "");

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      await api.post("/auth/register", {
        name: form.get("name"),
        email: form.get("email"),
        password,
      });
      toast.success("Account created. Please login.");
      router.push("/login");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="container-shell py-16">
      <div className="mx-auto w-full max-w-md rounded-2xl border border-[#2a3040] bg-[#111319]/90 p-6">
        <h1 className="text-3xl font-black">Signup</h1>
        <form onSubmit={submit} className="mt-5 space-y-3">
          <input name="name" required placeholder="Name" className="w-full rounded-xl border border-[#2a3040] bg-[#0d1018] px-4 py-3 text-sm" />
          <input name="email" type="email" required placeholder="Email" className="w-full rounded-xl border border-[#2a3040] bg-[#0d1018] px-4 py-3 text-sm" />
          <input name="password" type="password" required placeholder="Password" className="w-full rounded-xl border border-[#2a3040] bg-[#0d1018] px-4 py-3 text-sm" />
          <input name="confirmPassword" type="password" required placeholder="Confirm Password" className="w-full rounded-xl border border-[#2a3040] bg-[#0d1018] px-4 py-3 text-sm" />
          <button disabled={loading} className="w-full rounded-full bg-cyan-400 px-6 py-3 text-sm font-bold text-slate-950">
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>
        <p className="mt-4 text-sm text-slate-400">
          Already have an account? <Link href="/login" className="text-cyan-300">Login</Link>
        </p>
      </div>
    </section>
  );
}
