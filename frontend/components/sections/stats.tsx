"use client";

import { motion } from "framer-motion";

const stats = [
  { label: "Projects Delivered", value: "200+" },
  { label: "Client Satisfaction", value: "98%" },
  { label: "Expert Engineers", value: "50+" },
  { label: "Support Coverage", value: "24/7" },
];

export function Stats() {
  return (
    <div style={{ background: "rgba(25,78,255,0.06)", borderTop: "1px solid rgba(25,78,255,0.12)", borderBottom: "1px solid rgba(25,78,255,0.12)" }}>
      <div className="shell" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0 }}>
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            style={{
              padding: "28px 24px", textAlign: "center",
              borderRight: i < 3 ? "1px solid rgba(25,78,255,0.1)" : "none",
            }}
          >
            <p style={{ fontSize: "clamp(26px,4vw,38px)", fontWeight: 900, fontFamily: "Inter Tight, sans-serif", background: "linear-gradient(135deg,#fff,#4d7cff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.value}</p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 4, fontWeight: 500 }}>{s.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
