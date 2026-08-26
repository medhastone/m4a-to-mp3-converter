import fs from 'fs';

const pages = [
  'windows', 'client-side-safe', 'batch-converter', 'iphone-voice-memos', 
  'privacy-policy', '320kbps', 'terms', 'mac', 'about'
];

for (const page of pages) {
  const file = `app/[locale]/${page}/page.tsx`;
  if (!fs.existsSync(file)) continue;
  
  let content = fs.readFileSync(file, 'utf-8');
  
  if (content.includes('generateMetadata')) continue;
  
  const metadataStr = `
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const domain = 'https://m4atomp3converter.com';
  const path = '/${page}';
  
  return {
    alternates: {
      canonical: \`\${domain}/\${locale}\${path}\`,
      languages: {
        'en': \`\${domain}/en\${path}\`,
        'es': \`\${domain}/es\${path}\`,
        'fr': \`\${domain}/fr\${path}\`,
        'de': \`\${domain}/de\${path}\`,
        'pt': \`\${domain}/pt\${path}\`,
        'x-default': \`\${domain}/en\${path}\`,
      },
    },
  };
}
`;

  content = content.replace('export default function', metadataStr + '\nexport default function');
  fs.writeFileSync(file, content);
  console.log(`Injected metadata to ${page}`);
}
