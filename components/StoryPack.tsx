import BackgroundShowcase from "@/components/BackgroundShowcase";
import CharacterFigures from "@/components/CharacterFigures";
import StoryPlotGrid from "@/components/StoryPlotGrid";
import {
  clocktowerCharacters,
  figures,
  pulsepointScene,
  styleRemixes,
  twistHook,
} from "@/data/clocktowerPack";

export function StoryPack() {
  return (
    <section className="mt-16 space-y-12 rounded-3xl border border-white/10 bg-slate-900/70 p-8 text-white shadow-2xl">
      <header>
        <p className="text-xs uppercase tracking-[0.4em] text-pink-300">Featured Pack</p>
        <h2 className="mt-2 text-3xl font-semibold">Clocktower Arc Toolkit</h2>
        <p className="mt-2 text-base text-slate-300">
          Drop-in beats, character sheets, twist hooks, stylistic remixes, and figure briefs to fast-track a
          cinematic continuation directly inside StoryWeaver.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl bg-white/5 p-6">
          <h3 className="text-xl font-semibold text-white">Scene 2 · “Pulsepoint”</h3>
          <ol className="mt-4 space-y-3 text-sm text-slate-100">
            {pulsepointScene.map((beat) => (
              <li key={beat.beat} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs uppercase tracking-[0.3em] text-pink-200">{beat.beat}</div>
                <p className="mt-1 text-base text-slate-50">{beat.detail}</p>
              </li>
            ))}
          </ol>
        </article>

        <article className="rounded-2xl bg-white/5 p-6">
          <h3 className="text-xl font-semibold text-white">Twist Hook</h3>
          <p className="mt-3 text-base text-slate-50">{twistHook.description}</p>
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
            <span className="text-xs uppercase tracking-[0.3em] text-amber-200">Coordinates</span>
            <p className="mt-1 font-mono text-white">00:00:00 — Meridian Vault</p>
          </div>
        </article>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {clocktowerCharacters.map((character) => (
          <article key={character.name} className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="text-xs uppercase tracking-[0.4em] text-slate-300">Character Sheet</div>
            <h3 className="mt-2 text-2xl font-semibold text-white">{character.name}</h3>
            <p className="text-sm text-pink-200">Age {character.age}</p>
            <p className="mt-4 text-sm uppercase tracking-[0.3em] text-slate-400">Traits</p>
            <p className="text-base text-slate-100">{character.traits.join(", ")}</p>
            <p className="mt-4 text-sm uppercase tracking-[0.3em] text-slate-400">Look</p>
            <p className="text-base text-slate-100">{character.look}</p>
            <p className="mt-4 text-sm uppercase tracking-[0.3em] text-slate-400">Motivations</p>
            <p className="text-base text-slate-100">{character.motivations}</p>
            <p className="mt-4 text-sm uppercase tracking-[0.3em] text-slate-400">Abilities</p>
            <p className="text-base text-slate-100">{character.abilities}</p>
            <p className="mt-4 text-sm uppercase tracking-[0.3em] text-slate-400">Arc</p>
            <p className="text-base text-slate-100">{character.arc}</p>
          </article>
        ))}
      </div>

      <CharacterFigures />

      <div>
        <h3 className="text-xl font-semibold text-white">Style Remix Buttons</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {styleRemixes.map((style) => (
            <button
              key={style.label}
              type="button"
              className="rounded-2xl border border-white/15 bg-white/5 p-4 text-left text-slate-100 transition hover:border-pink-300 hover:bg-white/10"
            >
              <div className="text-xs uppercase tracking-[0.3em] text-pink-200">{style.label}</div>
              <p className="mt-2 text-sm">{style.description}</p>
            </button>
          ))}
        </div>
        <p className="mt-3 text-xs text-slate-300">
          Tip: Click a remix card to inspire your next Scene Setting prompt in the generator panel.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-white">Figure Briefs</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {figures.map((figure) => (
            <div key={figure.title} className="rounded-2xl border border-dashed border-white/20 bg-transparent p-4">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{figure.title}</p>
              <p className="mt-2 text-base text-slate-100">{figure.description}</p>
            </div>
          ))}
        </div>
      </div>

      <StoryPlotGrid />

      <BackgroundShowcase />
    </section>
  );
}

export default StoryPack;
