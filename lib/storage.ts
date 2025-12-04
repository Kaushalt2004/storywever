import type { CharacterProfile, StoryScene } from "@/types/story";

const CHARACTER_KEY = "storyweaver_characters";
const scenesKey = (characterId: string) => `storyweaver_scenes_${characterId}`;

const safeParse = <T>(value: string | null, fallback: T): T => {
  try {
    return value ? (JSON.parse(value) as T) : fallback;
  } catch (error) {
    console.warn("StoryWeaver storage parse error", error);
    return fallback;
  }
};

const hasWindow = () => typeof window !== "undefined";

const readCharacters = (): CharacterProfile[] => {
  if (!hasWindow()) return [];
  return safeParse<CharacterProfile[]>(
    window.localStorage.getItem(CHARACTER_KEY),
    [],
  );
};

const writeCharacters = (characters: CharacterProfile[]) => {
  if (!hasWindow()) return;
  window.localStorage.setItem(CHARACTER_KEY, JSON.stringify(characters));
};

export const storage = {
  getCharacters(): CharacterProfile[] {
    return readCharacters();
  },
  saveCharacter(profile: CharacterProfile) {
    if (!hasWindow()) return;
    const characters = readCharacters();
    const index = characters.findIndex((c) => c.id === profile.id);
    if (index >= 0) {
      characters.splice(index, 1, profile);
    } else {
      characters.push(profile);
    }
    writeCharacters(characters);
  },
  getCharacter(id: string) {
    return readCharacters().find((c) => c.id === id) ?? null;
  },
  getScenes(characterId: string): StoryScene[] {
    if (!hasWindow()) return [];
    return safeParse<StoryScene[]>(
      window.localStorage.getItem(scenesKey(characterId)),
      [],
    );
  },
  saveScenes(characterId: string, scenes: StoryScene[]) {
    if (!hasWindow()) return;
    window.localStorage.setItem(
      scenesKey(characterId),
      JSON.stringify(scenes),
    );
  },
};
