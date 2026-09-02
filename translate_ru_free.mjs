import fs from 'fs';
import { translate } from '@vitalets/google-translate-api';

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const enData = JSON.parse(fs.readFileSync('./messages/en.json', 'utf8'));
  const entries = Object.entries(enData);
  const ruData = {};
  
  for (let i = 0; i < entries.length; i++) {
    const [key, value] = entries[i];
    
    // Skip empty strings
    if (!value) {
      ruData[key] = value;
      continue;
    }

    let success = false;
    let retries = 0;
    while (!success && retries < 10) {
      try {
        const { text } = await translate(value, { to: 'ru' });
        ruData[key] = text;
        success = true;
        if (i % 20 === 0) console.log(`Translated ${i}/${entries.length}`);
      } catch (err) {
        retries++;
        console.error(`Error on key ${key}, retrying...`, err.message);
        await sleep(2000);
      }
    }
    if (!success) {
      ruData[key] = value; // Fallback to English
    }
  }

  fs.writeFileSync('./messages/ru.json', JSON.stringify(ruData, null, 2));
  console.log('Translation complete!');
}

main().catch(console.error);
