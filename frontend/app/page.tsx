"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Hero } from "@/components/sections/hero";
import { api } from "@/lib/api";
import {
  ShieldCheck, CloudCog, Code2, BarChart3, Globe, Lock,
  ArrowRight, Users, Star, Zap, CheckCircle,
} from "lucide-react";

const icons: Record<string, React.ElementType> = { ShieldCheck, CloudCog, Code2, BarChart3, Globe, Lock };

const stats = [
  { value: "200+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "50+", label: "Expert Engineers" },
  { value: "24/7", label: "Support Coverage" },
];

const defaultServices = [
  { id: "1", title: "Cybersecurity", description: "VAPT, penetration testing, and threat modeling for modern infrastructure.", icon: "ShieldCheck" },
  { id: "2", title: "Cloud Infrastructure", description: "AWS, GCP, Azure architecture and migration with zero-downtime guarantee.", icon: "CloudCog" },
  { id: "3", title: "Web Engineering", description: "Full-stack development with React, Next.js, and Node.js ecosystems.", icon: "Code2" },
  { id: "4", title: "Digital Marketing", description: "SEO, content strategy, and brand positioning that drives growth.", icon: "BarChart3" },
  { id: "5", title: "UI/UX Design", description: "Conversion-focused design systems built for scale and accessibility.", icon: "Globe" },
  { id: "6", title: "Compliance & Audit", description: "ISO 27001, SOC 2, and GDPR compliance preparation and auditing.", icon: "Lock" },
];

const testimonials = [
  { name: "Sarah Chen", role: "CTO, FinScale", text: "KAVION transformed our security posture. Zero breaches in 18 months since we engaged them.", avatar: "SC" },
  { name: "Marcus Rivera", role: "Founder, LaunchPad", text: "The cloud migration was flawless. Performance up 3x, costs down 40%. Exceptional team.", avatar: "MR" },
  { name: "Priya Patel", role: "Head of Engineering, NexaCloud", text: "Their engineering team delivered in half the time we estimated. Quality is unmatched.", avatar: "PP" },
];

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay },
});

export default function HomePage() {
  const { data: services } = useQuery({
    queryKey: ["services"],
    queryFn: async () => (await api.get("/services")).data.data,
  });

  const displayServices = (services && services.length > 0 ? services : defaultServices).slice(0, 6);

  return (
    <>
      <Hero />

      {/* Stats bar */}
      <div style={{ background: "rgba(25,78,255,0.06)", borderTop: "1px solid rgba(25,78,255,0.12)", borderBottom: "1px solid rgba(25,78,255,0.12)" }}>
        <div className="shell" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0 }}>
          {stats.map((s, i) => (
            <motion.div key={s.label} {...fadeIn(i * 0.08)} style={{
              padding: "28px 24px", textAlign: "center",
              borderRight: i < 3 ? "1px solid rgba(25,78,255,0.1)" : "none",
            }}>
              <p style={{ fontSize: "clamp(26px,4vw,38px)", fontWeight: 900, fontFamily: "Inter Tight, sans-serif", background: "linear-gradient(135deg,#fff,#4d7cff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.value}</p>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 4, fontWeight: 500 }}>{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Services */}
      <section className="section shell">
        <motion.div {...fadeIn()} style={{ marginBottom: 52, maxWidth: 560 }}>
          <span className="badge" style={{ marginBottom: 16 }}>
            <Zap size={10} /> What We Do
          </span>
          <h2 style={{ fontSize: "clamp(30px,4vw,48px)", marginBottom: 16 }}>
            Premium services, <span className="text-grad">tailored for growth</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 15, lineHeight: 1.7 }}>
            From zero-day protection to landing page excellence — KAVION covers every layer of your digital stack.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px,1fr))", gap: 20 }}>
          {displayServices.map((svc: { id: string; title: string; description: string; icon?: string }, i: number) => {
            const Icon = (svc.icon && icons[svc.icon]) || ShieldCheck;
            return (
              <motion.article key={svc.id} {...fadeIn(i * 0.07)} className="grad-border" style={{ padding: 28, cursor: "pointer", transition: "transform 0.2s" }}
                whileHover={{ y: -4 }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 12, marginBottom: 18,
                  background: "rgba(25,78,255,0.15)", border: "1px solid rgba(25,78,255,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Icon size={20} color="#4d7cff" />
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8, fontFamily: "Inter Tight, sans-serif" }}>{svc.title}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.65 }}>{svc.description}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 20, fontSize: 12, color: "#4d7cff", fontWeight: 600 }}>
                  Learn more <ArrowRight size={12} />
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div {...fadeIn(0.3)} style={{ textAlign: "center", marginTop: 44 }}>
          <Link href="/services" style={{
            display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 28px",
            borderRadius: 100, fontSize: 13, fontWeight: 700,
            border: "1px solid rgba(25,78,255,0.35)", color: "#4d7cff",
            transition: "all 0.2s",
          }}>
            View All Services <ArrowRight size={14} />
          </Link>
        </motion.div>
      </section>

      {/* Why Choose Us */}
      <section className="section" style={{ background: "rgba(25,78,255,0.04)", borderTop: "1px solid rgba(25,78,255,0.08)", borderBottom: "1px solid rgba(25,78,255,0.08)" }}>
        <div className="shell" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <motion.div {...fadeIn()}>
            <span className="badge" style={{ marginBottom: 16 }}>
              <Star size={10} /> Why KAVION
            </span>
            <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", marginBottom: 24 }}>
              The execution standard you deserved all along
            </h2>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 15, lineHeight: 1.75, marginBottom: 32 }}>
              We don&apos;t sell you a retainer and disappear. KAVION embeds with your team, ships fast, and holds the line on quality — every sprint.
            </p>
            {[
              "Dedicated senior engineers on every project",
              "Weekly transparency reports + live dashboards",
              "SLA-backed delivery with penalty clauses",
              "On-call incident response within 15 minutes",
            ].map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <CheckCircle size={16} color="#4d7cff" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: 14, color: "rgba(255,255,255,0.7)" }}>{item}</span>
              </div>
            ))}
            <Link href="/about" style={{
              display: "inline-flex", alignItems: "center", gap: 8, marginTop: 28, padding: "12px 26px",
              borderRadius: 100, fontSize: 13, fontWeight: 700,
              background: "linear-gradient(135deg,#194eff,#4d7cff)", color: "#fff",
              boxShadow: "0 0 28px rgba(25,78,255,0.3)",
            }}>
              About KAVION <ArrowRight size={14} />
            </Link>
          </motion.div>

          <motion.div {...fadeIn(0.15)} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { icon: <ShieldCheck size={22} color="#4d7cff" />, title: "Zero Breaches", sub: "18-month track record" },
              { icon: <Zap size={22} color="#4d7cff" />, title: "Fast Delivery", sub: "Avg 3-day sprint" },
              { icon: <Users size={22} color="#4d7cff" />, title: "Expert Team", sub: "50+ certified pros" },
              { icon: <Star size={22} color="#4d7cff" />, title: "5-Star Rating", sub: "Across 200+ projects" },
            ].map((card) => (
              <div key={card.title} className="grad-border" style={{ padding: "24px 20px", textAlign: "center" }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 12, width: 44, height: 44, borderRadius: 12, background: "rgba(25,78,255,0.12)", alignItems: "center", margin: "0 auto 12px" }}>{card.icon}</div>
                <p style={{ fontSize: 15, fontWeight: 700, fontFamily: "Inter Tight, sans-serif", marginBottom: 4 }}>{card.title}</p>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{card.sub}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section shell">
        <motion.div {...fadeIn()} style={{ marginBottom: 48, textAlign: "center" }}>
          <span className="badge" style={{ marginBottom: 16 }}>
            <Star size={10} /> Client Stories
          </span>
          <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)" }}>
            Trusted by <span className="text-grad">industry leaders</span>
          </h2>
        </motion.div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 20 }}>
          {testimonials.map((t, i) => (
            <motion.div key={t.name} {...fadeIn(i * 0.1)} className="grad-border" style={{ padding: 28 }}>
              <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
                {Array(5).fill(0).map((_, j) => <Star key={j} size={13} color="#4d7cff" fill="#4d7cff" />)}
              </div>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: 20 }}>&ldquo;{t.text}&rdquo;</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#194eff,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#fff" }}>{t.avatar}</div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700 }}>{t.name}</p>
                  <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section shell">
        <motion.div
          {...fadeIn()}
          style={{
            position: "relative", borderRadius: 24, overflow: "hidden", padding: "72px 56px", textAlign: "center",
            background: "linear-gradient(145deg, #0e1230, #0a0c1e)",
            border: "1px solid rgba(25,78,255,0.25)",
          }}
        >
          <div className="glow-blob" style={{ width: 500, height: 500, top: "50%", left: "50%", transform: "translate(-50%,-50%)", background: "rgba(25,78,255,0.12)", zIndex: 0 }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <span className="badge" style={{ marginBottom: 20 }}>
              <Zap size={10} /> Start Today
            </span>
            <h2 style={{ fontSize: "clamp(28px,4vw,52px)", marginBottom: 16 }}>
              Ready to build something <span className="text-grad">extraordinary?</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 16, maxWidth: 480, margin: "0 auto 40px" }}>
              Book a 30-minute discovery call. We&apos;ll map your risk surface and build a roadmap — no obligation.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
              <Link href="/contact" style={{
                padding: "14px 32px", borderRadius: 100, fontSize: 14, fontWeight: 700,
                background: "linear-gradient(135deg,#194eff,#4d7cff)", color: "#fff",
                boxShadow: "0 0 40px rgba(25,78,255,0.4)",
              }}>
                Book Discovery Call
              </Link>
              <Link href="/services" style={{
                padding: "14px 32px", borderRadius: 100, fontSize: 14, fontWeight: 600,
                border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)",
              }}>
                View Services
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
