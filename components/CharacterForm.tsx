"use client";

import { ChangeEvent, FormEvent, useState } from "react";

export type CharacterFormValues = {
  name: string;
  age: string;
  role: string;
  traits: string;
  backstory: string;
};

type CharacterFormProps = {
  initialValues?: CharacterFormValues;
  onSubmit: (values: CharacterFormValues) => void;
  isSubmitting?: boolean;
};

const defaultValues: CharacterFormValues = {
  name: "",
  age: "",
  role: "",
  traits: "",
  backstory: "",
};

export function CharacterForm({
  initialValues = defaultValues,
  onSubmit,
  isSubmitting = false,
}: CharacterFormProps) {
  const [values, setValues] = useState<CharacterFormValues>(initialValues);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(values);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border border-white/20 bg-white/70 p-8 shadow-xl backdrop-blur-sm dark:bg-black/40"
    >
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
          Character Studio
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">
          Create your StoryWeaver persona
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-200">
          Craft a vivid profile. Your future scenes will mirror these traits.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
          Name
          <input
            required
            name="name"
            value={values.name}
            onChange={handleChange}
            placeholder="Aurelia Nightwind"
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
          Age
          <input
            required
            name="age"
            value={values.age}
            onChange={handleChange}
            placeholder="27"
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
          />
        </label>
      </div>

      <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
        Role
        <input
          required
          name="role"
          value={values.role}
          onChange={handleChange}
          placeholder="Starship diplomat, wandering bard, rebel strategist"
          className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
        />
      </label>

      <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
        Personality Traits
        <textarea
          required
          name="traits"
          value={values.traits}
          onChange={handleChange}
          placeholder="Diplomatic, patient, quietly humorous, obsessed with symmetry"
          className="min-h-[96px] rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
        />
      </label>

      <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
        Backstory
        <textarea
          required
          name="backstory"
          value={values.backstory}
          onChange={handleChange}
          placeholder="Summarize their origin, defining moment, and what they want now."
          className="min-h-[140px] rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
        />
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-6 py-3 text-lg font-semibold text-white shadow-lg transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Creating..." : "Save & Continue"}
      </button>
    </form>
  );
}

export default CharacterForm;
