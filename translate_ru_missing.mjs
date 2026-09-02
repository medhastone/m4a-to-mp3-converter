import fs from 'fs';
import { translate } from '@vitalets/google-translate-api';

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const enData = JSON.parse(fs.readFileSync('./messages/en.json', 'utf8'));
  const ruData = JSON.parse(fs.readFileSync('./messages/ru.json', 'utf8'));

  let translatedCount = 0;
  let errorCount = 0;

  async function traverse(enObj, ruObj, path) {
    for (const key in enObj) {
      if (typeof enObj[key] === 'string') {
        // If ru is identical to en, it means it's not translated yet
        if (ruObj[key] === enObj[key]) {
          let retries = 0;
          let success = false;
          while (!success && retries < 5) {
            try {
              const res = await translate(enObj[key], { to: 'ru' });
              ruObj[key] = res.text;
              success = true;
              translatedCount++;
              console.log(`Translated [${path ? path + '.' + key : key}]: ${res.text.substring(0, 30)}...`);
              fs.writeFileSync('./messages/ru.json', JSON.stringify(ruData, null, 2));
            } catch (err) {
              retries++;
              await sleep(1000 + Math.random() * 2000);
            }
          }
          if (!success) {
            console.error(`Failed to translate: ${enObj[key]}`);
            errorCount++;
          }
          await sleep(500); // rate limiting
        }
      } else if (typeof enObj[key] === 'object' && enObj[key] !== null) {
        if (!ruObj[key]) ruObj[key] = {};
        await traverse(enObj[key], ruObj[key], path ? `${path}.${key}` : key);
      }
    }
  }

  console.log('Starting translation of missing strings...');
  await traverse(enData, ruData, '');
  console.log(`Translation complete! Translated: ${translatedCount}, Errors: ${errorCount}`);
}

main().catch(console.error);
