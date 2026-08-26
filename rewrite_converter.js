import fs from 'fs';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function main() {
  const file = 'app/components/Converter.tsx';
  console.log(`Processing ${file}...`);
  const content = fs.readFileSync(file, 'utf-8');
  
  const prompt = `
  You are an expert React developer. Rewrite the following Next.js file to use next-intl translations.
  1. Extract all raw user-facing text strings into translation keys.
  2. Add import { useTranslations } from 'next-intl';
  3. Use const t = useTranslations('converter');
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
      model: 'gemini-3.6-flash',
      contents: [prompt, content]
    });
    let text = response.text;
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const result = JSON.parse(text);
    
    fs.writeFileSync(file, result.newCode);
    fs.writeFileSync('converter_keys.json', JSON.stringify({ converter: result.enKeys }, null, 2));
    console.log(`Saved ${file}`);
  } catch (err) {
    console.error(`Error processing ${file}:`, err.message);
  }
}

main();
