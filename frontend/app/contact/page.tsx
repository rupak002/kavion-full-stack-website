"use client";

import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { api, getErrorMessage } from "@/lib/api";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);

    try {
      await api.post("/contact", {
        name: form.get("name"),
        email: form.get("email"),
        phone: form.get("phone"),
        subject: form.get("subject"),
        message: form.get("message"),
      });
      toast.success("Message sent successfully");
      e.currentTarget.reset();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="container-shell py-14">
      <h1 className="text-4xl font-black">Contact Us</h1>
      <p className="mt-2 text-slate-300">Tell us your challenge and we&apos;ll propose a secure execution plan.</p>
      <form onSubmit={handleSubmit} className="glass mt-8 grid gap-3 rounded-2xl p-6 md:grid-cols-2">
        <input name="name" required placeholder="Name" className="rounded-xl border border-[#2a3040] bg-[#111319] px-4 py-3 text-sm outline-none" />
        <input name="email" required type="email" placeholder="Email" className="rounded-xl border border-[#2a3040] bg-[#111319] px-4 py-3 text-sm outline-none" />
        <input name="phone" placeholder="Phone" className="rounded-xl border border-[#2a3040] bg-[#111319] px-4 py-3 text-sm outline-none" />
        <input name="subject" required placeholder="Subject" className="rounded-xl border border-[#2a3040] bg-[#111319] px-4 py-3 text-sm outline-none" />
        <textarea name="message" required placeholder="Message" rows={6} className="rounded-xl border border-[#2a3040] bg-[#111319] px-4 py-3 text-sm outline-none md:col-span-2" />
        <button disabled={loading} className="rounded-full bg-cyan-400 px-6 py-3 text-sm font-bold text-slate-950 md:col-span-2">
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </section>
  );
}
