const fs = require('fs');
const en = JSON.parse(fs.readFileSync('./messages/en.json', 'utf8'));
const ru = JSON.parse(fs.readFileSync('./messages/ru.json', 'utf8'));

function traverse(enObj, ruObj) {
  for (const key in enObj) {
    if (typeof enObj[key] === 'string') {
      if (ruObj[key] === enObj[key]) console.log(key, ':', enObj[key]);
    } else if (typeof enObj[key] === 'object' && enObj[key] !== null) {
      if (ruObj[key]) traverse(enObj[key], ruObj[key]);
    }
  }
}
traverse(en, ru);
