"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useState } from "react";
import Image from "next/image";

export default function BlogsPage() {
  const [search, setSearch] = useState("");
  const { data: blogs } = useQuery({
    queryKey: ["blogs", search],
    queryFn: async () => (await api.get(`/blogs?published=true&search=${encodeURIComponent(search)}`)).data.data,
  });

  return (
    <section className="container-shell py-14">
      <h1 className="text-4xl font-black">Blogs</h1>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search blogs"
        className="mt-4 w-full max-w-md rounded-xl border border-[#2a3040] bg-[#111319] px-4 py-3 text-sm outline-none"
      />
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {(blogs || []).map((b: { id: string; title: string; excerpt?: string; thumbnail?: string; slug: string; createdAt: string; author: string }) => (
          <article key={b.id} className="glass rounded-2xl p-4">
            {b.thumbnail ? (
              <Image src={b.thumbnail} alt={b.title} width={560} height={320} unoptimized className="h-44 w-full rounded-xl object-cover" />
            ) : null}
            <h3 className="mt-3 text-lg font-bold">{b.title}</h3>
            <p className="mt-1 text-sm text-slate-300">{b.excerpt || "Read our latest insight from KAVION team."}</p>
            <p className="mt-2 text-xs text-slate-400">{new Date(b.createdAt).toLocaleDateString()} • {b.author}</p>
            <Link href={`/blogs/${b.slug}`} className="mt-3 inline-block text-sm font-semibold text-cyan-300">
              Read post →
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
