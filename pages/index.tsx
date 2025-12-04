import { CharacterForm, type CharacterFormValues } from "@/components/CharacterForm";
import StoryPack from "@/components/StoryPack";
import { storage } from "@/lib/storage";
import type { CharacterProfile } from "@/types/story";
import { Geist, Geist_Mono } from "next/font/google";
import { useRouter } from "next/router";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (values: CharacterFormValues) => {
    setIsSaving(true);
    try {
      const profile: CharacterProfile = {
        id: uuidv4(),
        name: values.name.trim(),
        age: values.age.trim(),
        role: values.role.trim(),
        traits: values.traits.trim(),
        backstory: values.backstory.trim(),
        createdAt: new Date().toISOString(),
      };

      storage.saveCharacter(profile);
      router.push(`/characters/${profile.id}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      className={`${geistSans.className} ${geistMono.className} min-h-screen bg-gradient-to-br from-slate-950 via-indigo-900 to-slate-900 text-slate-50`}
    >
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-6 py-16 lg:flex-row lg:items-center lg:py-24">
        <section className="max-w-2xl text-white">
          <p className="text-xs uppercase tracking-[0.4em] text-pink-300">
            StoryWeaver
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
            Dream up a character.
            <br />
            Weave scenes that honor their voice.
          </h1>
          <p className="mt-6 text-lg text-slate-200">
            Define a persona&apos;s biography, traits, and mission. StoryWeaver will
            remember every detail as you co-author scenes from distant worlds,
            neon alleys, or mythic courts.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-slate-300">
            <li className="flex items-center gap-2">
              <span className="inline-flex h-2 w-2 rounded-full bg-pink-400" />
              Local-first storage keeps your characters private.
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-flex h-2 w-2 rounded-full bg-pink-400" />
              Gemini-powered storytelling adapts to your prompts.
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-flex h-2 w-2 rounded-full bg-pink-400" />
              Scene history ensures tone-perfect continuity.
            </li>
          </ul>
        </section>
        <section className="w-full flex-1">
          <CharacterForm onSubmit={handleSubmit} isSubmitting={isSaving} />
        </section>
      </div>
      <div className="mx-auto w-full max-w-5xl px-6 pb-24">
        <StoryPack />
      </div>
    </div>
  );
}
