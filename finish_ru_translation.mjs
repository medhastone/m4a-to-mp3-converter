import fs from 'fs';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  console.log("Starting missing Russian translations...");
  const enData = JSON.parse(fs.readFileSync('./messages/en.json', 'utf8'));
  let ruData = {};
  try {
    ruData = JSON.parse(fs.readFileSync('./messages/ru.json', 'utf8'));
  } catch (e) {
    ruData = {};
  }
  
  // Find untranslated keys (where ru matches en)
  const missingKeys = [];
  for (const key in enData) {
    if (!ruData[key] || ruData[key] === enData[key] || ruData[key] === "[объект Объект]") {
       missingKeys.push(key);
    }
  }
  
  console.log(`Found ${missingKeys.length} untranslated keys. Processing with Gemini...`);
  
  const CHUNK_SIZE = 10;
  for (let i = 0; i < missingKeys.length; i += CHUNK_SIZE) {
    const chunkKeys = missingKeys.slice(i, i + CHUNK_SIZE);
    const chunk = {};
    for (const k of chunkKeys) {
      chunk[k] = enData[k];
    }
    
    let success = false;
    let retries = 0;
    while (!success && retries < 15) {
      try {
         const prompt = `Translate the following JSON string values from English to Russian. 
Keep the JSON keys exactly the same. Do not translate the keys. 
Only translate the values. Ensure HTML tags and placeholders like {time} or <br/> are preserved exactly.
Return ONLY valid JSON. No markdown formatting blocks like \`\`\`json.
Make sure the SEO titles and descriptions remain optimized for Russian.

${JSON.stringify(chunk, null, 2)}`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.5-flash',
          contents: prompt,
          config: { responseMimeType: "application/json" }
        });

        const translatedChunk = JSON.parse(response.text);
        Object.assign(ruData, translatedChunk);
        success = true;
        console.log(`Translated batch ${i / CHUNK_SIZE + 1} / ${Math.ceil(missingKeys.length / CHUNK_SIZE)}`);
      } catch(e) {
         retries++;
         console.log(`Rate limit, waiting 15s... (${retries}/15)`);
         await sleep(15000); // 15 seconds to back off
      }
    }
    
    // Save progress periodically
    fs.writeFileSync('./messages/ru.json', JSON.stringify(ruData, null, 2));
  }
  console.log("Finished missing translations!");
}
main();
