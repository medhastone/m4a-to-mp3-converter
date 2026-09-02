import fs from 'fs';
import { translate } from '@vitalets/google-translate-api';

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function translateText(text) {
  if (!text || typeof text !== 'string') return text;
  
  // Quick skip for tags or placeholders only if it's tricky, but Google Translate handles simple text fine
  let success = false;
  let retries = 0;
  while (!success && retries < 10) {
    try {
      const { text: result } = await translate(text, { to: 'ru' });
      return result;
    } catch (err) {
      retries++;
      await sleep(1000);
    }
  }
  return text; // Fallback
}

async function traverseAndTranslate(obj) {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object' && value !== null) {
      result[key] = await traverseAndTranslate(value);
    } else if (typeof value === 'string') {
      result[key] = await translateText(value);
      console.log(`Translated key: ${key}`);
    } else {
      result[key] = value;
    }
  }
  return result;
}

async function main() {
  const enData = JSON.parse(fs.readFileSync('./messages/en.json', 'utf8'));
  const ruData = await traverseAndTranslate(enData);
  fs.writeFileSync('./messages/ru.json', JSON.stringify(ruData, null, 2));
  console.log('Translation complete!');
}

main().catch(console.error);
