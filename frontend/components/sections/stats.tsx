"use client";

import { motion } from "framer-motion";

const stats = [
  { label: "Clients Served", value: "160+" },
  { label: "Projects Completed", value: "420+" },
  { label: "Avg. Uptime", value: "99.98%" },
  { label: "Security Audits", value: "1000+" },
];

export function Stats() {
  return (
    <section className="container-shell grid gap-4 py-8 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s, i) => (
        <motion.article
          key={s.label}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="glass rounded-2xl p-5"
        >
          <p className="text-2xl font-black text-cyan-300">{s.value}</p>
          <p className="mt-1 text-sm text-slate-300">{s.label}</p>
        </motion.article>
      ))}
    </section>
  );
}
