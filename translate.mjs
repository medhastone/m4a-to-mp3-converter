import fs from 'fs';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const enData = JSON.parse(fs.readFileSync('messages/en.json', 'utf8'));

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function translateChunk(chunk, langName) {
  const prompt = `You are a professional software localization expert.
Translate the values of the following JSON object from English into ${langName}. 
CRITICAL INSTRUCTIONS:
- Preserve all JSON keys exactly as they are. Do not translate the keys.
- Preserve all HTML tags, placeholders (like {name}), and interpolation braces.
- Return ONLY valid JSON.
- The structure of the output JSON must match the input exactly.`;

  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt + "\n\n" + JSON.stringify(chunk, null, 2),
        config: { responseMimeType: "application/json" }
      });
      return JSON.parse(response.text);
    } catch (e) {
      await sleep(5000);
    }
  }
  throw new Error("Failed");
}

async function translateLang(langCode, langName) {
  const keys = Object.keys(enData);
  const chunkSize = 5;
  const keyChunks = [];
  for (let i = 0; i < keys.length; i += chunkSize) {
    keyChunks.push(keys.slice(i, i + chunkSize));
  }

  let translatedData = {};
  
  for (let i = 0; i < keyChunks.length; i++) {
     console.log(`Translating ${langName} chunk ${i + 1}/${keyChunks.length}`);
     const chunkObj = {};
     for (const k of keyChunks[i]) {
       chunkObj[k] = enData[k];
     }
     const translatedChunk = await translateChunk(chunkObj, langName);
     for (const k of Object.keys(translatedChunk)) {
       translatedData[k] = translatedChunk[k];
     }
     await sleep(2000);
  }
  fs.writeFileSync(`messages/${langCode}.json`, JSON.stringify(translatedData, null, 2));
  console.log(`Finished ${langName}.`);
}

async function run() {
  await translateLang('es', 'Spanish');
  await translateLang('fr', 'French');
  await translateLang('pt', 'Portuguese');
}

run().then(() => console.log("DONE")).catch(console.error);
