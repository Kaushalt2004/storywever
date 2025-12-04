import { storyPlots } from "@/data/clocktowerPack";

export function StoryPlotGrid() {
  return (
    <section className="space-y-3 rounded-3xl border border-white/10 bg-white/5 p-6">
      <header className="flex flex-col gap-1">
        <p className="text-xs uppercase tracking-[0.4em] text-pink-200">Storylines</p>
        <h3 className="text-2xl font-semibold text-white">Clocktower Plots</h3>
        <p className="text-sm text-slate-200">
          Drag a logline directly into your Scene Prompt to anchor tone and stakes.
        </p>
      </header>
      <div className="grid gap-4 md:grid-cols-3">
        {storyPlots.map((plot) => (
          <article
            key={plot.title}
            className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-4 text-white shadow-lg"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-pink-100">{plot.title}</p>
            <p className="mt-2 text-sm text-slate-100">{plot.logline}</p>
            <div className="mt-4 rounded-2xl bg-white/5 p-3 text-xs text-slate-200">
              <p className="uppercase tracking-[0.3em] text-white/70">Escalation</p>
              <p className="mt-1 text-sm">{plot.escalation}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default StoryPlotGrid;
