import fs from 'fs';
import path from 'path';

const basePath = 'app/[locale]';
const dirs = fs.readdirSync(basePath).filter(f => fs.statSync(path.join(basePath, f)).isDirectory());

for (const dir of dirs) {
  const pagePath = path.join(basePath, dir, 'page.tsx');
  if (fs.existsSync(pagePath)) {
    let content = fs.readFileSync(pagePath, 'utf8');
    
    // Ensure we are exporting generateMetadata
    if (!content.includes('export async function generateMetadata')) {
      const match = content.match(/export default (async )?function [A-Za-z0-9_]+\s*\(/);
      if (match) {
        const replacement = `import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const t = await getTranslations({ locale });
  const namespace = '${dir.replace(/-/g, '_')}';
  let title = t('title');
  let description = t('description');
  try {
     const tSpecific = await getTranslations({ locale, namespace });
     if (tSpecific.has('meta_title')) title = tSpecific('meta_title');
     else if (tSpecific.has('hero_title_prefix')) title = tSpecific('hero_title_prefix') + ' ' + (tSpecific.has('hero_title_highlight') ? tSpecific('hero_title_highlight') : '');
     
     if (tSpecific.has('meta_description')) description = tSpecific('meta_description');
     else if (tSpecific.has('meta_desc')) description = tSpecific('meta_desc');
  } catch(e){}
  
  return {
    title,
    description,
    alternates: {
      canonical: \`https://m4atomp3converter.com/\${locale}/\${'${dir}'}\`,
      languages: {
        'en': \`https://m4atomp3converter.com/en/\${'${dir}'}\`,
        'es': \`https://m4atomp3converter.com/es/\${'${dir}'}\`,
        'fr': \`https://m4atomp3converter.com/fr/\${'${dir}'}\`,
        'de': \`https://m4atomp3converter.com/de/\${'${dir}'}\`,
        'pt': \`https://m4atomp3converter.com/pt/\${'${dir}'}\`,
        'ru': \`https://m4atomp3converter.com/ru/\${'${dir}'}\`,
        'x-default': \`https://m4atomp3converter.com/en/\${'${dir}'}\`,
      },
    },
  };
}

${match[0]}`;
        content = content.replace(match[0], replacement);
        fs.writeFileSync(pagePath, content);
        console.log(`Patched metadata for ${dir} (Missing metadata)`);
      }
    } else {
      // It has generateMetadata, make sure it has title and description
      if (!content.includes('title:') && !content.includes('title :')) {
         // Patch it manually 
         content = content.replace(
           /alternates: \{/,
           `title: "${dir.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} - M4A to MP3 Converter",\n    description: "Convert M4A to MP3 easily and locally.",\n    alternates: {`
         );
         fs.writeFileSync(pagePath, content);
         console.log(`Patched metadata for ${dir} (Added fallback title/desc)`);
      }
    }
  }
}
console.log('All metadata patched');
