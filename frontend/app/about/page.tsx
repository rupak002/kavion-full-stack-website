import { CheckCircle2 } from "lucide-react";

const values = ["Security-first engineering", "Transparent delivery", "Outcome-driven partnerships", "Continuous improvement"];

export default function AboutPage() {
  return (
    <section className="container-shell py-14">
      <h1 className="text-4xl font-black">About KAVION</h1>
      <p className="mt-4 max-w-3xl text-slate-300">
        We build resilient digital systems through cybersecurity, cloud architecture, and software delivery excellence.
      </p>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <article className="glass rounded-2xl p-6">
          <h2 className="text-2xl font-bold">Mission</h2>
          <p className="mt-2 text-sm text-slate-300">Protect and accelerate organizations by blending strategic security with engineering speed.</p>
        </article>
        <article className="glass rounded-2xl p-6">
          <h2 className="text-2xl font-bold">Vision</h2>
          <p className="mt-2 text-sm text-slate-300">Become the most trusted partner for premium digital transformation in growth-focused teams.</p>
        </article>
      </div>
      <div className="mt-8 glass rounded-2xl p-6">
        <h2 className="text-2xl font-bold">Why Choose Us</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {values.map((v) => (
            <p key={v} className="flex items-center gap-2 text-sm text-slate-300">
              <CheckCircle2 className="h-4 w-4 text-cyan-300" />
              {v}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
