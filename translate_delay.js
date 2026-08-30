import fs from 'fs';
import { translate } from '@vitalets/google-translate-api';

const delay = ms => new Promise(res => setTimeout(res, ms));

async function main() {
  const en = JSON.parse(fs.readFileSync('messages/en.json', 'utf-8'));
  const langs = ['es', 'fr', 'de', 'pt'];
  
  for (const lang of langs) {
    console.log(`Translating to ${lang}...`);
    let translatedJson = JSON.parse(fs.readFileSync(`messages/${lang}.json`, 'utf-8'));
    
    // translate wav_to_mp3
    if (!translatedJson.wav_to_mp3) translatedJson.wav_to_mp3 = {};
    for (const key in en.wav_to_mp3) {
      if (translatedJson.wav_to_mp3[key] && translatedJson.wav_to_mp3[key] !== en.wav_to_mp3[key]) {
        continue; // Already translated
      }
      try {
        const res = await translate(en.wav_to_mp3[key], { to: lang, fetch: globalThis.fetch });
        translatedJson.wav_to_mp3[key] = res.text;
        await delay(1500);
      } catch (e) {
        translatedJson.wav_to_mp3[key] = en.wav_to_mp3[key];
      }
    }

    // translate wav_to_mp3_seo
    if (!translatedJson.wav_to_mp3_seo) translatedJson.wav_to_mp3_seo = {};
    for (const key in en.wav_to_mp3_seo) {
      if (translatedJson.wav_to_mp3_seo[key] && translatedJson.wav_to_mp3_seo[key] !== en.wav_to_mp3_seo[key]) {
        continue;
      }
      try {
        const res = await translate(en.wav_to_mp3_seo[key], { to: lang, fetch: globalThis.fetch });
        translatedJson.wav_to_mp3_seo[key] = res.text;
        await delay(1500);
      } catch (e) {
        translatedJson.wav_to_mp3_seo[key] = en.wav_to_mp3_seo[key];
      }
    }
    
    fs.writeFileSync(`messages/${lang}.json`, JSON.stringify(translatedJson, null, 2));
    console.log(`Done ${lang}.json`);
  }
}

main();
