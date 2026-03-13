import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-shell py-20 text-center">
      <h1 className="text-5xl font-black">404</h1>
      <p className="mt-3 text-slate-300">This page does not exist.</p>
      <Link href="/" className="mt-5 inline-block rounded-full bg-cyan-400 px-6 py-3 text-sm font-bold text-slate-950">
        Back to Home
      </Link>
    </section>
  );
}
