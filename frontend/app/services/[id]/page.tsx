"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ServiceDetail() {
  const params = useParams<{ id: string }>();

  const { data } = useQuery({
    queryKey: ["services", params.id],
    queryFn: async () => (await api.get(`/services/${params.id}`)).data.data,
    enabled: !!params.id,
  });

  if (!data) return <section className="container-shell py-14">Loading service...</section>;

  return (
    <section className="container-shell py-14">
      <h1 className="text-4xl font-black">{data.title}</h1>
      <p className="mt-3 max-w-3xl text-slate-300">{data.description}</p>
      <h2 className="mt-8 text-xl font-bold">What&apos;s Included</h2>
      <ul className="mt-3 grid gap-2 md:grid-cols-2">
        {(data.subServices || []).map((item: string) => (
          <li key={item} className="glass rounded-xl px-4 py-3 text-sm text-slate-200">
            {item}
          </li>
        ))}
      </ul>
      <Link href="/contact" className="mt-8 inline-block rounded-full bg-cyan-400 px-5 py-2 text-sm font-bold text-slate-950">
        Talk to an Expert
      </Link>
    </section>
  );
}
