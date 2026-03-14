"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { ShieldCheck, CloudCog, Code2, BarChart3, Globe, Lock, ArrowRight, Zap } from "lucide-react";

const icons: Record<string, React.ElementType> = { ShieldCheck, CloudCog, Code2, BarChart3, Globe, Lock };

const defaultServices = [
  { id: "1", title: "Cybersecurity", description: "Penetration testing, VAPT, threat modeling, and incident response for modern infrastructure.", icon: "ShieldCheck", subServices: ["Vulnerability Assessment and Penetration Testing", "Web Application Penetration Testing", "API Pentest","Cloud Penetration Testing","Network Penetration Testing","Mobile App Pentest","Endpoint Audit","SAST/DAST", "Secure Code Review"] },
  { id: "2", title: "Cloud Infrastructure", description: "AWS, GCP, Azure architecture, migration, and 24/7 cloud ops with zero-downtime SLAs.", icon: "CloudCog", subServices: ["AWS Architecture", "GCP Migration", "Azure DevOps", "Cloud Security"] },
  { id: "3", title: "Web Engineering", description: "Scalable full-stack development with React, Next.js, Node.js, and modern toolchains.", icon: "Code2", subServices: ["Frontend Development", "Backend Devlopment"] },
  { id: "4", title: "Digital Marketing", description: "SEO, content strategy, and conversion-focused campaigns that drive sustainable growth.", icon: "BarChart3", subServices: ["Technical SEO", "Logos","Branding"] },
  { id: "5", title: "UI/UX Design", description: "User-centered design systems that convert. Built for accessibility and scalability.", icon: "Globe", subServices: ["Web Design", "Application Design", "UX Research", "Content Design", "Visual Design"] },
  { id: "6", title: "Compliance & Audit", description: "ISO 27001, SOC 2, GDPR compliance preparation, gap analysis, and ongoing auditing.", icon: "Lock", subServices: ["ISO 27001", "SOC 2 Type II", "GDPR Compliance", "Security Audit", "Risk Assessment"] },
  { id: "7", title: "Infrastructure as a Service", description: "ISO 27001, SOC 2, GDPR compliance preparation, gap analysis, and ongoing auditing.", icon: "Lock", subServices: ["Endpoint", "Saas", "OS Hardening", "Server Management", "NAS/Sas","Firewall"] },
];

export default function ServicesPage() {
  const { data: services, isLoading } = useQuery({
    queryKey: ["services", "all"],
    queryFn: async () => (await api.get("/services")).data.data,
  });

  const display = (services && services.length > 0 ? services : defaultServices);

  return (
    <>
      {/* Header */}
      <section style={{ position: "relative", paddingTop: 80, paddingBottom: 80, textAlign: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(25,78,255,0.14) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div className="shell" style={{ position: "relative", zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="badge" style={{ marginBottom: 18 }}>
              <Zap size={10} /> Our Services
            </span>
            <h1 style={{ fontSize: "clamp(36px,6vw,64px)", marginBottom: 16 }}>
              Full-spectrum <span className="text-grad">digital services</span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 16, maxWidth: 540, margin: "0 auto", lineHeight: 1.7 }}>
              From zero-day protection to landing page excellence — KAVION covers every layer of your digital stack.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services grid */}
      <section className="section shell">
        {isLoading && <p style={{ color: "rgba(255,255,255,0.4)", textAlign: "center" }}>Loading services...</p>}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px,1fr))", gap: 24 }}>
          {display.map((s: { id: string; title: string; description: string; icon?: string; subServices?: string[] }, i: number) => {
            const Icon = (s.icon && icons[s.icon]) || ShieldCheck;
            return (
              <motion.article
                key={s.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                whileHover={{ y: -4 }}
                className="grad-border"
                style={{ padding: 32 }}
              >
                <div style={{ width: 48, height: 48, borderRadius: 14, marginBottom: 20, background: "rgba(25,78,255,0.12)", border: "1px solid rgba(25,78,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={22} color="#4d7cff" />
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10, fontFamily: "Inter Tight, sans-serif" }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, marginBottom: 20 }}>{s.description}</p>

                {s.subServices && s.subServices.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 24 }}>
                    {s.subServices.slice(0, 4).map((sub: string) => (
                      <span key={sub} style={{ padding: "3px 10px", borderRadius: 100, fontSize: 11, fontWeight: 500, background: "rgba(25,78,255,0.08)", border: "1px solid rgba(25,78,255,0.18)", color: "rgba(255,255,255,0.5)" }}>
                        {sub}
                      </span>
                    ))}
                  </div>
                )}

                <Link href={`/services/${s.id}`} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "#4d7cff" }}>
                  Learn more <ArrowRight size={13} />
                </Link>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="section shell">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grad-border"
          style={{ padding: "60px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}
        >
          <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "rgba(25,78,255,0.1)", filter: "blur(80px)", top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <h2 style={{ fontSize: "clamp(24px,4vw,40px)", marginBottom: 14 }}>Ready to get started?</h2>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 15, marginBottom: 32, maxWidth: 440, margin: "0 auto 32px" }}>
              Book a free 30-minute discovery call and we&apos;ll propose a custom execution plan.
            </p>
            <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 30px", borderRadius: 100, fontSize: 14, fontWeight: 700, background: "linear-gradient(135deg,#194eff,#4d7cff)", color: "#fff", boxShadow: "0 0 32px rgba(25,78,255,0.35)" }}>
              Book Discovery Call <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
