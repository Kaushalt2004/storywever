import { backgroundPlates } from "@/data/clocktowerPack";

export function BackgroundShowcase() {
  return (
    <section className="space-y-3 rounded-3xl border border-white/10 bg-white/5 p-6 text-white">
      <header>
        <p className="text-xs uppercase tracking-[0.4em] text-pink-200">Backdrops</p>
        <h3 className="text-2xl font-semibold">Scene Background Library</h3>
        <p className="text-sm text-slate-200">
          Hover to preview lighting palettes before you paint the full environment.
        </p>
      </header>
      <div className="grid gap-4 md:grid-cols-3">
        {backgroundPlates.map((plate) => (
          <article
            key={plate.name}
            className={`${plate.palette} rounded-3xl p-4 text-white shadow-xl transition hover:-translate-y-1 hover:shadow-pink-400/40`}
          >
            <p className="text-xs uppercase tracking-[0.4em] text-white/70">{plate.name}</p>
            <p className="mt-2 text-sm text-white/90">{plate.description}</p>
            <div className="mt-4 h-20 rounded-2xl border border-white/20 bg-white/10" />
          </article>
        ))}
      </div>
    </section>
  );
}

export default BackgroundShowcase;
