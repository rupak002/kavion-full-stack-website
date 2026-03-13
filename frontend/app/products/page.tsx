"use client";

import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useMemo, useState } from "react";
import { Package, ArrowRight } from "lucide-react";

const defaultProducts = [
  { id: "1", name: "SecureShield Pro", description: "Enterprise endpoint protection with real-time threat intelligence and automated response.", price: 299, category: "Security", published: true },
  { id: "2", name: "CloudGuard Suite", description: "Multi-cloud security posture management with compliance dashboards.", price: 499, category: "Cloud", published: true },
  { id: "3", name: "PenTest Toolkit", description: "Automated and manual penetration testing tools for red teams.", price: 199, category: "Security", published: true },
  { id: "4", name: "DevSecOps Pipeline", description: "Shift-left security integration for CI/CD pipelines on GitHub Actions, GitLab, Jenkins.", price: 149, category: "Engineering", published: true },
  { id: "5", name: "Compliance Manager", description: "ISO 27001, SOC 2, GDPR tracking and evidence collection in one dashboard.", price: 399, category: "Compliance", published: true },
  { id: "6", name: "Threat Intelligence Feed", description: "Real-time threat data from 50+ sources, delivered via API to your SIEM.", price: 99, category: "Security", published: true },
];

export default function ProductsPage() {
  const [category, setCategory] = useState("all");
  const { data: products } = useQuery({
    queryKey: ["products", "all"],
    queryFn: async () => (await api.get("/products?published=true")).data.data,
  });

  const display = products && products.length > 0 ? products : defaultProducts;
  const categories = useMemo(() => ["all", ...Array.from(new Set(display.map((p: { category: string }) => p.category))) as string[]], [display]);
  const filtered = useMemo(() => display.filter((p: { category: string }) => category === "all" || p.category === category), [display, category]);

  return (
    <>
      {/* Header */}
      <section style={{ position: "relative", paddingTop: 80, paddingBottom: 60, overflow: "hidden", textAlign: "center" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(25,78,255,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div className="shell" style={{ position: "relative", zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="badge" style={{ marginBottom: 18 }}>
              <Package size={10} /> Products
            </span>
            <h1 style={{ fontSize: "clamp(36px,6vw,60px)", marginBottom: 16 }}>
              Tools built for <span className="text-grad">modern security teams</span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 16, maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
              Production-ready security and engineering tools — battle-tested by 200+ enterprise clients.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="section shell">
        {/* Category filters */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 40 }}>
          {categories.map((c) => (
            <button key={c} onClick={() => setCategory(c)} style={{
              padding: "7px 18px", borderRadius: 100, fontSize: 12, fontWeight: 600, cursor: "pointer", border: "none", fontFamily: "inherit",
              background: category === c ? "linear-gradient(135deg,#194eff,#4d7cff)" : "rgba(25,78,255,0.08)",
              border: `1px solid ${category === c ? "transparent" : "rgba(25,78,255,0.18)"}`,
              color: category === c ? "#fff" : "rgba(255,255,255,0.5)",
              transition: "all 0.2s",
            } as React.CSSProperties}>
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </button>
          ))}
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px,1fr))", gap: 20 }}>
          {filtered.map((p: { id: string; name: string; description: string; price?: number; category: string; imageUrl?: string }, i: number) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -4 }}
              className="grad-border"
              style={{ padding: 28, display: "flex", flexDirection: "column" }}
            >
              {p.imageUrl ? (
                <img src={p.imageUrl} alt={p.name} style={{ width: "100%", height: 180, objectFit: "cover", borderRadius: 12, marginBottom: 20 }} />
              ) : (
                <div style={{ height: 120, borderRadius: 12, marginBottom: 20, background: "linear-gradient(135deg, rgba(25,78,255,0.15), rgba(139,92,246,0.1))", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Package size={32} color="rgba(77,124,255,0.4)" />
                </div>
              )}
              <span style={{ padding: "3px 10px", borderRadius: 100, fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", background: "rgba(25,78,255,0.1)", border: "1px solid rgba(25,78,255,0.2)", color: "#4d7cff", width: "fit-content", marginBottom: 12 }}>
                {p.category}
              </span>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, fontFamily: "Inter Tight, sans-serif" }}>{p.name}</h3>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.65, flex: 1, marginBottom: 20 }}>{p.description}</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <p style={{ fontSize: 20, fontWeight: 800, fontFamily: "Inter Tight, sans-serif", background: "linear-gradient(135deg,#fff,#4d7cff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  {typeof p.price === "number" ? `$${p.price}/mo` : "Contact us"}
                </p>
                <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 100, fontSize: 12, fontWeight: 600, background: "rgba(25,78,255,0.12)", border: "1px solid rgba(25,78,255,0.2)", color: "#4d7cff", cursor: "pointer", fontFamily: "inherit" }}>
                  Get Started <ArrowRight size={12} />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </>
  );
}
