import fs from 'fs';
import { translate } from '@vitalets/google-translate-api';

async function main() {
  const en = JSON.parse(fs.readFileSync('messages/en.json', 'utf-8'));
  const langs = ['es', 'fr', 'de', 'pt'];
  
  for (const lang of langs) {
    console.log(`Translating to ${lang}...`);
    let translatedJson = JSON.parse(fs.readFileSync(`messages/${lang}.json`, 'utf-8'));
    
    // We only need to translate wav_to_mp3 object
    const objToTranslate = en.wav_to_mp3;
    translatedJson.wav_to_mp3 = {};
    
    for (const key in objToTranslate) {
      if (typeof objToTranslate[key] === 'string') {
        try {
          const res = await translate(objToTranslate[key], { to: lang, fetch: globalThis.fetch });
          translatedJson.wav_to_mp3[key] = res.text;
        } catch (e) {
          console.error(`Error translating ${objToTranslate[key]}:`, e.message);
          translatedJson.wav_to_mp3[key] = objToTranslate[key]; // fallback to english
        }
      }
    }
    
    fs.writeFileSync(`messages/${lang}.json`, JSON.stringify(translatedJson, null, 2));
    console.log(`Done ${lang}.json`);
  }
}

main();
