import fs from 'fs';
import { translate } from '@vitalets/google-translate-api';

const enData = JSON.parse(fs.readFileSync('./messages/en.json', 'utf8'));
const ruData = JSON.parse(fs.readFileSync('./messages/ru.json', 'utf8'));

const stringsToTranslate = []; // { obj, key, text }

function collect(enObj, ruObj, path) {
  for (const key in enObj) {
    if (typeof enObj[key] === 'string') {
      if (ruObj[key] === enObj[key]) {
        stringsToTranslate.push({ obj: ruObj, key, text: enObj[key], path: path ? `${path}.${key}` : key });
      }
    } else if (typeof enObj[key] === 'object' && enObj[key] !== null) {
      if (!ruObj[key]) ruObj[key] = {};
      collect(enObj[key], ruObj[key], path ? `${path}.${key}` : key);
    }
  }
}
collect(enData, ruData, '');

async function main() {
  console.log(`Found ${stringsToTranslate.length} strings to translate.`);
  let i = 0;
  
  // Try parallel with 15 workers
  const workers = Array.from({length: 15}).map(async () => {
    while (true) {
      const idx = i++;
      if (idx >= stringsToTranslate.length) break;
      const item = stringsToTranslate[idx];
      
      let success = false;
      let retries = 0;
      while (!success && retries < 5) {
        try {
          const { text } = await translate(item.text, { to: 'ru' });
          item.obj[item.key] = text;
          success = true;
          if (idx % 20 === 0) console.log(`Translated ${idx}/${stringsToTranslate.length}`);
        } catch(e) {
          retries++;
          await new Promise(r => setTimeout(r, 1000 + Math.random() * 2000));
        }
      }
      if (!success) {
        console.log(`Failed to translate: ${item.text.slice(0, 20)}`);
      }
    }
  });
  
  await Promise.all(workers);
  fs.writeFileSync('./messages/ru.json', JSON.stringify(ruData, null, 2));
  console.log('Done fast translation!');
}
main();
