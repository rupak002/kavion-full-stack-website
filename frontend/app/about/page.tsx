"use client";

import { motion } from "framer-motion";
import { CheckCircle, Target, Eye, Users, Award, Zap, Globe } from "lucide-react";

const values = [
  "Security-first engineering in every delivery",
  "Transparent, weekly reporting to all stakeholders",
  "Outcome-driven partnerships — we win when you win",
  "Continuous improvement through structured retrospectives",
  "Zero-trust architecture by default",
  "SLA-backed commitments with clear accountability",
];

const team = [
  { name: "Alex Morgan", role: "CEO & Co-founder", avatar: "AM", bg: "linear-gradient(135deg,#194eff,#8b5cf6)" },
  { name: "Jamie Lee", role: "CTO & Co-founder", avatar: "JL", bg: "linear-gradient(135deg,#8b5cf6,#ec4899)" },
  { name: "Chris Park", role: "Head of Security", avatar: "CP", bg: "linear-gradient(135deg,#194eff,#06b6d4)" },
  { name: "Dana Kim", role: "Lead Engineer", avatar: "DK", bg: "linear-gradient(135deg,#10b981,#194eff)" },
];

const milestones = [
  { year: "2019", event: "KAVION founded in San Francisco" },
  { year: "2020", event: "First enterprise client — Fortune 500 onboard" },
  { year: "2021", event: "ISO 27001 certification achieved" },
  { year: "2023", event: "100+ projects delivered, SOC 2 Type II certified" },
  { year: "2024", event: "Expanded to cloud and full-stack engineering" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ position: "relative", paddingTop: 80, paddingBottom: 80, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 50% at 30% 50%, rgba(25,78,255,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div className="shell" style={{ position: "relative", zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="badge" style={{ marginBottom: 18 }}>
              <Globe size={10} /> About KAVION
            </span>
            <h1 style={{ fontSize: "clamp(36px,6vw,64px)", maxWidth: 700, marginBottom: 20 }}>
              We exist to <span className="text-grad">protect and accelerate</span> your business
            </h1>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 17, maxWidth: 580, lineHeight: 1.75 }}>
              KAVION was built by engineers and security experts who were tired of watching great companies get breached or fall behind. We fix that — permanently.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission + Vision */}
      <section className="shell" style={{ paddingBottom: 80 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grad-border" style={{ padding: 36 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(25,78,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
              <Target size={20} color="#4d7cff" />
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12, fontFamily: "Inter Tight, sans-serif" }}>Mission</h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 15, lineHeight: 1.75 }}>
              Protect and accelerate organizations by blending strategic security architecture with engineering speed — delivering outcomes, not hours.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="grad-border" style={{ padding: 36 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(139,92,246,0.12)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
              <Eye size={20} color="#a78bfa" />
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12, fontFamily: "Inter Tight, sans-serif" }}>Vision</h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 15, lineHeight: 1.75 }}>
              Become the most trusted digital partner for growth-focused organizations globally — where every engagement results in measurable, lasting impact.
            </p>
          </motion.div>
        </div>

        {/* Values */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grad-border" style={{ padding: 36 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24, fontFamily: "Inter Tight, sans-serif" }}>
            <Zap size={18} color="#4d7cff" style={{ display: "inline", marginRight: 8 }} />
            Our Core Values
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {values.map((v) => (
              <div key={v} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <CheckCircle size={15} color="#4d7cff" style={{ marginTop: 2, flexShrink: 0 }} />
                <span style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>{v}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Team */}
      <section className="section" style={{ background: "rgba(25,78,255,0.03)", borderTop: "1px solid rgba(25,78,255,0.08)", borderBottom: "1px solid rgba(25,78,255,0.08)" }}>
        <div className="shell">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: 44, textAlign: "center" }}>
            <span className="badge" style={{ marginBottom: 14 }}>
              <Users size={10} /> The Team
            </span>
            <h2 style={{ fontSize: "clamp(26px,4vw,42px)" }}>Meet the people behind KAVION</h2>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
            {team.map((member, i) => (
              <motion.div key={member.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="grad-border" style={{ padding: 28, textAlign: "center" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: member.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 800, color: "#fff", margin: "0 auto 16px" }}>{member.avatar}</div>
                <p style={{ fontSize: 15, fontWeight: 700, fontFamily: "Inter Tight, sans-serif" }}>{member.name}</p>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section shell">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: 44 }}>
          <span className="badge" style={{ marginBottom: 14 }}>
            <Award size={10} /> Our Journey
          </span>
          <h2 style={{ fontSize: "clamp(26px,4vw,42px)" }}>Milestones that define us</h2>
        </motion.div>
        <div style={{ position: "relative", paddingLeft: 32 }}>
          <div style={{ position: "absolute", left: 7, top: 0, bottom: 0, width: 2, background: "linear-gradient(180deg, #194eff, rgba(25,78,255,0.1))" }} />
          {milestones.map((m, i) => (
            <motion.div key={m.year} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} style={{ position: "relative", paddingBottom: 32 }}>
              <div style={{ position: "absolute", left: -32, top: 4, width: 16, height: 16, borderRadius: "50%", background: "#194eff", border: "3px solid #00020f", boxShadow: "0 0 12px rgba(25,78,255,0.5)" }} />
              <p style={{ fontSize: 12, color: "#4d7cff", fontWeight: 700, letterSpacing: "0.08em", marginBottom: 4 }}>{m.year}</p>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.7)" }}>{m.event}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
