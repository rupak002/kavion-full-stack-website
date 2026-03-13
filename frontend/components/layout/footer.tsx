import Link from "next/link";
import { ShieldCheck, Mail, Phone, MapPin } from "lucide-react";

const cols = [
  {
    title: "Services",
    links: [
      { label: "Cybersecurity", href: "/services" },
      { label: "Cloud Infrastructure", href: "/services" },
      { label: "Web Engineering", href: "/services" },
      { label: "UI/UX Design", href: "/services" },
      { label: "Digital Marketing", href: "/services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Team", href: "/about" },
      { label: "Blog", href: "/blogs" },
      { label: "Gallery", href: "/gallery" },
      { label: "Careers", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/contact" },
      { label: "Terms of Service", href: "/contact" },
      { label: "Cookie Policy", href: "/contact" },
      { label: "Security Policy", href: "/contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid rgba(25,78,255,0.12)",
      background: "linear-gradient(180deg, transparent, rgba(10,12,30,0.6))",
      marginTop: 0,
    }}>
      {/* Main footer */}
      <div className="shell" style={{ padding: "72px 0 48px", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48 }}>
        {/* Brand col */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <div style={{
              width: 28, height: 28, borderRadius: 8,
              background: "linear-gradient(135deg, #194eff, #8b5cf6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 13, fontWeight: 900, color: "#fff",
              fontFamily: "Inter Tight, sans-serif",
            }}>K</div>
            <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: "0.12em", fontFamily: "Inter Tight, sans-serif" }}>KAVION</span>
          </div>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.75, marginBottom: 24, maxWidth: 280 }}>
            Enterprise-grade cybersecurity, cloud, and engineering for teams that cannot afford downtime.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { icon: <Mail size={13} />, text: "hello@kavion.com" },
              { icon: <Phone size={13} />, text: "+1 (555) 000-0000" },
              { icon: <MapPin size={13} />, text: "San Francisco, CA" },
            ].map((item) => (
              <div key={item.text} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "rgba(255,255,255,0.45)" }}>
                <span style={{ color: "#4d7cff" }}>{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>
        </div>

        {/* Link cols */}
        {cols.map((col) => (
          <div key={col.title}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 20 }}>
              {col.title}
            </p>
            <ul style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(25,78,255,0.08)" }}>
        <div className="shell" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 0", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
            © {new Date().getFullYear()} KAVION Inc. All rights reserved.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
            <ShieldCheck size={13} color="#4d7cff" />
            <span>ISO 27001 Compliant · SOC 2 Certified</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
