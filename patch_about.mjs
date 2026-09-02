import fs from 'fs';

let content = fs.readFileSync('app/[locale]/about/page.tsx', 'utf8');

const target = `export default async function Page({ params }: { params: Promise<{ locale: string }> }) {`;
const replacement = `import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const t = await getTranslations({ locale, namespace: 'about' });
  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {`;

content = content.replace(target, replacement);
fs.writeFileSync('app/[locale]/about/page.tsx', content);
console.log('About metadata patched');
