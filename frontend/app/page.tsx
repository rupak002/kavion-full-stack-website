"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Hero } from "@/components/sections/hero";
import { ProductCarousel } from "@/components/sections/product-carousel";
import { Stats } from "@/components/sections/stats";
import { api } from "@/lib/api";
import { ShieldCheck, CloudCog, Code2 } from "lucide-react";

const icons = {
  ShieldCheck,
  CloudCog,
  Code2,
} as const;

export default function HomePage() {
  const { data: products } = useQuery({
    queryKey: ["products", "home"],
    queryFn: async () => (await api.get("/products?published=true")).data.data,
  });

  const { data: services } = useQuery({
    queryKey: ["services"],
    queryFn: async () => (await api.get("/services")).data.data,
  });

  return (
    <>
      <Hero />
      <ProductCarousel products={products || []} />
      <section className="container-shell py-8">
        <h2 className="mb-5 text-2xl font-bold">Core Services</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {(services || []).slice(0, 6).map((service: { id: string; title: string; description: string; icon?: keyof typeof icons }) => {
            const Icon = (service.icon && icons[service.icon]) || ShieldCheck;
            return (
              <article key={service.id} className="glass rounded-2xl p-5 transition hover:-translate-y-1 hover:border-cyan-400/60">
                <Icon className="mb-3 text-cyan-300" />
                <h3 className="text-lg font-bold">{service.title}</h3>
                <p className="mt-1 text-sm text-slate-300">{service.description}</p>
              </article>
            );
          })}
        </div>
      </section>
      <Stats />
      <section className="container-shell py-8">
        <div className="rounded-2xl border border-cyan-400/30 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 p-8">
          <h3 className="text-2xl font-black">Ready for a secure digital growth stack?</h3>
          <p className="mt-2 text-slate-300">Book a discovery call with KAVION and receive your baseline risk map.</p>
          <Link href="/contact" className="mt-5 inline-block rounded-full bg-cyan-400 px-6 py-3 text-sm font-bold text-slate-950">
            Start Now
          </Link>
        </div>
      </section>
    </>
  );
}
