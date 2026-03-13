"use client";

import { FormEvent, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { api, getErrorMessage } from "@/lib/api";
import { useAuthStore } from "@/store/auth";

export default function AdminPage() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { user, token, hydrate } = useAuthStore();
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (!user) return;
    if (user.role !== "admin") router.push("/");
  }, [router, user]);

  const stats = useQuery({
    queryKey: ["admin", "stats"],
    enabled: !!token && user?.role === "admin",
    queryFn: async () =>
      (
        await api.get("/admin/stats", {
          headers: { Authorization: `Bearer ${token}` },
        })
      ).data.data,
  });

  async function addProduct(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!token) return;
    setCreating(true);
    const form = new FormData(e.currentTarget);

    try {
      await api.post(
        "/products",
        {
          name: form.get("name"),
          description: form.get("description"),
          category: form.get("category"),
          price: Number(form.get("price")),
          isPublished: true,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Product created");
      e.currentTarget.reset();
      queryClient.invalidateQueries({ queryKey: ["admin", "stats"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setCreating(false);
    }
  }

  if (!user) return <section className="container-shell py-14">Please login as admin.</section>;
  if (user.role !== "admin") return null;

  return (
    <section className="container-shell py-14">
      <h1 className="text-4xl font-black">Admin Dashboard</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-3 lg:grid-cols-5">
        {[
          ["Products", stats.data?.totalProducts || 0],
          ["Blogs", stats.data?.totalBlogs || 0],
          ["Gallery", stats.data?.totalGallery || 0],
          ["Contacts", stats.data?.totalContacts || 0],
          ["Users", stats.data?.totalUsers || 0],
        ].map(([label, value]) => (
          <article key={String(label)} className="glass rounded-2xl p-4">
            <p className="text-xs text-slate-400">{label}</p>
            <p className="mt-2 text-2xl font-black text-cyan-300">{value}</p>
          </article>
        ))}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <form onSubmit={addProduct} className="glass rounded-2xl p-6">
          <h2 className="text-xl font-bold">Add Product</h2>
          <div className="mt-4 space-y-3">
            <input name="name" required placeholder="Name" className="w-full rounded-xl border border-[#2a3040] bg-[#0d1018] px-4 py-3 text-sm" />
            <input name="category" required placeholder="Category" className="w-full rounded-xl border border-[#2a3040] bg-[#0d1018] px-4 py-3 text-sm" />
            <input name="price" required type="number" placeholder="Price" className="w-full rounded-xl border border-[#2a3040] bg-[#0d1018] px-4 py-3 text-sm" />
            <textarea name="description" required rows={4} placeholder="Description" className="w-full rounded-xl border border-[#2a3040] bg-[#0d1018] px-4 py-3 text-sm" />
            <button disabled={creating} className="rounded-full bg-cyan-400 px-6 py-3 text-sm font-bold text-slate-950">
              {creating ? "Saving..." : "Save Product"}
            </button>
          </div>
        </form>

        <div className="glass rounded-2xl p-6">
          <h2 className="text-xl font-bold">Recent Contact Messages</h2>
          <div className="mt-4 space-y-3">
            {(stats.data?.recentContacts || []).length === 0 ? (
              <p className="text-sm text-slate-400">No messages yet.</p>
            ) : (
              (stats.data?.recentContacts || []).map((m: { id: string; name: string; subject: string }) => (
                <div key={m.id} className="rounded-xl border border-[#2a3040] px-4 py-3 text-sm">
                  <p className="font-semibold">{m.name}</p>
                  <p className="text-slate-300">{m.subject}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
