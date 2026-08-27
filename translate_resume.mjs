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

  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt + "\n\n" + JSON.stringify(chunk, null, 2),
        config: { responseMimeType: "application/json" }
      });
      return JSON.parse(response.text);
    } catch (e) {
      console.log(`Error translating chunk to ${langName} (Attempt ${attempt + 1}), retrying in 5s...`, e.message);
      await sleep(5000);
    }
  }
  throw new Error("Failed");
}

function containsPlaceholder(val, placeholder) {
    if (typeof val === 'string') return val.includes(placeholder);
    if (typeof val === 'object' && val !== null) {
        for (const k of Object.keys(val)) {
            if (containsPlaceholder(val[k], placeholder)) return true;
        }
    }
    return false;
}

async function translateLang(langCode, langName) {
  const keys = Object.keys(enData);
  const chunkSize = 5;
  const keyChunks = [];
  for (let i = 0; i < keys.length; i += chunkSize) {
    keyChunks.push(keys.slice(i, i + chunkSize));
  }

  let translatedData = {};
  if (fs.existsSync(`messages/${langCode}.json`)) {
      try {
          const content = fs.readFileSync(`messages/${langCode}.json`, 'utf8');
          translatedData = JSON.parse(content);
      } catch (e) {}
  }
  
  for (let i = 0; i < keyChunks.length; i++) {
     console.log(`Translating ${langName} chunk ${i + 1}/${keyChunks.length}`);
     
     // Check if this chunk is already translated
     const chunkFirstKey = keyChunks[i][0];
     if (translatedData[chunkFirstKey] && !containsPlaceholder(translatedData[chunkFirstKey], `[${langCode.toUpperCase()}]`)) {
         console.log(`  Chunk ${i + 1} already translated, skipping.`);
         continue;
     }

     const chunkObj = {};
     for (const k of keyChunks[i]) {
       chunkObj[k] = enData[k];
     }
     const translatedChunk = await translateChunk(chunkObj, langName);
     for (const k of Object.keys(translatedChunk)) {
       translatedData[k] = translatedChunk[k];
     }
     
     // Save incrementally
     fs.writeFileSync(`messages/${langCode}.json`, JSON.stringify(translatedData, null, 2));
     await sleep(2000);
  }
  console.log(`Finished ${langName}.`);
}

async function run() {
  await translateLang('fr', 'French');
  await translateLang('pt', 'Portuguese');
}

run().then(() => console.log("DONE")).catch(console.error);
