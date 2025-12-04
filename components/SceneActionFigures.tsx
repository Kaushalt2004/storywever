"use client";

import type { CharacterProfile, StoryScene } from "@/types/story";

const formatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
});

type PoseKey = "dynamic" | "sentinel" | "stealth" | "reaching" | "neutral";

type PosePreset = {
  label: string;
  mood: string;
  background: string;
  accent: string;
  core: string;
  arms: string[];
  legs: string[];
};

const posePresets: Record<PoseKey, PosePreset> = {
  dynamic: {
    label: "Momentum Capture",
    mood: "Forward motion with charged pursuit energy.",
    background: "from-[#030712] via-[#0f172a] to-[#1f2937]",
    accent: "#f97316",
    core: "#1e293b",
    arms: ["M110 100 Q130 85 155 78", "M110 102 Q90 88 68 85"],
    legs: ["M110 155 Q125 175 145 210", "M110 155 Q95 168 82 198"],
  },
  sentinel: {
    label: "Guarded Resolve",
    mood: "Planted stance with defensive poise.",
    background: "from-[#020617] via-[#111827] to-[#1e1b4b]",
    accent: "#38bdf8",
    core: "#1e293b",
    arms: ["M100 115 Q92 120 78 132", "M120 115 Q128 118 145 128"],
    legs: ["M110 155 L125 208", "M110 155 L95 208"],
  },
  stealth: {
    label: "Shadow Creep",
    mood: "Low center, asynchronous limbs ready to strike quietly.",
    background: "from-[#050505] via-[#1c1c1c] to-[#2f2e41]",
    accent: "#a3e635",
    core: "#1e293b",
    arms: ["M108 110 Q120 108 142 115", "M112 112 Q98 118 75 135"],
    legs: ["M110 152 Q118 165 138 188", "M110 154 Q102 172 88 205"],
  },
  reaching: {
    label: "Skyward Reach",
    mood: "Extended line seeking connection or rescue.",
    background: "from-[#02101f] via-[#06213c] to-[#0f3d5c]",
    accent: "#c084fc",
    core: "#1e293b",
    arms: ["M108 95 Q125 70 142 42", "M112 97 Q95 75 78 55"],
    legs: ["M108 155 L132 208", "M112 155 L92 205"],
  },
  neutral: {
    label: "Still Focus",
    mood: "Centered breath before the next move.",
    background: "from-[#0b1120] via-[#111c33] to-[#1f2a44]",
    accent: "#f472b6",
    core: "#1e293b",
    arms: ["M98 115 Q82 125 58 142", "M122 115 Q138 125 162 142"],
    legs: ["M110 155 L88 208", "M110 155 L132 208"],
  },
};

const poseMatchers: Array<{ regex: RegExp; pose: PoseKey }> = [
  { regex: /(run|dash|sprint|race|chase|charge)/i, pose: "dynamic" },
  { regex: /(guard|shield|defend|stand|protect|barricade)/i, pose: "sentinel" },
  { regex: /(stealth|sneak|shadow|creep|whisper|hide|silent|infiltrate)/i, pose: "stealth" },
  { regex: /(reach|grasp|hold|rescue|embrace|lift|soar|ascend|hope)/i, pose: "reaching" },
];

const detectPose = (text: string): PoseKey => {
  for (const matcher of poseMatchers) {
    if (matcher.regex.test(text)) {
      return matcher.pose;
    }
  }
  return "neutral";
};

const importantTrait = (traits?: string) => {
  if (!traits) return "Original archetype";
  const parts = traits
    .split(/[,;/]|and|\u00b7/gi)
    .map((part) => part.trim())
    .filter(Boolean);
  if (parts.length === 0) return "Original archetype";
  return parts.slice(0, 2).join(" / ");
};

type SceneActionFiguresProps = {
  scenes: StoryScene[];
  character: CharacterProfile | null;
};

export function SceneActionFigures({ scenes, character }: SceneActionFiguresProps) {
  const latestScenes = [...scenes].slice(-3).reverse();

  if (latestScenes.length === 0) {
    return (
      <section className="space-y-3 rounded-3xl border border-white/10 bg-slate-950/80 p-6 text-white">
        <header>
          <p className="text-xs uppercase tracking-[0.4em] text-pink-200">Action Figures</p>
          <h3 className="text-2xl font-semibold">Pose boards</h3>
          <p className="text-sm text-slate-300">
            Generate a scene to unlock stylized figure renders of what your protagonist is doing.
          </p>
        </header>
        <p className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
          No scenes yet. Once you craft a moment, StoryWeaver sketches a matching 2D silhouette with motion cues.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-4 rounded-3xl border border-white/10 bg-slate-950/90 p-6 text-white">
      <header className="space-y-1">
        <p className="text-xs uppercase tracking-[0.4em] text-pink-200">Action Figures</p>
        <h3 className="text-2xl font-semibold">
          {(character?.name ?? "Your hero").trim()} in motion
        </h3>
        <p className="text-sm text-slate-300">
          {importantTrait(character?.traits)} / {character?.role ?? "Custom role"}
        </p>
      </header>
      <div className="grid gap-5 md:grid-cols-3">
        {latestScenes.map((scene) => {
          const poseKey = detectPose(`${scene.prompt} ${scene.content}`);
          const preset = posePresets[poseKey];
          const gradientId = `scene-action-${scene.id}`;

          return (
            <article
              key={scene.id}
              className={`group flex flex-col rounded-3xl bg-gradient-to-br ${preset.background} p-4 shadow-2xl transition hover:-translate-y-1 hover:shadow-pink-500/20`}
              aria-label={`Action figure card for ${character?.name ?? "character"}`}
            >
              <div className="mb-3 text-xs uppercase tracking-[0.3em] text-white/70">
                {formatter.format(new Date(scene.createdAt))}
              </div>
              <div className="relative mb-4 overflow-hidden rounded-3xl border border-white/15 bg-black/30">
                <svg viewBox="0 0 220 220" className="w-full" style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.4))' }}>
                  <defs>
                    <radialGradient id={gradientId} cx="50%" cy="30%" r="60%">
                      <stop offset="0%" stopColor={preset.accent} stopOpacity="0.3" />
                      <stop offset="100%" stopColor="transparent" />
                    </radialGradient>
                    <linearGradient id={`body-${scene.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#334155" />
                      <stop offset="100%" stopColor="#1e293b" />
                    </linearGradient>
                    <filter id={`glow-${scene.id}`}>
                      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  <rect width="220" height="220" fill={`url(#${gradientId})`} />
                  
                  {/* Head - professional rounded shape */}
                  <ellipse cx="110" cy="68" rx="20" ry="24" fill={`url(#body-${scene.id})`} filter={`url(#glow-${scene.id})`} />
                  <ellipse cx="110" cy="68" rx="18" ry="22" fill="#475569" opacity="0.6" />
                  
                  {/* Torso - anatomical taper */}
                  <path 
                    d="M 95 92 Q 92 110 90 130 Q 90 145 95 155 L 125 155 Q 130 145 130 130 Q 128 110 125 92 Z" 
                    fill={`url(#body-${scene.id})`}
                    filter={`url(#glow-${scene.id})`}
                  />
                  <path 
                    d="M 100 95 Q 98 110 98 130 Q 98 142 102 152 L 118 152 Q 122 142 122 130 Q 122 110 120 95 Z" 
                    fill="#475569" 
                    opacity="0.5"
                  />
                  
                  {/* Arms - smooth curves */}
                  {preset.arms.map((d, armIndex) => (
                    <path 
                      key={`${scene.id}-arm-${armIndex}`} 
                      d={d} 
                      stroke={preset.accent} 
                      strokeWidth="8" 
                      strokeLinecap="round" 
                      fill="none"
                      opacity="0.85"
                      filter={`url(#glow-${scene.id})`}
                    />
                  ))}
                  
                  {/* Legs - natural stance */}
                  {preset.legs.map((d, legIndex) => (
                    <path 
                      key={`${scene.id}-leg-${legIndex}`} 
                      d={d} 
                      stroke={preset.accent} 
                      strokeWidth="9" 
                      strokeLinecap="round" 
                      fill="none"
                      opacity="0.85"
                      filter={`url(#glow-${scene.id})`}
                    />
                  ))}
                  
                  {/* Accent highlights */}
                  <circle cx="110" cy="65" r="4" fill={preset.accent} opacity="0.8" />
                  <ellipse cx="106" cy="68" rx="2" ry="3" fill="white" opacity="0.3" />
                </svg>
                <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-70">
                  <div className="h-full w-full bg-gradient-to-br from-white/15 via-transparent to-transparent" />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.3em] text-white/70">{preset.label}</p>
                <p className="text-sm text-slate-200">{preset.mood}</p>
                <p className="text-sm text-slate-100 line-clamp-4">{scene.content}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default SceneActionFigures;
