import fs from 'fs';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const delay = ms => new Promise(res => setTimeout(res, ms));

async function translateWithGemini(obj, lang) {
  // If the object is empty, return empty
  if (Object.keys(obj).length === 0) return {};
  
  const prompt = `
  You are an expert translator. Translate the string values in the following JSON object to the language code '${lang}'.
  Keep the JSON keys exactly the same. Do not translate the keys.
  Respond ONLY with the translated JSON object. Do not include markdown code block formatting like \`\`\`json.
  
  JSON to translate:
  ${JSON.stringify(obj, null, 2)}
  `;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt
    });
    
    let text = response.text.replace(/```json/gi, '').replace(/```/g, '').trim();
    return JSON.parse(text);
  } catch(e) {
    console.error("Gemini Error:", e.message);
    return obj;
  }
}

async function main() {
  const enPath = 'messages/en.json';
  const en = JSON.parse(fs.readFileSync(enPath, 'utf-8'));
  const langs = ['es', 'fr', 'de', 'pt'];
  
  for (const lang of langs) {
    console.log(`Translating to ${lang}...`);
    let translatedJson = JSON.parse(fs.readFileSync(`messages/${lang}.json`, 'utf-8'));
    
    // Check if we need to translate wav_to_mp3
    if (!translatedJson.wav_to_mp3 || Object.keys(translatedJson.wav_to_mp3).length < Object.keys(en.wav_to_mp3).length) {
      console.log('Translating wav_to_mp3...');
      translatedJson.wav_to_mp3 = await translateWithGemini(en.wav_to_mp3, lang);
      await delay(2000);
    }
    
    // Check if we need to translate wav_to_mp3_seo
    if (!translatedJson.wav_to_mp3_seo || Object.keys(translatedJson.wav_to_mp3_seo).length < Object.keys(en.wav_to_mp3_seo).length) {
      console.log('Translating wav_to_mp3_seo...');
      translatedJson.wav_to_mp3_seo = await translateWithGemini(en.wav_to_mp3_seo, lang);
      await delay(2000);
    }
    
    fs.writeFileSync(`messages/${lang}.json`, JSON.stringify(translatedJson, null, 2));
    console.log(`Done ${lang}.json`);
  }
}

main();
