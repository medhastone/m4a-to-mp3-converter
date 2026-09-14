import fs from 'fs';
import path from 'path';

const basePath = 'app/[locale]';
const dirs = fs.readdirSync(basePath).filter(f => fs.statSync(path.join(basePath, f)).isDirectory());

for (const dir of dirs) {
  const pagePath = path.join(basePath, dir, 'page.tsx');
  if (fs.existsSync(pagePath)) {
    let content = fs.readFileSync(pagePath, 'utf8');
    
    let changed = false;
    if (content.includes('Promise<Metadata>') && !content.includes("import type { Metadata }") && !content.includes("import { Metadata }")) {
      content = `import type { Metadata } from 'next';\n` + content;
      changed = true;
    }
    
    if (content.includes('await getTranslations') && !content.includes("getTranslations } from 'next-intl/server'") && !content.includes("getTranslations} from 'next-intl/server'")) {
      if (content.includes("import { setRequestLocale } from 'next-intl/server'")) {
        content = content.replace("import { setRequestLocale } from 'next-intl/server'", "import { setRequestLocale, getTranslations } from 'next-intl/server'");
      } else {
        content = `import { getTranslations } from 'next-intl/server';\n` + content;
      }
      changed = true;
    }
    
    if (changed) {
      fs.writeFileSync(pagePath, content);
      console.log(`Fixed imports in ${dir}`);
    }
  }
}
