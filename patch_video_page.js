const fs = require('fs');

let content = fs.readFileSync('app/[locale]/video-to-mp3/page.tsx', 'utf8');

if (!content.includes("import { getTranslations } from 'next-intl/server';")) {
  content = content.replace("import { setRequestLocale } from 'next-intl/server';", "import { setRequestLocale, getTranslations } from 'next-intl/server';");
}

content = content.replace(
  /export async function generateMetadata\(\{ params \}: \{ params: Promise<\{ locale: string \}> \}\): Promise<Metadata> \{\s*const resolvedParams = await params;\s*return \{\s*title: 'Free MP4 to MP3 Converter Online \(320kbps\)',\s*description: 'Convert MP4 to MP3 online for free at up to 320kbps with zero file size limits. Batch convert large videos locally in your browser with no upload lag.',\s*\};\s*\}/,
  `export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'video_page' });
  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}`
);

fs.writeFileSync('app/[locale]/video-to-mp3/page.tsx', content);
