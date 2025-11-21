import { GoogleGenAI, Type } from "@google/genai";
import { GeminiCoinIdea } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateCoinIdea = async (prompt: string): Promise<GeminiCoinIdea> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate a creative, funny, and viral-worthy meme coin idea based on this topic: "${prompt}". If the topic is empty, come up with something random and internet-culture related.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING, description: "The name of the coin (e.g. Sad Hamster)" },
            ticker: { type: Type.STRING, description: "The ticker symbol (e.g. HAMMY)" },
            description: { type: Type.STRING, description: "A short, funny, lore-heavy description for the coin launch." }
          },
          required: ["name", "ticker", "description"]
        }
      }
    });
    
    if (response.text) {
        return JSON.parse(response.text) as GeminiCoinIdea;
    }
    throw new Error("No text returned from Gemini");
    
  } catch (error) {
    console.error("Failed to generate coin idea:", error);
    return {
      name: "Error Coin",
      ticker: "ERR",
      description: "The AI is sleeping. Be the creative one yourself!"
    };
  }
};

export const generateRoast = async (tokenName: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Write a very short, one-sentence "degen" style reaction to a new coin launch called "${tokenName}". It should be either hype or skepticism, using crypto slang.`,
    });
    return response.text || "LFG!";
  } catch (e) {
    return "To the moon?";
  }
};
