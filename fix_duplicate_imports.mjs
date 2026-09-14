import fs from 'fs';
import path from 'path';

const basePath = 'app/[locale]';
const dirs = fs.readdirSync(basePath).filter(f => fs.statSync(path.join(basePath, f)).isDirectory());

for (const dir of dirs) {
  const pagePath = path.join(basePath, dir, 'page.tsx');
  if (fs.existsSync(pagePath)) {
    let content = fs.readFileSync(pagePath, 'utf8');
    
    // Check if `import { getTranslations } from 'next-intl/server';` exists alongside `import { getTranslations, setRequestLocale } from 'next-intl/server';`
    const extraImport = `import { getTranslations } from 'next-intl/server';\n`;
    if (content.includes(extraImport) && content.includes(`import { getTranslations, setRequestLocale }`)) {
      content = content.replace(extraImport, '');
      fs.writeFileSync(pagePath, content);
      console.log(`Removed duplicate getTranslations in ${dir}`);
    } else if (content.includes(extraImport) && content.includes(`import { setRequestLocale, getTranslations }`)) {
      content = content.replace(extraImport, '');
      fs.writeFileSync(pagePath, content);
      console.log(`Removed duplicate getTranslations in ${dir}`);
    }
  }
}
