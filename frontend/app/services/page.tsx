"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export default function ServicesPage() {
  const { data: services, isLoading } = useQuery({
    queryKey: ["services", "all"],
    queryFn: async () => (await api.get("/services")).data.data,
  });

  return (
    <section className="container-shell py-14">
      <h1 className="text-4xl font-black">Services</h1>
      <p className="mt-2 text-slate-300">Comprehensive security, cloud, design, and engineering capabilities.</p>
      {isLoading ? <p className="mt-8 text-slate-400">Loading services...</p> : null}
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {(services || []).map((s: { id: string; title: string; description: string; subServices?: string[] }) => (
          <article key={s.id} className="glass rounded-2xl p-5 transition hover:border-cyan-400/60">
            <h3 className="text-xl font-bold">{s.title}</h3>
            <p className="mt-2 text-sm text-slate-300">{s.description}</p>
            <p className="mt-3 text-xs text-slate-400">{(s.subServices || []).slice(0, 3).join(" • ")}</p>
            <Link href={`/services/${s.id}`} className="mt-4 inline-block text-sm font-semibold text-cyan-300">
              View details →
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
