"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useMemo, useState } from "react";
import Image from "next/image";

export default function ProductsPage() {
  const [category, setCategory] = useState("all");
  const { data: products } = useQuery({
    queryKey: ["products", "all"],
    queryFn: async () => (await api.get("/products?published=true")).data.data,
  });

  const categories = useMemo(() => ["all", ...new Set((products || []).map((p: { category: string }) => p.category))], [products]);
  const filtered = useMemo(
    () => (products || []).filter((p: { category: string }) => category === "all" || p.category === category),
    [products, category]
  );

  return (
    <section className="container-shell py-14">
      <h1 className="text-4xl font-black">Products</h1>
      <div className="mt-5 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button key={c} onClick={() => setCategory(c)} className={`rounded-full px-4 py-2 text-xs ${category === c ? "bg-cyan-400 text-slate-950" : "border border-[#2a3040] text-slate-200"}`}>
            {c}
          </button>
        ))}
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p: { id: string; name: string; description: string; imageUrl?: string; price?: number }) => (
          <article key={p.id} className="glass rounded-2xl p-4">
            {p.imageUrl ? (
              <Image src={p.imageUrl} alt={p.name} width={560} height={320} unoptimized className="h-44 w-full rounded-xl object-cover" />
            ) : null}
            <h3 className="mt-3 text-lg font-bold">{p.name}</h3>
            <p className="mt-1 text-sm text-slate-300">{p.description}</p>
            <p className="mt-3 text-cyan-300">{typeof p.price === "number" ? `$${p.price}` : "Contact for pricing"}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
