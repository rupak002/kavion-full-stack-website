"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const tags = ["Cybersecurity", "Cloud Infrastructure", "Web Engineering", "Digital Growth"];

export function Hero() {
  return (
    <section style={{ position: "relative", overflow: "hidden", paddingTop: 100, paddingBottom: 120 }}>
      {/* Deep background blobs */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(25,78,255,0.18) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div className="glow-blob" style={{ width: 600, height: 600, top: -200, left: "50%", transform: "translateX(-50%)", background: "rgba(25,78,255,0.12)", zIndex: 0 }} />
      <div className="glow-blob" style={{ width: 400, height: 400, bottom: -100, right: "10%", background: "rgba(139,92,246,0.1)", zIndex: 0 }} />

      {/* Grid overlay */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0, opacity: 0.04,
        backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        pointerEvents: "none",
      }} />

      <div className="shell" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}
        >
          <span className="badge">
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4d7cff", display: "inline-block" }} />
            Premier Agency — Cybersecurity & Engineering
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ fontSize: "clamp(42px, 7vw, 80px)", maxWidth: 880, margin: "0 auto 24px", lineHeight: 1.05 }}
        >
          <span className="text-grad-blue">Build Secure.</span>{" "}
          <span style={{ color: "rgba(255,255,255,0.9)" }}>Scale Smart.</span>
          <br />
          <span style={{ color: "rgba(255,255,255,0.5)" }}>Grow Faster.</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ fontSize: 17, maxWidth: 580, margin: "0 auto 40px", color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}
        >
          KAVION delivers enterprise-grade cybersecurity, cloud infrastructure, and digital engineering — built for teams that cannot afford downtime.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 56 }}
        >
          <Link
            href="/services"
            style={{
              padding: "13px 28px", borderRadius: 100, fontSize: 14, fontWeight: 700,
              background: "linear-gradient(135deg, #194eff, #4d7cff)",
              color: "#fff", transition: "opacity 0.2s",
              boxShadow: "0 0 32px rgba(25,78,255,0.35)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Explore Services
          </Link>
          <Link
            href="/contact"
            style={{
              padding: "13px 28px", borderRadius: 100, fontSize: 14, fontWeight: 600,
              border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.8)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "rgba(255,255,255,0.8)"; }}
          >
            Book a Call →
          </Link>
        </motion.div>

        {/* Tags row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}
        >
          {tags.map((t) => (
            <span key={t} style={{
              padding: "5px 14px", borderRadius: 100, fontSize: 11, fontWeight: 600,
              background: "rgba(25,78,255,0.08)", border: "1px solid rgba(25,78,255,0.2)",
              color: "rgba(255,255,255,0.45)", letterSpacing: "0.04em",
            }}>
              {t}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 120, zIndex: 1,
        background: "linear-gradient(to bottom, transparent, #00020f)",
        pointerEvents: "none",
      }} />
    </section>
  );
}
