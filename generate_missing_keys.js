import fs from 'fs';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const pages = ['windows', 'client-side-safe', 'batch-converter', 'iphone-voice-memos', 'privacy-policy', '320kbps'];

async function main() {
  let allEnKeys = {};

  for (const page of pages) {
    console.log(`Processing ${page}...`);
    const filePath = `app/[locale]/${page}/page.tsx`;
    if (!fs.existsSync(filePath)) continue;
    
    const content = fs.readFileSync(filePath, 'utf-8');
    
    const prompt = `
    You are an expert copywriter. The following React component uses next-intl for translations.
    I lost the original English translation dictionary.
    Please extract all the translation keys used in the t('key_name') calls, and generate plausible, professional English text for each key based on the context of the component and the page topic (${page}).
    
    Provide the output as a JSON object:
    {
      "enKeys": { "key_name": "Plausible english text...", ... }
    }
    Respond ONLY with valid JSON. Do not wrap in markdown \`\`\`json.
    `;
    
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: [prompt, content]
      });
      let text = response.text;
      text = text.replace(/```json/g, '').replace(/```/g, '').trim();
      const result = JSON.parse(text);
      
      allEnKeys[page.replace(/-/g, '_')] = result.enKeys;
      console.log(`Generated keys for ${page}`);
    } catch (err) {
      console.error(`Error processing ${page}:`, err.message);
    }
  }

  fs.writeFileSync('recovered_keys.json', JSON.stringify(allEnKeys, null, 2));
  console.log('Done recovering!');
}

main();
