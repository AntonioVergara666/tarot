
import { GoogleGenAI, Type } from "@google/genai";
import { DrawnCard, InterpretationResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const interpretSpread = async (
  spreadName: string,
  drawnCards: DrawnCard[]
): Promise<InterpretationResponse> => {
  const model = "gemini-3-flash-preview";
  
  const cardDetails = drawnCards.map(c => 
    `${c.card.name} (${c.isReversed ? 'Reversed' : 'Upright'})`
  ).join(', ');

  const prompt = `Act as an expert Tarot Reader with 20 years of experience in Jungian archetypes and spiritual guidance. 
Interpret the following Tarot spread: "${spreadName}".
The cards drawn are: ${cardDetails}.

Provide a mystical, insightful, and empowering interpretation.
Focus on the connection between the cards.`;

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
            description: "A high-level mystical overview of the entire spread."
          },
          advice: {
            type: Type.STRING,
            description: "Practical and spiritual advice based on the reading."
          },
          cardReadings: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                cardId: { type: Type.STRING },
                insight: { type: Type.STRING, description: "Detailed interpretation for this specific card in context." }
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
    const result = JSON.parse(response.text);
    return result as InterpretationResponse;
  } catch (error) {
    console.error("Failed to parse Gemini response", error);
    throw new Error("The celestial whispers were unclear. Please try again.");
  }
};
