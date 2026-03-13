"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { api, getErrorMessage } from "@/lib/api";
import { useAuthStore } from "@/store/auth";
import { ShieldCheck } from "lucide-react";

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
      toast.success("Welcome back!");
      router.push(res.data.data.user.role === "admin" ? "/admin" : "/");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  const inputStyle = {
    width: "100%", padding: "13px 16px", borderRadius: 12,
    background: "rgba(14,18,48,0.6)", border: "1px solid rgba(25,78,255,0.2)",
    color: "#fff", fontSize: 14, outline: "none", fontFamily: "inherit",
    transition: "border-color 0.2s",
  };

  return (
    <section style={{ minHeight: "calc(100vh - 140px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px", position: "relative" }}>
      {/* Background glow */}
      <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "rgba(25,78,255,0.08)", filter: "blur(80px)", pointerEvents: "none" }} />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grad-border"
        style={{ width: "100%", maxWidth: 420, padding: "40px 36px", position: "relative" }}
      >
        {/* Icon */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: "linear-gradient(135deg,#194eff,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ShieldCheck size={22} color="#fff" />
          </div>
        </div>

        <h1 style={{ fontSize: 26, fontWeight: 800, textAlign: "center", marginBottom: 6, fontFamily: "Inter Tight, sans-serif" }}>
          Welcome back
        </h1>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", textAlign: "center", marginBottom: 28 }}>
          Sign in to your KAVION account
        </p>

        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <input
            name="email" type="email" required placeholder="Email address"
            style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(25,78,255,0.6)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(25,78,255,0.2)")}
          />
          <input
            name="password" type="password" required placeholder="Password"
            style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(25,78,255,0.6)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(25,78,255,0.2)")}
          />
          <button
            disabled={loading}
            style={{
              width: "100%", padding: "13px", borderRadius: 100, fontSize: 14, fontWeight: 700,
              background: loading ? "rgba(25,78,255,0.4)" : "linear-gradient(135deg,#194eff,#4d7cff)",
              color: "#fff", border: "none", cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "0 0 28px rgba(25,78,255,0.3)", marginTop: 4, fontFamily: "inherit",
              transition: "opacity 0.2s",
            }}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p style={{ marginTop: 20, fontSize: 13, color: "rgba(255,255,255,0.35)", textAlign: "center" }}>
          No account?{" "}
          <Link href="/signup" style={{ color: "#4d7cff", fontWeight: 600 }}>
            Create one free
          </Link>
        </p>

        <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>
            Demo admin: admin@kavion.com / admin12345
          </p>
        </div>
      </motion.div>
    </section>
  );
}
