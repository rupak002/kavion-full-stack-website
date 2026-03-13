export function Footer() {
  return (
    <footer className="mt-16 border-t border-[#2a3040] bg-[#090d16]/70">
      <div className="container-shell flex flex-col items-center justify-between gap-4 py-8 text-sm text-slate-400 md:flex-row">
        <p>© {new Date().getFullYear()} KAVION. Build secure. Scale smart.</p>
        <p className="font-mono text-xs text-cyan-300">Cybersecurity | Cloud | Engineering</p>
      </div>
    </footer>
  );
}
