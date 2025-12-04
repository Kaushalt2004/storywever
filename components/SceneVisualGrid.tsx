"use client";

import type { StoryScene } from "@/types/story";

const palettes = [
  {
    gradient: "from-[#0f172a] via-[#1e1b4b] to-[#312e81]",
    accents: ["#f472b6", "#c084fc", "#fbbf24"],
  },
  {
    gradient: "from-[#022c43] via-[#053f5e] to-[#115173]",
    accents: ["#70d6ff", "#ff9770", "#ffd670"],
  },
  {
    gradient: "from-[#0f0f0f] via-[#2a2a2a] to-[#434343]",
    accents: ["#ff6b6b", "#feca57", "#48dbfb"],
  },
];

const hashPrompt = (text: string) =>
  text.split("").reduce((hash, char) => (hash * 31 + char.charCodeAt(0)) % 9973, 7);

const orbit = (seed: number, range: number) => ((seed % range) / range) * 100;

const shimmerClass =
  "absolute inset-0 opacity-0 transition group-hover:opacity-60 bg-gradient-to-br from-white/20 via-transparent to-transparent";

type SceneVisualGridProps = {
  scenes: StoryScene[];
};

export function SceneVisualGrid({ scenes }: SceneVisualGridProps) {
  if (scenes.length === 0) {
    return null;
  }

  return (
    <section className="space-y-3 rounded-3xl border border-white/10 bg-white/5 p-6">
      <header>
        <p className="text-xs uppercase tracking-[0.4em] text-pink-200">Story Visuals</p>
        <h3 className="text-2xl font-semibold text-white">React-generated mood boards</h3>
        <p className="text-sm text-slate-200">
          Each card blends gradients, orbit paths, and glyphs derived from your scene prompt—no external AI calls required.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        {scenes.map((scene, index) => {
          const palette = palettes[index % palettes.length];
          const seed = hashPrompt(scene.prompt + scene.id);
          const radiusOne = 30 + (seed % 20);
          const radiusTwo = 20 + ((seed >> 2) % 15);
          const orbitA = orbit(seed, 37);
          const orbitB = orbit(seed >> 1, 61);

          return (
            <article
              key={scene.id}
              className={`group overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br ${palette.gradient} p-5 text-white shadow-2xl transition hover:-translate-y-1 hover:shadow-pink-500/30`}
            >
              <div className="relative">
                <svg viewBox="0 0 320 180" className="h-44 w-full">
                  <defs>
                    <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="12" result="blur" />
                    </filter>
                  </defs>
                  <rect width="320" height="180" fill="transparent" />
                  <circle cx="160" cy="90" r={radiusOne} fill={palette.accents[0]} opacity="0.35" filter="url(#softGlow)" />
                  <circle cx={80 + orbitA} cy="60" r={radiusTwo} fill={palette.accents[1]} opacity="0.5" />
                  <circle cx={200 - orbitB / 2} cy="120" r={radiusTwo / 1.5} fill={palette.accents[2]} opacity="0.4" />
                  <path
                    d={`M ${40 + orbitB} 140 Q 160 ${40 + orbitA}, ${280 - orbitA} 50`}
                    stroke={palette.accents[0]}
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.5"
                  />
                  <text x="20" y="30" fill="#ffffff90" fontSize="12" letterSpacing="4">
                    {scene.prompt.slice(0, 18).toUpperCase()}
                  </text>
                </svg>
                <div className={shimmerClass} />
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-xs uppercase tracking-[0.3em] text-white/70">
                  {new Date(scene.createdAt).toLocaleString()}
                </p>
                <p className="text-lg font-semibold">{scene.prompt}</p>
                <p className="text-sm text-white/80 line-clamp-3">{scene.content}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default SceneVisualGrid;
