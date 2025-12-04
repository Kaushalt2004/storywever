import { clocktowerCharacters } from "@/data/clocktowerPack";

const palettes = [
  {
    background: "from-[#0b1120] via-[#1b1f3b] to-[#2c365e]",
    accent: "#f472b6",
    figure: "#f8fafc",
  },
  {
    background: "from-[#10121f] via-[#1b2a47] to-[#264d73]",
    accent: "#34d399",
    figure: "#f1f5f9",
  },
];

const limbStroke = "stroke-[3px] stroke-white/70";

export function CharacterFigures() {
  return (
    <section className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6">
      <header className="flex flex-col gap-1">
        <p className="text-xs uppercase tracking-[0.4em] text-pink-200">Interactive Figures</p>
        <h3 className="text-2xl font-semibold text-white">2D lineup</h3>
        <p className="text-sm text-slate-200">
          Hover each card to animate subtle parallax lighting. Designed to feel like concept boards for a pitch deck.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        {clocktowerCharacters.map((character, index) => {
          const palette = palettes[index % palettes.length];
          const gradientId = `figure-gradient-${index}`;
          return (
            <article
              key={character.name}
              className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${palette.background} p-5 shadow-2xl transition duration-500 hover:-translate-y-1 hover:shadow-pink-500/30`}
              aria-label={`Stylized figure illustration for ${character.name}`}
            >
              <svg viewBox="0 0 220 240" className="h-52 w-full">
                <defs>
                  <radialGradient id={gradientId} cx="50%" cy="30%" r="60%">
                    <stop offset="0%" stopColor={palette.accent} stopOpacity="0.8" />
                    <stop offset="100%" stopColor="transparent" />
                  </radialGradient>
                </defs>
                <rect
                  width="220"
                  height="240"
                  fill={`url(#${gradientId})`}
                  opacity="0.35"
                />
                <circle cx="110" cy="60" r="28" fill={palette.figure} className="drop-shadow" />
                <rect x="90" y="90" width="40" height="70" rx="18" fill={palette.figure} opacity="0.95" />
                <path d="M110 160 L140 210" className={limbStroke} />
                <path d="M110 160 L80 210" className={limbStroke} />
                <path d="M90 120 L50 150" className={limbStroke} />
                <path d="M130 120 L170 150" className={limbStroke} />
                <circle cx="110" cy="60" r="12" fill={palette.accent} opacity="0.35" />
                <circle cx="110" cy="58" r="4" fill={palette.accent} />
              </svg>
              <div className="mt-4 space-y-1 text-white">
                <p className="text-xs uppercase tracking-[0.4em] text-white/70">{character.name}</p>
                <p className="text-lg font-semibold">{character.traits[0]} · {character.traits[1]}</p>
                <p className="text-sm text-white/80">Tap to pin pose & learn silhouette cues.</p>
              </div>
              <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
                <div className="h-full w-full bg-gradient-to-br from-white/10 via-transparent to-transparent" />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default CharacterFigures;
