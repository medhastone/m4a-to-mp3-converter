import fs from 'fs';
import { translate } from '@vitalets/google-translate-api';

async function main() {
  const en = JSON.parse(fs.readFileSync('messages/en.json', 'utf-8'));
  const langs = ['es', 'fr', 'de', 'pt'];
  
  for (const lang of langs) {
    console.log(`Translating to ${lang}...`);
    let translatedJson = JSON.parse(JSON.stringify(en)); 
    
    async function translateObject(obj) {
      for (const key in obj) {
        if (typeof obj[key] === 'object') {
          await translateObject(obj[key]);
        } else if (typeof obj[key] === 'string') {
          try {
            const res = await translate(obj[key], { to: lang, fetch: globalThis.fetch });
            obj[key] = res.text;
          } catch (e) {
            console.error(`Error translating ${obj[key]}:`, e.message);
          }
        }
      }
    }
    
    await translateObject(translatedJson);
    fs.writeFileSync(`messages/${lang}.json`, JSON.stringify(translatedJson, null, 2));
    console.log(`Done ${lang}.json`);
  }
}

main();
