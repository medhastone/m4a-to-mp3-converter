import fs from 'fs';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
async function run() {
  const response = await ai.models.generateContent({
    model: 'gemini-3.6-flash',
    contents: "Translate this to PT: Hello world",
  });
  console.log(response.text);
}
run().catch(console.error);
