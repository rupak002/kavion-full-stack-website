"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import Image from "next/image";

export default function GalleryPage() {
  const { data } = useQuery({
    queryKey: ["gallery"],
    queryFn: async () => (await api.get("/gallery")).data.data,
  });

  return (
    <section className="container-shell py-14">
      <h1 className="text-4xl font-black">Gallery</h1>
      <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3">
        {(data || []).map((img: { id: string; imageUrl: string; caption?: string }) => (
          <figure key={img.id} className="glass mb-4 break-inside-avoid rounded-2xl p-3">
            <Image
              src={img.imageUrl}
              alt={img.caption || "gallery"}
              width={700}
              height={450}
              unoptimized
              className="w-full rounded-xl object-cover"
            />
            <figcaption className="mt-2 text-xs text-slate-300">{img.caption || "KAVION moments"}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
