"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { api, getErrorMessage } from "@/lib/api";
import { UserPlus } from "lucide-react";

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
      await api.post("/auth/register", { name: form.get("name"), email: form.get("email"), password });
      toast.success("Account created! Please sign in.");
      router.push("/login");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  const inputStyle = {
    width: "100%", padding: "13px 16px", borderRadius: 12,
    background: "rgba(14,18,48,0.6)", border: "1px solid rgba(25,78,255,0.2)",
    color: "#fff", fontSize: 14, outline: "none", fontFamily: "inherit", transition: "border-color 0.2s",
  };

  return (
    <section style={{ minHeight: "calc(100vh - 140px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px", position: "relative" }}>
      <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "rgba(139,92,246,0.07)", filter: "blur(80px)", pointerEvents: "none" }} />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grad-border"
        style={{ width: "100%", maxWidth: 420, padding: "40px 36px", position: "relative" }}
      >
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: "linear-gradient(135deg,#194eff,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <UserPlus size={22} color="#fff" />
          </div>
        </div>

        <h1 style={{ fontSize: 26, fontWeight: 800, textAlign: "center", marginBottom: 6, fontFamily: "Inter Tight, sans-serif" }}>
          Create account
        </h1>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", textAlign: "center", marginBottom: 28 }}>
          Join KAVION — it&apos;s free to start
        </p>

        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <input name="name" required placeholder="Full name" style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(25,78,255,0.6)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(25,78,255,0.2)")} />
          <input name="email" type="email" required placeholder="Email address" style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(25,78,255,0.6)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(25,78,255,0.2)")} />
          <input name="password" type="password" required placeholder="Password" style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(25,78,255,0.6)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(25,78,255,0.2)")} />
          <input name="confirmPassword" type="password" required placeholder="Confirm password" style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(25,78,255,0.6)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(25,78,255,0.2)")} />
          <button
            disabled={loading}
            style={{
              width: "100%", padding: "13px", borderRadius: 100, fontSize: 14, fontWeight: 700,
              background: loading ? "rgba(25,78,255,0.4)" : "linear-gradient(135deg,#194eff,#4d7cff)",
              color: "#fff", border: "none", cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "0 0 28px rgba(25,78,255,0.3)", marginTop: 4, fontFamily: "inherit",
            }}
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p style={{ marginTop: 20, fontSize: 13, color: "rgba(255,255,255,0.35)", textAlign: "center" }}>
          Already have an account?{" "}
          <Link href="/login" style={{ color: "#4d7cff", fontWeight: 600 }}>Sign in</Link>
        </p>
      </motion.div>
    </section>
  );
}
