"use client";

import type { StoryScene } from "@/types/story";

const formatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
});

type SceneListProps = {
  scenes: StoryScene[];
};

export function SceneList({ scenes }: SceneListProps) {
  if (scenes.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-slate-400/50 bg-white/40 p-6 text-center text-slate-600 dark:bg-slate-900/40 dark:text-slate-200">
        No scenes yet. Craft a setting and watch StoryWeaver continue the tale.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {scenes.map((scene, index) => (
        <article
          key={scene.id}
          className="rounded-3xl border border-white/20 bg-white p-6 shadow-lg dark:bg-slate-900"
        >
          <header className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <div className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">
              Scene {index + 1}
            </div>
            <div className="text-sm text-slate-500">
              {formatter.format(new Date(scene.createdAt))}
            </div>
          </header>
          <p className="mb-3 text-sm font-medium uppercase tracking-wide text-pink-500">
            Prompt
          </p>
          <p className="mb-4 text-base text-slate-700 dark:text-slate-100">
            {scene.prompt}
          </p>
          <p className="text-lg leading-relaxed text-slate-900 dark:text-slate-100">
            {scene.content}
          </p>
        </article>
      ))}
    </div>
  );
}

export default SceneList;
