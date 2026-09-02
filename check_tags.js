const fs = require('fs');

const files = fs.readdirSync('./messages').filter(f => f.endsWith('.json'));
for (const file of files) {
  const data = JSON.parse(fs.readFileSync('./messages/' + file, 'utf8'));
  const check = (obj) => {
    for (const key in obj) {
      if (typeof obj[key] === 'string') {
        const text = obj[key];
        const openTags = (text.match(/<[^/][^>]*>/g) || []).map(t => t.replace(/<|>/g, ''));
        const closeTags = (text.match(/<\/[^>]+>/g) || []).map(t => t.replace(/<\/|>/g, ''));
        
        openTags.forEach(t => {
          if (!closeTags.includes(t)) {
            console.log(`Mismatch in ${file} [${key}]: missing </${t}>`);
          }
        });
        closeTags.forEach(t => {
          if (!openTags.includes(t)) {
            console.log(`Mismatch in ${file} [${key}]: missing <${t}>`);
          }
        });
      } else if (typeof obj[key] === 'object' && obj[key]) {
        check(obj[key]);
      }
    }
  };
  check(data);
}
