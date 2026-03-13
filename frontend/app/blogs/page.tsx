"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useState } from "react";
import { Search, BookOpen, ArrowRight, Clock } from "lucide-react";

const defaultBlogs = [
  { id: "1", title: "Zero Trust Architecture: A Practical Guide for 2024", excerpt: "How to implement zero trust without disrupting your engineering velocity.", author: "Alex Morgan", createdAt: "2024-09-01", slug: "zero-trust-guide", category: "Security" },
  { id: "2", title: "The Hidden Cost of Cloud Misconfiguration", excerpt: "Most breaches in 2024 started with a misconfigured S3 bucket. Here's how to fix that.", author: "Jamie Lee", createdAt: "2024-08-15", slug: "cloud-misconfig", category: "Cloud" },
  { id: "3", title: "DevSecOps in Practice: Shifting Left Without the Pain", excerpt: "A practical walkthrough of embedding security into your CI/CD pipeline without slowing down releases.", author: "Chris Park", createdAt: "2024-07-20", slug: "devsecops-guide", category: "Engineering" },
  { id: "4", title: "SOC 2 Type II: What We Learned After Certification", excerpt: "Honest lessons from KAVION's SOC 2 journey — what took longer than expected and what was easier.", author: "Dana Kim", createdAt: "2024-06-10", slug: "soc2-learnings", category: "Compliance" },
  { id: "5", title: "Why Your Penetration Test Isn't Protecting You", excerpt: "Annual VAPT is outdated. Here's what modern continuous security testing looks like.", author: "Alex Morgan", createdAt: "2024-05-05", slug: "pentest-problems", category: "Security" },
  { id: "6", title: "Engineering for Scale: Lessons from 200+ Deployments", excerpt: "What we've learned deploying production systems for startups, scaleups, and Fortune 500s.", author: "Jamie Lee", createdAt: "2024-04-01", slug: "engineering-scale", category: "Engineering" },
];

export default function BlogsPage() {
  const [search, setSearch] = useState("");
  const { data: blogs } = useQuery({
    queryKey: ["blogs", search],
    queryFn: async () => (await api.get(`/blogs?published=true&search=${encodeURIComponent(search)}`)).data.data,
  });

  const display = (blogs && blogs.length > 0 ? blogs : defaultBlogs).filter((b: { title: string }) =>
    !search || b.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Header */}
      <section style={{ position: "relative", paddingTop: 80, paddingBottom: 60, overflow: "hidden", textAlign: "center" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(25,78,255,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div className="shell" style={{ position: "relative", zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="badge" style={{ marginBottom: 18 }}>
              <BookOpen size={10} /> Insights & Research
            </span>
            <h1 style={{ fontSize: "clamp(36px,6vw,60px)", marginBottom: 16 }}>
              The KAVION <span className="text-grad">knowledge hub</span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 16, maxWidth: 500, margin: "0 auto 32px", lineHeight: 1.7 }}>
              Security research, engineering insights, and practical guides from our team of experts.
            </p>
            {/* Search */}
            <div style={{ position: "relative", maxWidth: 400, margin: "0 auto" }}>
              <Search size={15} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.3)" }} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles..."
                style={{ width: "100%", padding: "12px 16px 12px 40px", borderRadius: 100, background: "rgba(14,18,48,0.6)", border: "1px solid rgba(25,78,255,0.2)", color: "#fff", fontSize: 14, outline: "none", fontFamily: "inherit" }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section className="section shell">
        {display.length === 0 ? (
          <p style={{ textAlign: "center", color: "rgba(255,255,255,0.35)", fontSize: 14 }}>No articles found.</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px,1fr))", gap: 24 }}>
            {display.map((b: { id: string; title: string; excerpt?: string; author: string; createdAt: string; slug: string; category?: string }, i: number) => (
              <motion.article key={b.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} whileHover={{ y: -4 }} className="grad-border" style={{ padding: 28, display: "flex", flexDirection: "column" }}>
                <div style={{ height: 120, borderRadius: 12, marginBottom: 20, background: "linear-gradient(135deg, rgba(25,78,255,0.12), rgba(139,92,246,0.08))", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <BookOpen size={28} color="rgba(77,124,255,0.35)" />
                </div>
                {b.category && (
                  <span style={{ padding: "3px 10px", borderRadius: 100, fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", background: "rgba(25,78,255,0.1)", border: "1px solid rgba(25,78,255,0.2)", color: "#4d7cff", width: "fit-content", marginBottom: 12 }}>
                    {b.category}
                  </span>
                )}
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10, fontFamily: "Inter Tight, sans-serif", lineHeight: 1.3 }}>{b.title}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.65, flex: 1, marginBottom: 18 }}>{b.excerpt || "Read our latest insight from the KAVION team."}</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "rgba(255,255,255,0.3)" }}>
                    <Clock size={11} />
                    {new Date(b.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} · {b.author}
                  </div>
                  <Link href={`/blogs/${b.slug}`} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, color: "#4d7cff" }}>
                    Read <ArrowRight size={12} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
