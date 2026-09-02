import fs from 'fs';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function main() {
  const enData = JSON.parse(fs.readFileSync('./messages/en.json', 'utf8'));
  const entries = Object.entries(enData);
  const ruData = {};
  
  const CHUNK_SIZE = 50;
  for (let i = 0; i < entries.length; i += CHUNK_SIZE) {
    console.log(`Processing chunk ${i} to ${i + CHUNK_SIZE}...`);
    const chunk = Object.fromEntries(entries.slice(i, i + CHUNK_SIZE));
    
    let success = false;
    let retries = 0;
    while (!success && retries < 5) {
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
      } catch (err) {
        retries++;
        console.error('Error on chunk, retrying...', err.message);
        await new Promise(r => setTimeout(r, 2000));
      }
    }
  }

  fs.writeFileSync('./messages/ru.json', JSON.stringify(ruData, null, 2));
  console.log('Translation complete!');
}

main().catch(console.error);
