"use client";

import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Images } from "lucide-react";

const defaultGallery = [
  { id: "1", imageUrl: "", caption: "Team hackathon — 48 hours of building" },
  { id: "2", imageUrl: "", caption: "Cloud security workshop, SF office" },
  { id: "3", imageUrl: "", caption: "Client go-live — zero-downtime migration" },
  { id: "4", imageUrl: "", caption: "KAVION Design Sprint, Q2 2024" },
  { id: "5", imageUrl: "", caption: "Pentest red team exercise" },
  { id: "6", imageUrl: "", caption: "Engineering all-hands meeting" },
  { id: "7", imageUrl: "", caption: "SOC 2 certification celebration" },
  { id: "8", imageUrl: "", caption: "New York client summit" },
];

const gradients = [
  "linear-gradient(135deg, rgba(25,78,255,0.2), rgba(139,92,246,0.15))",
  "linear-gradient(135deg, rgba(139,92,246,0.2), rgba(25,78,255,0.15))",
  "linear-gradient(135deg, rgba(6,182,212,0.15), rgba(25,78,255,0.2))",
  "linear-gradient(135deg, rgba(16,185,129,0.15), rgba(25,78,255,0.15))",
];

export default function GalleryPage() {
  const { data } = useQuery({
    queryKey: ["gallery"],
    queryFn: async () => (await api.get("/gallery")).data.data,
  });

  const display = (data && data.length > 0 ? data : defaultGallery);

  return (
    <>
      {/* Header */}
      <section style={{ position: "relative", paddingTop: 80, paddingBottom: 60, overflow: "hidden", textAlign: "center" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(25,78,255,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div className="shell" style={{ position: "relative", zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="badge" style={{ marginBottom: 18 }}>
              <Images size={10} /> Gallery
            </span>
            <h1 style={{ fontSize: "clamp(36px,6vw,60px)", marginBottom: 16 }}>
              Life at <span className="text-grad">KAVION</span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 16, maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
              A glimpse behind the scenes — the people, moments, and milestones that define who we are.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Masonry gallery */}
      <section className="section shell">
        <div style={{ columns: "3 280px", gap: 20 }}>
          {display.map((img: { id: string; imageUrl: string; caption?: string }, i: number) => (
            <motion.figure
              key={img.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ scale: 1.02 }}
              className="grad-border"
              style={{ marginBottom: 20, breakInside: "avoid", overflow: "hidden", cursor: "pointer" }}
            >
              {img.imageUrl ? (
                <img src={img.imageUrl} alt={img.caption || "gallery"} style={{ width: "100%", display: "block", borderRadius: "18px 18px 0 0" }} />
              ) : (
                <div style={{ height: i % 3 === 0 ? 220 : i % 3 === 1 ? 160 : 190, background: gradients[i % 4], display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "18px 18px 0 0" }}>
                  <Images size={32} color="rgba(77,124,255,0.3)" />
                </div>
              )}
              <figcaption style={{ padding: "14px 18px", fontSize: 13, color: "rgba(255,255,255,0.45)" }}>
                {img.caption || "KAVION moments"}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>
    </>
  );
}
