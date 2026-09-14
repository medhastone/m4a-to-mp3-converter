import fs from 'fs';
import path from 'path';

const locales = ['en', 'es', 'fr', 'de', 'pt', 'ru'];
const basePath = 'app/[locale]';
const dirs = fs.readdirSync(basePath).filter(f => fs.statSync(path.join(basePath, f)).isDirectory());

// We'll generate English metadata for all missing ones, and append it to all JSONs
const englishMeta = {
  '320kbps': { title: 'Convert M4A to 320kbps MP3 Online Free', desc: 'Convert M4A files to studio-master 320kbps MP3s directly in your browser. Maximum audio fidelity with zero file uploads.' },
  'batch-converter': { title: 'Batch M4A to MP3 Converter - No Size Limit', desc: 'Bulk convert multiple large M4A files to MP3 at once. Zero upload limits, fast local browser processing.' },
  'client-side-safe': { title: '100% Client-Side Safe Audio Converter', desc: 'Secure M4A to MP3 conversion that never uploads your files. Perfect for legal, medical, and private voice recordings.' },
  'iphone-voice-memos': { title: 'Convert iPhone Voice Memos (M4A) to MP3', desc: 'Easily convert iOS Voice Memos (.m4a) to universal MP3 format. Keep your recordings private with our zero-upload tool.' },
  'mac': { title: 'Convert M4A to MP3 on Mac without iTunes', desc: 'The fastest way to convert M4A to MP3 on Mac, Android, and Chromebook natively in your browser.' },
  'privacy-policy': { title: 'Privacy Policy - M4A to MP3 Converter', desc: 'Read our zero-upload privacy policy. Your audio files are processed locally and never touch our servers.' },
  'terms': { title: 'Terms of Service - M4A to MP3 Converter', desc: 'Terms of service and usage conditions for our free client-side audio conversion tools.' },
  'windows': { title: 'Convert M4A to MP3 on Windows PC', desc: 'Easily convert Apple M4A audio files to MP3 on Windows 10 & 11 natively without installing any software.' },
};

// 1. First, inject these into all JSON messages
const msgDir = 'messages';
for (const locale of locales) {
  const file = path.join(msgDir, `${locale}.json`);
  if (!fs.existsSync(file)) continue;
  
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  
  for (const [dir, meta] of Object.entries(englishMeta)) {
    const ns = dir.replace(/-/g, '_');
    if (!data[ns]) data[ns] = {};
    // Only set if not already present
    if (!data[ns].meta_title) data[ns].meta_title = meta.title;
    if (!data[ns].meta_description) data[ns].meta_description = meta.desc;
  }
  
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

// 2. Rewrite generateMetadata in the page.tsx files to rely strictly on tSpecific('meta_title')
for (const dir of dirs) {
  const pagePath = path.join(basePath, dir, 'page.tsx');
  if (fs.existsSync(pagePath)) {
    let content = fs.readFileSync(pagePath, 'utf8');
    
    // Check if it's one of the ones we want to overwrite
    if (Object.keys(englishMeta).includes(dir)) {
      const match = content.match(/export async function generateMetadata.*?return \{.*?\};?\n\}/s);
      if (match) {
        const ns = dir.replace(/-/g, '_');
        const replacement = `export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const t = await getTranslations({ locale, namespace: '${ns}' });
  const domain = 'https://m4atomp3converter.com';
  const path = '/${dir}';
  
  return {
    title: t('meta_title'),
    description: t('meta_description'),
    alternates: {
      canonical: \`\${domain}/\${locale}\${path}\`,
      languages: {
        'en': \`\${domain}/en\${path}\`,
        'es': \`\${domain}/es\${path}\`,
        'fr': \`\${domain}/fr\${path}\`,
        'de': \`\${domain}/de\${path}\`,
        'pt': \`\${domain}/pt\${path}\`,
        'ru': \`\${domain}/ru\${path}\`,
        'x-default': \`\${domain}/en\${path}\`,
      },
    },
  };
}`;
        content = content.replace(match[0], replacement);
        fs.writeFileSync(pagePath, content);
        console.log(`Updated generateMetadata for ${dir}`);
      }
    }
  }
}
