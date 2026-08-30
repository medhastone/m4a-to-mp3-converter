import fs from 'fs';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function processFile(file, namespace) {
  console.log(`Processing ${file}...`);
  const content = fs.readFileSync(file, 'utf-8');
  
  const prompt = `
  You are an expert React developer. Rewrite the following Next.js file to use next-intl translations.
  1. Extract all raw user-facing text strings into translation keys.
  2. Add import { useTranslations } from 'next-intl';
  3. Use const t = useTranslations('${namespace}');
  4. Replace text strings in JSX with {t('key_name')}.
  5. KEEP the rest of the code the same (logic, hooks, etc).
  
  Provide the output as a JSON object:
  {
    "newCode": "the complete new tsx file content",
    "enKeys": { "key_name": "...", ... }
  }
  Respond ONLY with valid JSON. Do not wrap in markdown \`\`\`json.
  `;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: [prompt, content]
    });
    
    let text = response.text;
    text = text.replace(/```json/gi, '').replace(/```/g, '').trim();
    const result = JSON.parse(text);
    
    fs.writeFileSync(file, result.newCode);
    return result.enKeys;
  } catch (err) {
    console.error(`Error processing ${file}:`, err.message);
    return null;
  }
}

async function main() {
  const keys1 = await processFile('app/components/WavToMp3Converter.tsx', 'wav_to_mp3');
  const keys2 = await processFile('app/components/WavToMp3SEO.tsx', 'wav_to_mp3_seo');
  
  const enPath = 'messages/en.json';
  const en = JSON.parse(fs.readFileSync(enPath, 'utf-8'));
  
  if (keys1) en.wav_to_mp3 = keys1;
  if (keys2) en.wav_to_mp3_seo = keys2;
  
  fs.writeFileSync(enPath, JSON.stringify(en, null, 2));
  console.log('Saved en.json');
}

main();
