import fs from 'fs';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const files = [
  'app/components/Header.tsx',
  'app/components/Footer.tsx',
  'app/components/MobileMenu.tsx',
  'app/[locale]/page.tsx'
];

async function main() {
  let allEnKeys = {};

  for (const file of files) {
    console.log(`Processing ${file}...`);
    const content = fs.readFileSync(file, 'utf-8');
    const namespace = file.includes('page.tsx') ? 'home' : path.basename(file, '.tsx').toLowerCase();
    
    const prompt = `
    You are an expert React developer. Rewrite the following Next.js file to use next-intl translations.
    1. Extract all raw user-facing text strings into translation keys.
    2. Add import { useTranslations } from 'next-intl';
    3. Use const t = useTranslations('${namespace}');
    4. Replace text strings in JSX with {t('key_name')}.
    5. KEEP the rest of the code the same (especially imports, structure, Lucide icons, etc). Do not break logic.
    
    If the file is a Server Component that is async (like app/[locale]/page.tsx), you can still use \`useTranslations\` but remember it might need to await \`getTranslations\` if next-intl requires it in async server components (use \`const t = await getTranslations('${namespace}');\`). Or just make sure it's correct.

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
      allEnKeys[namespace] = result.enKeys;
      console.log(`Saved ${file}`);
    } catch (err) {
      console.error(`Error processing ${file}:`, err.message);
    }
  }

  fs.writeFileSync('core_keys.json', JSON.stringify(allEnKeys, null, 2));
  console.log('Done core!');
}

import path from 'path';
main();
