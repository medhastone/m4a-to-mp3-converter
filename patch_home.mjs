import fs from 'fs';

let content = fs.readFileSync('app/[locale]/page.tsx', 'utf8');

const target = `export default async function Home({ params }: { params: Promise<{ locale: string }> }) {`;
const replacement = `import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const t = await getTranslations({ locale });
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {`;

content = content.replace(target, replacement);
fs.writeFileSync('app/[locale]/page.tsx', content);
console.log('Home metadata patched');
