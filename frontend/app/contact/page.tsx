"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { api, getErrorMessage } from "@/lib/api";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const inputStyle = {
  width: "100%", padding: "13px 16px", borderRadius: 12,
  background: "rgba(14,18,48,0.6)", border: "1px solid rgba(25,78,255,0.2)",
  color: "#fff", fontSize: 14, outline: "none", fontFamily: "inherit", transition: "border-color 0.2s",
};

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    try {
      await api.post("/contact", {
        name: form.get("name"), email: form.get("email"),
        phone: form.get("phone"), subject: form.get("subject"), message: form.get("message"),
      });
      toast.success("Message sent successfully!");
      e.currentTarget.reset();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="section shell">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ marginBottom: 52 }}>
        <span className="badge" style={{ marginBottom: 16 }}>
          <Mail size={10} /> Contact Us
        </span>
        <h1 style={{ fontSize: "clamp(32px,5vw,56px)", marginBottom: 14 }}>
          Let&apos;s build something <span className="text-grad">great together</span>
        </h1>
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 16, maxWidth: 520, lineHeight: 1.7 }}>
          Tell us your challenge. We&apos;ll map the solution and build a roadmap — usually within 24 hours.
        </p>
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 40, alignItems: "start" }}>
        {/* Info panel */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <div className="grad-border" style={{ padding: 32, marginBottom: 20 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 24, fontFamily: "Inter Tight, sans-serif" }}>Get in touch</h3>
            {[
              { icon: <Mail size={16} />, label: "Email", value: "hello@kavion.com" },
              { icon: <Phone size={16} />, label: "Phone", value: "+1 (555) 000-0000" },
              { icon: <MapPin size={16} />, label: "Office", value: "San Francisco, CA" },
            ].map((item) => (
              <div key={item.label} style={{ display: "flex", gap: 14, marginBottom: 20 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(25,78,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#4d7cff", flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div>
                  <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 2 }}>{item.label}</p>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.75)" }}>{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grad-border" style={{ padding: 28 }}>
            <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Office Hours</p>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>Monday – Friday: 9am – 6pm PST<br />Emergency support: 24/7</p>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.15 }} className="grad-border" style={{ padding: 36 }}>
          <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <input name="name" required placeholder="Full name" style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(25,78,255,0.6)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(25,78,255,0.2)")} />
            <input name="email" required type="email" placeholder="Email address" style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(25,78,255,0.6)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(25,78,255,0.2)")} />
            <input name="phone" placeholder="Phone (optional)" style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(25,78,255,0.6)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(25,78,255,0.2)")} />
            <input name="subject" required placeholder="Subject" style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(25,78,255,0.6)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(25,78,255,0.2)")} />
            <textarea name="message" required placeholder="Tell us about your project..." rows={5}
              style={{ ...inputStyle, gridColumn: "span 2", resize: "vertical" } as React.CSSProperties}
              onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(25,78,255,0.6)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(25,78,255,0.2)")} />
            <button disabled={loading} style={{
              gridColumn: "span 2", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              padding: "14px", borderRadius: 100, fontSize: 14, fontWeight: 700,
              background: loading ? "rgba(25,78,255,0.4)" : "linear-gradient(135deg,#194eff,#4d7cff)",
              color: "#fff", border: "none", cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "0 0 28px rgba(25,78,255,0.3)", fontFamily: "inherit",
            }}>
              {loading ? "Sending..." : <><Send size={15} /> Send Message</>}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
