const fs = require('fs');
const en = JSON.parse(fs.readFileSync('./messages/en.json', 'utf8'));
const ru = JSON.parse(fs.readFileSync('./messages/ru.json', 'utf8'));

// Copy all structure from EN. If RU has a translated string, keep it.
function merge(enObj, ruObj) {
  const result = {};
  for (const key in enObj) {
    if (typeof enObj[key] === 'string') {
      if (typeof ruObj[key] === 'string' && ruObj[key] !== '[объект Объект]') {
        result[key] = ruObj[key];
      } else {
        result[key] = enObj[key]; // fallback to english
      }
    } else if (typeof enObj[key] === 'object' && enObj[key] !== null) {
      if (typeof ruObj[key] === 'object' && ruObj[key] !== null) {
        result[key] = merge(enObj[key], ruObj[key]);
      } else {
        result[key] = merge(enObj[key], {});
      }
    }
  }
  return result;
}

const fixedRu = merge(en, ru);
fs.writeFileSync('./messages/ru.json', JSON.stringify(fixedRu, null, 2));
console.log('Fixed ru.json');
