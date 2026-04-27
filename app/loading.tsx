export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-[300] grid place-items-center overflow-hidden bg-slate-950"
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(30,41,59,0.55),transparent_58%)]" />

      <div className="relative w-[min(90vw,480px)] rounded-2xl border border-slate-700/60 bg-slate-900/70 p-8 text-center shadow-2xl backdrop-blur-sm">
        <div className="relative mx-auto mb-5 grid h-20 w-20 place-items-center">
          <span className="absolute inset-0 rounded-full border border-slate-600/65" />
          <span className="absolute inset-[3px] rounded-full border-2 border-transparent border-t-slate-300 border-r-slate-400/80 animate-spin" />
          <div className="grid h-16 w-16 place-items-center rounded-full border border-slate-600/70 bg-slate-900">
            <span className="font-pd text-lg tracking-wide text-slate-100">AK</span>
          </div>
        </div>

        <p className="mb-2 text-[11px] uppercase tracking-[0.28em] text-slate-300">Portfolio</p>
        <h2 className="font-pd text-2xl text-slate-100">Preparing content</h2>
        <p className="mt-2 text-sm text-slate-400">Please wait a moment.</p>

      </div>
    </div>
  );
}
