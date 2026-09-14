import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import Mp3ToWavConverter from '../../components/Mp3ToWavConverter';
import Mp3ToWavSEO from '../../components/Mp3ToWavSEO';
import { ShieldCheck, Cpu, Layers, Disc } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = resolvedParams.locale || 'en';
  const t = await getTranslations({ locale, namespace: 'mp3_to_wav_page' });

  const title = t('meta_title');
  const description = t('meta_desc');
  const canonicalUrl = `https://m4atomp3converter.com/${locale === 'en' ? 'en' : locale}/mp3-to-wav`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: 'https://m4atomp3converter.com/en/mp3-to-wav',
        es: 'https://m4atomp3converter.com/es/mp3-to-wav',
        fr: 'https://m4atomp3converter.com/fr/mp3-to-wav',
        de: 'https://m4atomp3converter.com/de/mp3-to-wav',
        pt: 'https://m4atomp3converter.com/pt/mp3-to-wav',
        ru: 'https://m4atomp3converter.com/ru/mp3-to-wav',
        'x-default': 'https://m4atomp3converter.com/en/mp3-to-wav',
      },
    },
    openGraph: {
      title: t('og_title'),
      description: t('og_desc'),
      url: canonicalUrl,
      siteName: 'M4A to MP3 Converter',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('og_title'),
      description: t('og_desc'),
    },
  };
}

export default async function Mp3ToWavPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale || 'en';
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'mp3_to_wav_page' });
  const tSeo = await getTranslations({ locale, namespace: 'mp3_to_wav_seo' });

  // Merged Schema.org JSON-LD (SoftwareApplication + HowTo + FAQPage)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: t('jsonLd_software_name'),
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'All (Web Browser)',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description: t('jsonLd_software_desc'),
      },
      {
        '@type': 'HowTo',
        name: t('jsonLd_howto_name'),
        description: t('jsonLd_howto_desc'),
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: t('jsonLd_step1_name'),
            text: t('jsonLd_step1_text'),
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: t('jsonLd_step2_name'),
            text: t('jsonLd_step2_text'),
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: t('jsonLd_step3_name'),
            text: t('jsonLd_step3_text'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [1, 2, 3, 4, 5, 6].map((num) => ({
          '@type': 'Question',
          name: tSeo(`faq${num}_q` as any),
          acceptedAnswer: {
            '@type': 'Answer',
            text: tSeo(`faq${num}_a` as any),
          },
        })),
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#06090e] text-slate-100 flex flex-col selection:bg-orange-500/30">
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 flex flex-col items-center">
        {/* Hero Section */}
        <div className="text-center mb-10 w-full max-w-4xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/20 mb-6 shadow-sm">
            <Disc className="w-3.5 h-3.5" />
            <span>{t('badge')}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-5 leading-tight">
            <span className="text-orange-400">{t('h1_highlight')}</span> {t('h1_suffix')}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
            {t('subtitle')}
          </p>

          {/* 4 Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-medium text-slate-200 shadow-sm">
              <Cpu className="w-3.5 h-3.5 text-orange-400" />
              <span>{t('trust_badge1')}</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-medium text-slate-200 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t('trust_badge2')}</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-medium text-slate-200 shadow-sm">
              <Layers className="w-3.5 h-3.5 text-orange-400" />
              <span>{t('trust_badge3')}</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-medium text-slate-200 shadow-sm">
              <Disc className="w-3.5 h-3.5 text-amber-400" />
              <span>{t('trust_badge4')}</span>
            </div>
          </div>
        </div>

        {/* Interactive Converter Workspace */}
        <section id="audio-converter-workspace" className="w-full mb-14">
          <Mp3ToWavConverter />
        </section>

        {/* Editorial SEO Content & Comparison Modules */}
        <Mp3ToWavSEO locale={locale} />
      </div>
    </main>
  );
}
