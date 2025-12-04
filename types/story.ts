export type CharacterProfile = {
  id: string;
  name: string;
  age: string;
  role: string;
  traits: string;
  backstory: string;
  createdAt: string;
};

export type StoryScene = {
  id: string;
  characterId: string;
  prompt: string;
  content: string;
  createdAt: string;
};
