import fs from 'fs';
import { translate } from '@vitalets/google-translate-api';

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const enData = JSON.parse(fs.readFileSync('./messages/en.json', 'utf8'));
  let ruData = {};
  try {
    ruData = JSON.parse(fs.readFileSync('./messages/ru.json', 'utf8'));
  } catch (e) {
    ruData = JSON.parse(JSON.stringify(enData));
  }

  // Helper to recursively translate
  async function traverse(enObj, ruObj) {
    for (const key in enObj) {
      if (typeof enObj[key] === 'string') {
        // If it's missing, is "[объект Объект]", or is identical to English (untranslated)
        if (!ruObj[key] || ruObj[key] === '[объект Объект]' || ruObj[key] === enObj[key]) {
          ruObj[key] = enObj[key]; // ensure it's at least English before trying
          let retries = 0;
          let success = false;
          while (!success && retries < 3) {
            try {
              const res = await translate(enObj[key], { to: 'ru' });
              ruObj[key] = res.text;
              success = true;
              console.log(`Translated: ${key}`);
            } catch (err) {
              retries++;
              await sleep(2000); // Back off
            }
          }
          await sleep(500); // Rate limit protection for free API
        }
      } else if (typeof enObj[key] === 'object' && enObj[key] !== null) {
        if (!ruObj[key] || typeof ruObj[key] !== 'object') {
          ruObj[key] = {};
        }
        await traverse(enObj[key], ruObj[key]);
      }
    }
  }

  console.log('Starting free fallback translation...');
  await traverse(enData, ruData);
  fs.writeFileSync('./messages/ru.json', JSON.stringify(ruData, null, 2));
  console.log('Translation complete!');
}

main().catch(console.error);
