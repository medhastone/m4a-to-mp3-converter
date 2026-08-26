const fs = require('fs');
const path = require('path');

const locales = ['de', 'es', 'fr', 'pt'];

for (const lang of locales) {
  const file = path.join(__dirname, `../app/${lang}/page.tsx`);
  let content = fs.readFileSync(file, 'utf8');
  
  // A naive replacement of all single quotes that are inside text nodes is tricky with regex.
  // We can just use &apos; for words.
  // Actually, wait, replacing all ' with &apos; might break imports if they use '.
  // So let's only replace it where there's a letter before and after, like in "l'outil"
  // Wait, in JSX text, single quotes need escaping. Let's just do a specific regex replace for letters around a single quote:
  // e.g. /([a-zA-Z])'([a-zA-Z])/g -> $1&apos;$2
  
  content = content.replace(/([a-zA-Z])'([a-zA-Z])/g, "$1&apos;$2");
  
  // Also we had browser's
  content = content.replace(/browser's/g, "browser&apos;s");
  
  // also words like l'outil -> l&apos;outil
  content = content.replace(/l'outil/g, "l&apos;outil");
  content = content.replace(/d'appareil/g, "d&apos;appareil");
  
  // In French specifically there are many. Let's just replace any single quote that isn't part of an import or className.
  // A safer bet: we know the exact strings that caused it. They are in the French strings.
  
  fs.writeFileSync(file, content);
  console.log(`Escaped quotes in app/${lang}/page.tsx`);
}
