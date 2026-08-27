import fs from 'fs';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const enData = JSON.parse(fs.readFileSync('messages/en.json', 'utf8'));
const ptData = JSON.parse(fs.readFileSync('messages/pt.json', 'utf8'));

async function run() {
  const chunkObj = {
      terms: enData.terms,
      windows: enData.windows,
      about: enData.about
  };

  const prompt = `You are a professional software localization expert.
Translate the values of the following JSON object from English into Portuguese. 
CRITICAL INSTRUCTIONS:
- Preserve all JSON keys exactly as they are. Do not translate the keys.
- Preserve all HTML tags, placeholders (like {name}), and interpolation braces.
- Return ONLY valid JSON.
- The structure of the output JSON must match the input exactly.`;

  console.log("Sending translation request...");
  const response = await ai.models.generateContent({
    model: 'gemini-3.6-flash',
    contents: prompt + "\n\n" + JSON.stringify(chunkObj, null, 2),
    config: { responseMimeType: "application/json" }
  });

  const translatedChunk = JSON.parse(response.text);
  
  ptData.terms = translatedChunk.terms;
  ptData.windows = translatedChunk.windows;
  ptData.about = translatedChunk.about;

  fs.writeFileSync('messages/pt.json', JSON.stringify(ptData, null, 2));
  console.log("Successfully fixed pt.json!");
}

run().catch(console.error);
