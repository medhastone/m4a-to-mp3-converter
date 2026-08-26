const fs = require('fs');
const path = require('path');

const locales = ['ja', 'es', 'de', 'pt', 'fr'];

for (const lang of locales) {
  const file = path.join(__dirname, `../app/${lang}/page.tsx`);
  let content = fs.readFileSync(file, 'utf8');
  // Fix imports from './components/...' to '../components/...'
  content = content.replace(/from "\.\/components/g, 'from "../components');
  content = content.replace(/from '\.\/components/g, 'from \'../components');
  fs.writeFileSync(file, content);
  console.log(`Fixed imports in app/${lang}/page.tsx`);
}
