"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useParams } from "next/navigation";

export default function BlogDetail() {
  const params = useParams<{ slug: string }>();

  const { data } = useQuery({
    queryKey: ["blog", params.slug],
    queryFn: async () => (await api.get(`/blogs/${params.slug}`)).data.data,
    enabled: !!params.slug,
  });

  if (!data) return <section className="container-shell py-14">Loading blog...</section>;

  return (
    <article className="container-shell py-14">
      <h1 className="text-4xl font-black">{data.title}</h1>
      <p className="mt-3 text-sm text-slate-400">
        {new Date(data.createdAt).toLocaleDateString()} • {data.author}
      </p>
      <div className="mt-8 leading-8 text-slate-200" dangerouslySetInnerHTML={{ __html: data.content }} />
    </article>
  );
}
