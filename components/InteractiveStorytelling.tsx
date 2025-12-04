"use client";

import type { CharacterProfile, StoryScene } from "@/types/story";
import { useState } from "react";

type InteractiveStorytellingProps = {
  character: CharacterProfile;
  scenes: StoryScene[];
  onSceneSelect: (scene: StoryScene) => void;
};

export function InteractiveStorytelling({
  character,
  scenes,
  onSceneSelect,
}: InteractiveStorytellingProps) {
  const [selectedScene] = useState<StoryScene | null>(
    scenes[scenes.length - 1] || null
  );
  const [userChoice, setUserChoice] = useState<string>("");

  const choices = [
    { id: "explore", label: "🔍 Explore the surroundings", prompt: "carefully explore the area" },
    { id: "confront", label: "⚔️ Confront the situation directly", prompt: "confront what lies ahead" },
    { id: "retreat", label: "🏃 Take a moment to strategize", prompt: "pause and reassess the situation" },
    { id: "interact", label: "💬 Engage with characters nearby", prompt: "interact with those around them" },
  ];

  const handleChoice = (choice: { id: string; label: string; prompt: string }) => {
    setUserChoice(choice.id);
    const continuePrompt = `${character.name} decides to ${choice.prompt}. What happens next?`;
    
    // Trigger scene generation in parent component
    onSceneSelect({
      id: "",
      characterId: character.id,
      prompt: continuePrompt,
      content: "",
      createdAt: "",
    });
  };

  if (scenes.length === 0) {
    return (
      <section className="space-y-4 rounded-3xl border border-purple-200/30 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-6 shadow-lg">
        <header>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-purple-600">
            Interactive Mode
          </p>
          <h3 className="text-2xl font-bold text-slate-900">Choose Your Path</h3>
          <p className="text-sm text-slate-600">
            Generate your first scene to begin the interactive storytelling experience.
          </p>
        </header>
      </section>
    );
  }

  return (
    <section className="space-y-4 rounded-3xl border border-purple-200/30 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-6 shadow-lg">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-purple-600">
          Interactive Mode
        </p>
        <h3 className="text-2xl font-bold text-slate-900">What happens next?</h3>
        <p className="text-sm text-slate-600">
          Guide {character.name}&apos;s journey by making key decisions at each turn.
        </p>
      </header>

      {selectedScene && (
        <div className="rounded-2xl border border-purple-200 bg-white p-5 shadow-sm">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-purple-500">
            Current Moment
          </p>
          <p className="text-base leading-relaxed text-slate-700">
            {selectedScene.content.slice(0, 200)}
            {selectedScene.content.length > 200 && "..."}
          </p>
        </div>
      )}

      <div className="space-y-3">
        <p className="text-sm font-semibold text-slate-700">
          Choose {character.name}&apos;s next action:
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          {choices.map((choice) => (
            <button
              key={choice.id}
              onClick={() => handleChoice(choice)}
              disabled={userChoice === choice.id}
              className="group relative overflow-hidden rounded-2xl border border-purple-300 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-purple-500 hover:shadow-md disabled:opacity-50"
            >
              <div className="relative z-10">
                <p className="text-base font-semibold text-slate-900">{choice.label}</p>
                <p className="mt-1 text-xs text-slate-600">
                  See what unfolds when {character.name} takes this path
                </p>
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-purple-100/50 via-pink-100/30 to-transparent opacity-0 transition group-hover:opacity-100" />
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
          💡 Tip
        </p>
        <p className="mt-1 text-sm text-blue-900">
          Your choices shape the narrative! Each decision branches into unique story
          moments powered by AI.
        </p>
      </div>
    </section>
  );
}

export default InteractiveStorytelling;
