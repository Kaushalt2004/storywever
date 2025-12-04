import type { NextApiRequest, NextApiResponse } from "next";
import { GoogleGenerativeAI } from "@google/generative-ai";
import type { CharacterProfile, StoryScene } from "@/types/story";

const DEFAULT_MODEL = "gemini-2.0-flash";

type GenerateSceneBody = {
  character?: CharacterProfile;
  sceneSetting?: string;
  recentScenes?: StoryScene[];
};

type GenerateSceneResponse =
  | {
      scene: string;
    }
  | {
      error: string;
    };

const buildSystemPrompt = (
  character: CharacterProfile,
  recentScenes: StoryScene[],
) => {
  const sceneHistory =
    recentScenes.length === 0
      ? "No scenes have been generated yet."
      : recentScenes
          .map(
            (scene, index) =>
              `Scene ${index + 1} prompt: ${scene.prompt}\nScene ${index + 1} narrative: ${scene.content}`,
          )
          .join("\n\n");

  return `You are StoryWeaver, an imaginative co-author who ALWAYS preserves continuity.
Character Profile:
- Name: ${character.name}
- Age: ${character.age}
- Role: ${character.role}
- Personality Traits: ${character.traits}
- Backstory: ${character.backstory}

Scene History:
${sceneHistory}

Guidelines:
1. Maintain the character's established voice, motivations, and emotional arc.
2. Never contradict stated facts or prior scenes. Reference callbacks where natural.
3. Write immersive prose (2-5 paragraphs) rich with sensory detail and dialogue.
4. Conclude each scene with a hook that invites another scene, without resolving every thread.
5. The output must be under 600 tokens and contain narrative only—no meta commentary.`;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GenerateSceneResponse>,
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res
      .status(500)
      .json({ error: "Missing GEMINI_API_KEY in environment." });
  }

  const { character, sceneSetting, recentScenes = [] } =
    req.body as GenerateSceneBody;

  if (!character || !sceneSetting) {
    return res
      .status(400)
      .json({ error: "Character payload and scene setting are required." });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: process.env.GEMINI_MODEL ?? DEFAULT_MODEL,
      systemInstruction: buildSystemPrompt(character, recentScenes),
      generationConfig: {
        temperature: 0.8,
        maxOutputTokens: 600,
      },
    });

    const result = await model.generateContent(
      `New scene request: ${sceneSetting}\nWrite the scene now.`,
    );
    const sceneText = result.response.text().trim();

    if (!sceneText) {
      throw new Error("Gemini returned an empty scene.");
    }

    return res.status(200).json({ scene: sceneText });
  } catch (error) {
    console.error("generateScene error", error);
    const message =
      error instanceof Error
        ? error.message
        : "Unexpected error generating scene.";
    return res.status(500).json({ error: message });
  }
}
