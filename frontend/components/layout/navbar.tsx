"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/blogs", label: "Blogs" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact Us" },
];

const serviceColumns = {
  "Web Development": ["Frontend Dev", "Backend Dev", "Infrastructure as a Service", "Server Management"],
  "UI/UX Design": ["Web Design", "Application Design", "UX Research"],
  "Digital Marketing": ["SEO", "Branding", "Logos"],
  Testing: ["VAPT", "WAPT", "API PT", "Secure Code Review"],
  "Cloud Infrastructure": ["Cloud Security", "AWS", "GCP", "Azure"],
};

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const user = useAuthStore((s) => s.user);
  const hydrate = useAuthStore((s) => s.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <header className="sticky top-0 z-50 border-b border-[#2a3040]/60 bg-[#0a0d15]/80 backdrop-blur-xl">
      <div className="container-shell relative flex items-center justify-between py-4">
        <Link href="/" className="text-lg font-extrabold tracking-[0.2em] text-cyan-300">
          KAVION
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-[#dbe3ff] lg:flex">
          {nav.map((item) => (
            <div key={item.href} className="relative">
              {item.label === "Services" ? (
                <button onMouseEnter={() => setMenu(true)} onMouseLeave={() => setMenu(false)} className="cursor-pointer hover:text-cyan-300">
                  Services
                </button>
              ) : (
                <Link href={item.href} className="hover:text-cyan-300">
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {user?.role === "admin" && (
            <Link href="/admin" className="rounded-full border border-cyan-400/50 px-4 py-2 text-xs text-cyan-200">
              Admin
            </Link>
          )}
          <Link href="/signup" className="rounded-full border border-[#2a3040] px-4 py-2 text-xs text-slate-200">
            Signup
          </Link>
          <Link href="/login" className="rounded-full bg-cyan-400 px-4 py-2 text-xs font-bold text-slate-950">
            Login
          </Link>
        </div>

        <button className="lg:hidden" onClick={() => setOpen((v) => !v)}>
          {open ? <X /> : <Menu />}
        </button>

        <AnimatePresence>
          {menu && (
            <motion.div
              onMouseEnter={() => setMenu(true)}
              onMouseLeave={() => setMenu(false)}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="glass absolute top-14 left-1/2 hidden w-[880px] -translate-x-1/2 rounded-2xl p-6 lg:grid lg:grid-cols-5 lg:gap-4"
            >
              {Object.entries(serviceColumns).map(([title, items]) => (
                <div key={title}>
                  <h4 className="mb-3 text-xs font-bold uppercase text-cyan-300">{title}</h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }} className="glass border-t border-[#2a3040] lg:hidden">
            <div className="container-shell flex flex-col gap-4 py-6">
              {nav.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="text-sm text-slate-200">
                  {item.label}
                </Link>
              ))}
              <div className="flex gap-2">
                <Link href="/signup" className="rounded-full border border-[#2a3040] px-4 py-2 text-xs">
                  Signup
                </Link>
                <Link href="/login" className="rounded-full bg-cyan-400 px-4 py-2 text-xs font-bold text-slate-950">
                  Login
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
