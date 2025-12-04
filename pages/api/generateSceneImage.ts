import type { NextApiRequest, NextApiResponse } from "next";
import { GoogleGenerativeAI } from "@google/generative-ai";
import type { GenerateContentResult } from "@google/generative-ai";
import type { CharacterProfile, StoryScene } from "@/types/story";

const DEFAULT_IMAGE_MODEL = "imagen-3.0-generate-001";

type GenerateImageBody = {
  character?: CharacterProfile;
  scene?: StoryScene;
  artDirection?: string;
};

type GenerateImageResponse =
  | {
      image: string;
      mimeType: string;
    }
  | {
      error: string;
    };

const buildImagePrompt = (
  character: CharacterProfile,
  scene: StoryScene,
  artDirection?: string,
) => `Illustrate a sweeping, cinematic tableau inspired by the following brief.
Character: ${character.name} (${character.role})
Personality cues: ${character.traits}
Backstory context: ${character.backstory}
Scene prompt: ${scene.prompt}
Scene excerpt: ${scene.content}
Art direction: ${artDirection ?? "Big generous wide shot, painterly lighting, high fidelity, richly detailed."}
Render the moment with dramatic lighting, atmospheric perspective, and tactile texture.`;

type InlineData = { mimeType?: string; data?: string };

const extractInlineImage = (result: GenerateContentResult): InlineData | null => {
  const candidates = result?.response?.candidates ?? [];
  for (const candidate of candidates) {
    const parts = candidate.content?.parts ?? [];
    for (const part of parts) {
      const inlineData = (part as { inlineData?: InlineData }).inlineData;
      if (inlineData?.data && inlineData.mimeType?.startsWith("image/")) {
        return inlineData;
      }
    }
  }
  return null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GenerateImageResponse>,
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

  const { character, scene, artDirection } = req.body as GenerateImageBody;
  if (!character || !scene) {
    return res.status(400).json({ error: "Character and scene payloads are required." });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: process.env.GEMINI_IMAGE_MODEL ?? DEFAULT_IMAGE_MODEL,
      generationConfig: {
        temperature: 0.4,
      },
    });

    const result = await model.generateContent([
      { text: buildImagePrompt(character, scene, artDirection) },
    ]);

    const inlineImage = extractInlineImage(result);

    if (!inlineImage?.data) {
      throw new Error("Gemini did not return any inline image data.");
    }

    return res.status(200).json({
      image: inlineImage.data,
      mimeType: inlineImage.mimeType ?? "image/png",
    });
  } catch (error) {
    console.error("generateSceneImage error", error);
    const message =
      error instanceof Error
        ? error.message
        : "Unexpected error generating image.";
    return res.status(500).json({ error: message });
  }
}
