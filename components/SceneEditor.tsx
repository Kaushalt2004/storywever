"use client";

import { FormEvent, useState } from "react";

type SceneEditorProps = {
  onGenerate: (prompt: string) => Promise<void> | void;
  isLoading?: boolean;
};

export function SceneEditor({ onGenerate, isLoading = false }: SceneEditorProps) {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!prompt.trim() || isLoading) return;
    await onGenerate(prompt.trim());
    setPrompt("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-white/10 bg-slate-900/80 p-6 text-white shadow-xl"
    >
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
          Scene prompt
        </p>
        <h2 className="mt-2 text-2xl font-semibold">Where do we go next?</h2>
      </div>
      <textarea
        required
        value={prompt}
        onChange={(event) => setPrompt(event.target.value)}
        placeholder="e.g., An uneasy parley aboard a derelict ring station orbiting a red dwarf"
        className="min-h-[140px] w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white placeholder:text-slate-300 focus:border-pink-400 focus:outline-none"
      />
      <button
        type="submit"
        disabled={isLoading || !prompt.trim()}
        className="w-full rounded-2xl bg-white/90 px-6 py-3 text-lg font-semibold text-slate-900 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? "Weaving..." : "Generate Scene"}
      </button>
    </form>
  );
}

export default SceneEditor;
