## StoryWeaver

StoryWeaver is a Next.js + Tailwind CSS experience that lets you author a fictional character and co-write scenes powered by Google Gemini. Character profiles and scene history live entirely in LocalStorage so your lore stays on-device while the `/api/generateScene` route handles AI continuity.

### ✨ Features
- Character creation studio captures name, age, role, traits, and backstory.
- LocalStorage persistence keeps characters and scene history across sessions.
- Scene generator page loads a character, crafts prompts, and appends AI-written scenes.
- Gemini-powered API enforces continuity using character facts + previous scenes in the system prompt.
- Built-in Clocktower Story Pack surfaces sample beats, character sheets, twists, and figure briefs you can remix instantly.
- Interactive 2D lineup cards visualize each character silhouette for quick inspiration.
- Scene action figure cards illustrate what your protagonist is doing with pose-aware SVG silhouettes per scene.
- Story plot grid + gradient background plates you can reference directly from the landing page.
- React-powered scene visual grid renders cinematic scene boards directly in the browser—no external image APIs.
- Interactive storytelling mode lets users guide the narrative by choosing character actions at key moments.
- Deployment-ready for Vercel with TypeScript, ESLint, and Tailwind.

### 🛠 Tech Stack
- Next.js (Pages Router) + TypeScript
- Tailwind CSS (v4) for styling
- @google/generative-ai for Gemini access
- LocalStorage for simple persistence

### 🚀 Getting Started
1. **Install dependencies**
	```bash
	npm install
	```
2. **Configure environment**
	Create a `.env.local` file at the project root:
	```bash
	GEMINI_API_KEY=your_google_generative_ai_key
	# Optional: override the default model (defaults to gemini-2.0-flash)
	# GEMINI_MODEL=gemini-1.5-pro
	```
	> You can generate a Gemini API key from https://aistudio.google.com/app/apikey.
	> Recommended models: `gemini-2.0-flash` (default) for speed or `gemini-1.5-pro` if your key supports it.

3. **Run the dev server**
	```bash
	npm run dev
	```
	Visit [http://localhost:3000](http://localhost:3000) to start weaving stories.

### 📁 Key Paths
- `pages/index.tsx` – Landing page + character creation experience.
- `pages/characters/[id].tsx` – Story generator with scene history + editor.
- `pages/api/generateScene.ts` – Gemini-powered scene generation route.
- `components/CharacterForm.tsx`, `SceneEditor.tsx`, `SceneList.tsx` – UI building blocks.
- `components/InteractiveStorytelling.tsx` – Choice-driven narrative branching interface.
- `components/SceneActionFigures.tsx`, `SceneVisualGrid.tsx`, `StoryPack.tsx`, `CharacterFigures.tsx` – React-driven inspiration modules and mood boards.
- `lib/storage.ts` – LocalStorage helpers for characters & scenes.
- `types/story.ts` – Shared type definitions.

### 📦 Deployment
The app is Vercel-ready out of the box:
```bash
npm run build
```
Set the same `GEMINI_API_KEY` (and optional `GEMINI_MODEL`) in your Vercel project settings and deploy.

### 🔐 Notes on Data
- All character profiles and scenes are stored in `localStorage`. Clearing browser storage will remove them.
- Only the prompt + minimal character context is sent to Gemini via the API route; no external database is used.
