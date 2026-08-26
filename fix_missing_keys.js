import fs from 'fs';
import path from 'path';

function getFiles(dir, files = []) {
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const name = dir + '/' + file;
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files);
    } else if (name.endsWith('.tsx') || name.endsWith('.ts')) {
      files.push(name);
    }
  }
  return files;
}

const allFiles = getFiles('app');
let en = JSON.parse(fs.readFileSync('messages/en.json', 'utf-8'));

for (const file of allFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  
  // Find namespace: const t = useTranslations('namespace');
  const nsMatch = content.match(/useTranslations\(['"]([^'"]+)['"]\)/);
  if (!nsMatch) continue;
  const ns = nsMatch[1];
  
  if (!en[ns]) en[ns] = {};
  
  // Find all t('key') or t("key")
  const regex = /t\(['"]([^'"]+)['"]/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const key = match[1];
    if (!en[ns][key]) {
      // Create fallback string: hero_title_span -> Hero Title Span
      en[ns][key] = key.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      console.log(`Added missing key: ${ns}.${key} = ${en[ns][key]}`);
    }
  }
}

fs.writeFileSync('messages/en.json', JSON.stringify(en, null, 2));
console.log('Fixed missing keys!');
