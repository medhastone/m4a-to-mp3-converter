import type { Metadata } from 'next';
import { getDawArticleContent } from '@/lib/translations/what-is-a-daw';
import WhatIsADawPage from '../../what-is-a-daw/page';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = resolvedParams.locale || 'en';
  const content = getDawArticleContent(locale);
  const canonicalUrl = `https://m4atomp3converter.com/${locale}/blog/what-is-a-daw`;

  return {
    title: content.metadata.title,
    description: content.metadata.description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: 'https://m4atomp3converter.com/en/blog/what-is-a-daw',
        es: 'https://m4atomp3converter.com/es/blog/what-is-a-daw',
        fr: 'https://m4atomp3converter.com/fr/blog/what-is-a-daw',
        de: 'https://m4atomp3converter.com/de/blog/what-is-a-daw',
        pt: 'https://m4atomp3converter.com/pt/blog/what-is-a-daw',
        ru: 'https://m4atomp3converter.com/ru/blog/what-is-a-daw',
        'x-default': 'https://m4atomp3converter.com/en/blog/what-is-a-daw',
      },
    },
    openGraph: {
      title: content.metadata.ogTitle,
      description: content.metadata.ogDescription,
      url: canonicalUrl,
      siteName: 'M4A to MP3 Converter.com',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: content.metadata.ogTitle,
      description: content.metadata.ogDescription,
    },
  };
}

export default WhatIsADawPage;
