
import { GoogleGenAI, Type } from "@google/genai";
import { DrawnCard, InterpretationResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const interpretSpread = async (
  spreadName: string,
  drawnCards: DrawnCard[]
): Promise<InterpretationResponse> => {
  const model = "gemini-3-flash-preview";
  
  // Create a structured list of cards with their IDs for the prompt
  const cardList = drawnCards.map(c => 
    `{ id: "${c.card.id}", name: "${c.card.name}", orientation: "${c.isReversed ? 'Reversed' : 'Upright'}" }`
  ).join(', ');

  const prompt = `Act as an expert Tarot Reader. Interpret this spread: "${spreadName}".
The cards drawn are: [${cardList}].

IMPORTANT: Your response must be in JSON. 
For the "cardReadings" array, you MUST use the exact "id" provided for each card in the input list above.
Provide a deep, spiritual, and contextual interpretation for each card and how they relate to each other.
Do not use generic placeholder text. Give specific insights for the ${spreadName} context.`;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: {
            type: Type.STRING,
            description: "A mystical overview of the whole reading."
          },
          advice: {
            type: Type.STRING,
            description: "A final piece of actionable spiritual advice."
          },
          cardReadings: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                cardId: { type: Type.STRING, description: "The exact ID of the card being interpreted (e.g., '0', 'w1')." },
                insight: { type: Type.STRING, description: "A detailed 2-3 sentence interpretation for this card." }
              },
              required: ["cardId", "insight"]
            }
          }
        },
        required: ["summary", "advice", "cardReadings"]
      }
    }
  });

  try {
    const text = response.text;
    const result = JSON.parse(text);
    return result as InterpretationResponse;
  } catch (error) {
    console.error("Failed to parse Gemini response", error);
    throw new Error("The cosmic alignment was disrupted. Please try again.");
  }
};
