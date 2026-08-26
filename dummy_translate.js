import fs from 'fs';

const en = JSON.parse(fs.readFileSync('messages/en.json', 'utf-8'));
const langs = ['es', 'fr', 'de', 'pt'];

for (const lang of langs) {
  let translatedJson = JSON.parse(JSON.stringify(en));
  
  function translateObject(obj) {
    for (const key in obj) {
      if (typeof obj[key] === 'object') {
        translateObject(obj[key]);
      } else if (typeof obj[key] === 'string') {
        obj[key] = `[${lang.toUpperCase()}] ${obj[key]}`;
      }
    }
  }
  
  translateObject(translatedJson);
  fs.writeFileSync(`messages/${lang}.json`, JSON.stringify(translatedJson, null, 2));
}
console.log('Dummy translations created');
