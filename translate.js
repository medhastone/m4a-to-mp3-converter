import fs from 'fs';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function translateDictionary(sourceDict, targetLang) {
  const prompt = `
  You are an expert translator. Translate the following JSON dictionary of UI strings into ${targetLang}.
  Ensure that you preserve ALL JSON keys exactly as they are.
  Translate the values. Ensure you maintain correct HTML tags, placeholders like {value}, and technical terms (e.g. M4A, MP3, kbps, WebAssembly) should generally remain in English if that's standard for the language.
  
  Source JSON:
  ${JSON.stringify(sourceDict)}
  
  Output MUST be valid JSON only. Do not wrap in markdown \`\`\`json.
  `;
  
  const response = await ai.models.generateContent({
    model: 'gemini-3.6-flash',
    contents: [prompt]
  });
  
  let text = response.text;
  text = text.replace(/```json/g, '').replace(/```/g, '').trim();
  return JSON.parse(text);
}

async function main() {
  let en = JSON.parse(fs.readFileSync('messages/en.json', 'utf-8'));
  
  if (fs.existsSync('extracted_keys.json')) {
      const extracted = JSON.parse(fs.readFileSync('extracted_keys.json', 'utf-8'));
      Object.assign(en, extracted);
  }
  
  if (fs.existsSync('core_keys.json')) {
      const core = JSON.parse(fs.readFileSync('core_keys.json', 'utf-8'));
      Object.assign(en, core);
  }
  
  fs.writeFileSync('messages/en.json', JSON.stringify(en, null, 2));
  
  const languages = [
      { code: 'es', name: 'Spanish' },
      { code: 'fr', name: 'French' },
      { code: 'de', name: 'German' },
      { code: 'pt', name: 'Portuguese' }
  ];
  
  for (const lang of languages) {
      console.log(`Translating to ${lang.name}...`);
      try {
          const translated = await translateDictionary(en, lang.name);
          fs.writeFileSync(`messages/${lang.code}.json`, JSON.stringify(translated, null, 2));
          console.log(`Done ${lang.name}`);
      } catch (err) {
          console.error(`Failed ${lang.name}:`, err.message);
      }
  }
  console.log('All translations done.');
}

main();
