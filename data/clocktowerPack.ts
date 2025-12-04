export type SceneBeat = {
  beat: string;
  detail: string;
};

export type CharacterCard = {
  name: string;
  age: string;
  traits: string[];
  look: string;
  motivations: string;
  abilities: string;
  arc: string;
};

export type StyleRemix = {
  label: string;
  description: string;
};

export type Figure = {
  title: string;
  description: string;
};

export type StoryPlot = {
  title: string;
  logline: string;
  escalation: string;
};

export type BackgroundPlate = {
  name: string;
  palette: string;
  description: string;
};

export const pulsepointScene: SceneBeat[] = [
  {
    beat: "Surge",
    detail:
      "Rain lashes stained glass while Aisha steadies herself and Ethan becomes a living conduit for the crystal.",
  },
  {
    beat: "Crossfire Dialogue",
    detail:
      'Aisha yells "Tell me how to shut it down" as Ethan reveals the clock weights are tied to the ley nodes.',
  },
  {
    beat: "The Pull",
    detail:
      "She dives for the counterweight lever while gears swoop overhead like iron guillotines, showering sparks.",
  },
  {
    beat: "Fractured Silhouette",
    detail:
      "Crystal pulses blue→violet→white, throwing multiple afterimages of Ethan as though timelines are overlapping.",
  },
  {
    beat: "Cliffhanger",
    detail:
      "Aisha catches Ethan as the tower steadies, only to find Meridian Vault coordinates seared into her palm.",
  },
];

export const clocktowerCharacters: CharacterCard[] = [
  {
    name: "Aisha Rahman",
    age: "19",
    traits: ["Loyal", "Improvisational", "Tactile problem-solver"],
    look:
      "Copper skin, rain-slick braids, bomber jacket over urban explorer gear, leather backpack of antique tools.",
    motivations:
      "Uncover why kids vanished, protect the city from ley-line instability, and pull Ethan back from the brink.",
    abilities:
      "Empathic resonance with artifacts plus mechanic know-how learned from her archivist mother.",
    arc: "From reactive survivor to intentional guardian of time-linked relics.",
  },
  {
    name: "Ethan Vale",
    age: "20 (chronologically)",
    traits: ["Cerebral", "Secretive", "Guilt-ridden"],
    look:
      "Mismatched eyes (one glowing), patched trench coat, cracked crystal tethered to his collarbone.",
    motivations:
      "Stop the Meridian Echo entity inside the crystal and keep Aisha safe, even if it erases him.",
    abilities:
      "Conduit for ley energy with foresight flashes that cost him his stability.",
    arc: "From missing friend to reluctant catalyst fighting identity erosion.",
  },
];

export const twistHook = {
  title: "Meridian Split",
  description:
    "The crystal is a shard of the clocktower core that split Ethan into two timelines. Stabilizing the core means only one Ethan survives, and the Meridian Vault coordinates on Aisha's palm can resurrect or erase anyone tied to the clock.",
};

export const styleRemixes: StyleRemix[] = [
  {
    label: "Romance",
    description:
      "Sync heartbeats with the clock chimes, whisper confessions through the noise, and linger on touch.",
  },
  {
    label: "Fantasy",
    description:
      "Treat the tower as a slumbering guardian; the crystal becomes a soulstone shrouded in glyphs.",
  },
  {
    label: "Thriller",
    description:
      "Countdown overlays, encrypted warnings on the clock face, paranoia about unseen watchers.",
  },
  {
    label: "Dystopian",
    description:
      "Citywide blackout, government drones swarm, Ethan branded as an anomaly on holo-billboards.",
  },
  {
    label: "Sci-Fi",
    description:
      "Quantum gyros, HUD ley-line harmonics, Aisha reroutes energy with a wrist rig.",
  },
  {
    label: "Anime",
    description:
      "Amplified motion lines, signature attacks (Chrono Sever), orchestral choirs during the climax.",
  },
];

export const figures: Figure[] = [
  {
    title: "Fig. A — Tower Layout",
    description:
      "Overhead schematic showing gear array, ley nodes under the floor, and the counterweight lever path.",
  },
  {
    title: "Fig. B — Crystal Phases",
    description:
      "Color study of the crystal shifting blue→violet→white with timeline echo silhouettes behind Ethan.",
  },
  {
    title: "Fig. C — Character Lineup",
    description:
      "Model sheet of Aisha and Ethan with costume notes, props, and posture cues.",
  },
  {
    title: "Fig. D — Meridian Vault",
    description:
      "Vault door etched with countdown numerals and two diverging Ethan shadows.",
  },
];

export const storyPlots: StoryPlot[] = [
  {
    title: "Pulsepoint Heist",
    logline:
      "Aisha must steal the ley-map stored inside the reawakened clocktower before the Meridian Echo stabilizes its new host.",
    escalation:
      "Success unlocks a hidden metro tunnel, but exposes Ethan's second timeline self who now hunts them both.",
  },
  {
    title: "The Vault of Zeros",
    logline:
      "Coordinates etched into Aisha's palm lead to a crypt that can resurrect anyone the clock erased—at the price of a living memory.",
    escalation:
      "Opening it forces Aisha to decide whether to sacrifice her own past or Ethan's remaining humanity.",
  },
  {
    title: "Static Crown",
    logline:
      "Government signal-jammers surround the tower, and Ethan must merge with the crystal to broadcast a warning before reality desynchronizes.",
    escalation:
      "If he merges, he becomes a disembodied guide; if he doesn’t, the city fractures into parallel districts.",
  },
];

export const backgroundPlates: BackgroundPlate[] = [
  {
    name: "Clock Core",
    palette: "bg-gradient-to-br from-[#05060f] via-[#1b2350] to-[#3b2b63]",
    description:
      "Steel ribs, suspended gears, and violet ley arcs—perfect for tense, high-energy scenes.",
  },
  {
    name: "Meridian Alley",
    palette: "bg-gradient-to-br from-[#0f141a] via-[#183044] to-[#205c5c]",
    description:
      "Rain-slick neon cobblestones with holographic posters flickering in a wind tunnel.",
  },
  {
    name: "Vault Atrium",
    palette: "bg-gradient-to-br from-[#1d1a2a] via-[#352d52] to-[#5f3f74]",
    description:
      "Circular chamber carved from obsidian with floating numeral sigils orbiting a sealed door.",
  },
];
