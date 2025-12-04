"use client";

import type { StoryScene } from "@/types/story";
import Image from "next/image";

type SceneImage = {
  id: string;
  sceneId?: string | null;
  mimeType: string;
  data: string;
  createdAt: string;
};

const formatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
});

type SceneGalleryProps = {
  images: SceneImage[];
  scenes: StoryScene[];
};

export function SceneGallery({ images, scenes }: SceneGalleryProps) {
  if (images.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-slate-400/50 bg-white/40 p-6 text-center text-slate-600">
        No renders yet. Generate a scene visual to craft a cinematic mood board.
      </p>
    );
  }

  const sceneLookup = new Map(scenes.map((scene) => [scene.id, scene]));

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {images.map((image) => {
        const scene = sceneLookup.get(image.sceneId);
        return (
          <figure
            key={image.id}
            className="overflow-hidden rounded-3xl border border-white/15 bg-white shadow-lg"
          >
            <Image
              src={`data:${image.mimeType};base64,${image.data}`}
              alt={scene ? `Scene visual for ${scene.prompt}` : "Gemini rendered scene"}
              width={800}
              height={600}
              className="h-64 w-full object-cover"
              unoptimized
            />
            <figcaption className="space-y-2 p-4 text-sm text-slate-700">
              <div className="text-xs uppercase tracking-[0.3em] text-slate-500">
                Rendered {formatter.format(new Date(image.createdAt))}
              </div>
              {scene && (
                <div>
                  <p className="text-sm font-semibold text-slate-900">{scene.prompt}</p>
                  <p className="text-xs text-slate-500 line-clamp-2">{scene.content}</p>
                </div>
              )}
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}

export default SceneGallery;
