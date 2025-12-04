import InteractiveStorytelling from "@/components/InteractiveStorytelling";
import SceneActionFigures from "@/components/SceneActionFigures";
import SceneEditor from "@/components/SceneEditor";
import SceneList from "@/components/SceneList";
import SceneVisualGrid from "@/components/SceneVisualGrid";
import { storage } from "@/lib/storage";
import type { CharacterProfile, StoryScene } from "@/types/story";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function CharacterStoryPage() {
  const router = useRouter();
  const { id } = router.query;

  const [character, setCharacter] = useState<CharacterProfile | null>(null);
  const [scenes, setScenes] = useState<StoryScene[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!id || typeof id !== "string") return;
    const storedCharacter = storage.getCharacter(id);
    const storedScenes = storage.getScenes(id);
    setCharacter(storedCharacter);
    setScenes(storedScenes);
    setInitialized(true);
  }, [id]);

  const recentScenes = useMemo(() => scenes.slice(-3), [scenes]);

  const handleGenerate = async (prompt: string) => {
    if (!character) {
      setError("Character not found. Return home and recreate the profile.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/generateScene", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          character,
          sceneSetting: prompt,
          recentScenes,
        }),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error ?? "Failed to generate scene");
      }

      const newScene: StoryScene = {
        id: uuidv4(),
        characterId: character.id,
        prompt,
        content: payload.scene as string,
        createdAt: new Date().toISOString(),
      };

      setScenes((prev) => {
        const nextScenes = [...prev, newScene];
        storage.saveScenes(character.id, nextScenes);
        return nextScenes;
      });
    } catch (generationError) {
      const message =
        generationError instanceof Error
          ? generationError.message
          : "Unexpected error while generating scene.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Head>
        <title>{`StoryWeaver | ${character?.name ?? "Character"}`}</title>
      </Head>
      <div className="mx-auto max-w-6xl px-6 py-12">
        <header className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">
              Story thread
            </p>
            <h1 className="mt-2 text-4xl font-semibold text-slate-900">
              {character ? character.name : "Loading character..."}
            </h1>
            {character && (
              <p className="mt-3 text-base text-slate-600">
                {character.role} · Age {character.age}
              </p>
            )}
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-900"
          >
            ← Characters
          </Link>
        </header>

        {initialized && !character && (
          <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            We couldn&apos;t find this character in your browser storage. Return to
            the landing page to create a fresh profile.
          </div>
        )}

        {character && (
          <section className="mb-8 grid gap-6 rounded-3xl bg-white/70 p-6 shadow-lg md:grid-cols-3">
            <article className="md:col-span-1">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">
                Traits
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                {character.traits}
              </p>
            </article>
            <article className="md:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">
                Backstory
              </p>
              <p className="mt-3 text-base leading-relaxed text-slate-700">
                {character.backstory}
              </p>
            </article>
          </section>
        )}

        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-slate-900">Scene History</h2>
            <SceneList scenes={scenes} />
            {character && (
              <InteractiveStorytelling
                character={character}
                scenes={scenes}
                onSceneSelect={(scene) => handleGenerate(scene.prompt)}
              />
            )}
            <SceneActionFigures 
              character={character} 
              scenes={scenes}
            />
            <SceneVisualGrid scenes={scenes} />
          </section>

          <aside>
            <SceneEditor onGenerate={handleGenerate} isLoading={isLoading} />
          </aside>
        </div>
      </div>
    </div>
  );
}
