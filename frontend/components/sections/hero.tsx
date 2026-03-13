"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function Hero() {
  return (
    <section className="container-shell relative overflow-hidden pt-16 pb-14 md:pt-24">
      <div className="absolute inset-0 -z-10 rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 via-transparent to-emerald-400/10" />
      <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-4 font-mono text-xs tracking-[0.2em] text-cyan-300">
        PREMIUM CYBERSECURITY + IT SERVICES
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="max-w-4xl text-4xl font-black leading-tight md:text-6xl"
      >
        Hardening digital infrastructure for teams that cannot afford downtime.
      </motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-6 max-w-2xl text-base text-slate-300 md:text-lg">
        KAVION delivers secure engineering, cloud operations, and growth systems through a premium execution model.
      </motion.p>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-8 flex flex-wrap gap-3">
        <Link href="/services" className="rounded-full bg-cyan-400 px-6 py-3 text-sm font-bold text-slate-950">
          Explore Services
        </Link>
        <Link href="/contact" className="rounded-full border border-[#2a3040] px-6 py-3 text-sm text-slate-200">
          Contact Us
        </Link>
      </motion.div>
    </section>
  );
}
