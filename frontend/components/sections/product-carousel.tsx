"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useEffect } from "react";
import Image from "next/image";

type Product = {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
};

export function ProductCarousel({ products }: { products: Product[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  useEffect(() => {
    if (!emblaApi) return;
    const t = setInterval(() => emblaApi.scrollNext(), 2500);
    return () => clearInterval(t);
  }, [emblaApi]);

  return (
    <section className="container-shell py-8">
      <h2 className="mb-4 text-2xl font-bold">Featured Products</h2>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {products.map((p) => (
            <article key={p.id} className="glass min-w-[290px] flex-[0_0_290px] rounded-2xl p-4">
              {p.imageUrl ? (
                <Image
                  src={p.imageUrl}
                  alt={p.name}
                  width={480}
                  height={260}
                  unoptimized
                  className="h-40 w-full rounded-xl object-cover"
                />
              ) : null}
              <h3 className="mt-3 text-lg font-bold">{p.name}</h3>
              <p className="mt-1 text-sm text-slate-300">{p.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
