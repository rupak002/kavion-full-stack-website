"use client";

import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services", hasDropdown: true },
  { href: "/products", label: "Products" },
  { href: "/blogs", label: "Blogs" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

const serviceItems = [
  { label: "Cybersecurity", sub: ["VAPT", "WAPT", "API Pentest", "Secure Code Review"] },
  { label: "Cloud", sub: ["AWS", "GCP", "Azure", "Cloud Security"] },
  { label: "Engineering", sub: ["Frontend Dev", "Backend Dev", "Infrastructure"] },
  { label: "Design", sub: ["UI/UX", "Web Design", "Branding"] },
  { label: "Marketing", sub: ["SEO", "Content", "Logos"] },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const user = useAuthStore((s) => s.user);
  const hydrate = useAuthStore((s) => s.hydrate);

  useEffect(() => {
    hydrate();
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [hydrate]);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        transition: "all 0.3s",
        background: scrolled
          ? "rgba(0,2,15,0.85)"
          : "rgba(0,2,15,0.5)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: scrolled ? "1px solid rgba(25,78,255,0.15)" : "1px solid transparent",
      }}
    >
      <div className="shell" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 0" }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8,
            background: "linear-gradient(135deg, #194eff, #8b5cf6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, fontWeight: 900, color: "#fff", letterSpacing: 1,
            fontFamily: "Inter Tight, sans-serif",
          }}>K</div>
          <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: "0.12em", color: "#fff", fontFamily: "Inter Tight, sans-serif" }}>
            KAVION
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: 32 }} className="hidden lg:flex">
          {nav.map((item) =>
            item.hasDropdown ? (
              <div
                key={item.href}
                style={{ position: "relative" }}
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  className="nav-link"
                  style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}
                >
                  {item.label}
                  <ChevronDown size={13} style={{ transition: "transform 0.2s", transform: servicesOpen ? "rotate(180deg)" : "none" }} />
                </button>

                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.18 }}
                      style={{
                        position: "absolute",
                        top: "calc(100% + 16px)",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: 740,
                        background: "linear-gradient(145deg, #0e1230ee, #080b1aee)",
                        border: "1px solid rgba(25,78,255,0.2)",
                        borderRadius: 20,
                        padding: "28px 32px",
                        backdropFilter: "blur(20px)",
                        display: "grid",
                        gridTemplateColumns: "repeat(5, 1fr)",
                        gap: 20,
                      }}
                    >
                      {serviceItems.map((col) => (
                        <div key={col.label}>
                          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#4d7cff", marginBottom: 12 }}>
                            {col.label}
                          </p>
                          <ul style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                            {col.sub.map((s) => (
                              <li key={s}>
                                <Link href="/services" style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", transition: "color 0.2s" }}
                                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
                                >
                                  {s}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link key={item.href} href={item.href} className="nav-link">
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex" style={{ alignItems: "center", gap: 10 }}>
          {user?.role === "admin" && (
            <Link href="/admin" style={{
              padding: "8px 18px", borderRadius: 100, fontSize: 12, fontWeight: 600,
              border: "1px solid rgba(25,78,255,0.5)", color: "#4d7cff", transition: "all 0.2s",
            }}>
              Admin
            </Link>
          )}
          <Link href="/login" style={{
            padding: "8px 20px", borderRadius: 100, fontSize: 12, fontWeight: 600,
            border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.7)",
            transition: "all 0.2s",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
          >
            Log in
          </Link>
          <Link href="/contact" style={{
            padding: "8px 20px", borderRadius: 100, fontSize: 12, fontWeight: 700,
            background: "linear-gradient(135deg, #194eff, #4d7cff)",
            color: "#fff", transition: "opacity 0.2s",
          }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Get Started
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          style={{ background: "none", border: "none", cursor: "pointer", color: "#fff", padding: 4 }}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{ overflow: "hidden", borderTop: "1px solid rgba(25,78,255,0.15)", background: "rgba(0,2,15,0.95)" }}
          >
            <div className="shell" style={{ display: "flex", flexDirection: "column", gap: 4, padding: "20px 0 24px" }}>
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  style={{ padding: "10px 0", fontSize: 14, color: "rgba(255,255,255,0.7)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                >
                  {item.label}
                </Link>
              ))}
              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <Link href="/login" style={{ flex: 1, textAlign: "center", padding: "10px", borderRadius: 100, fontSize: 12, fontWeight: 600, border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }}>
                  Log in
                </Link>
                <Link href="/contact" style={{ flex: 1, textAlign: "center", padding: "10px", borderRadius: 100, fontSize: 12, fontWeight: 700, background: "linear-gradient(135deg,#194eff,#4d7cff)", color: "#fff" }}>
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
