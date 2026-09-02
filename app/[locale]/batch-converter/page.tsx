import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Converter from '../../components/Converter';


export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  setRequestLocale(locale);
  const domain = 'https://m4atomp3converter.com';
  const path = '/batch-converter';
  
  return {
    title: "Batch Converter - M4A to MP3 Converter",
    description: "Convert M4A to MP3 easily and locally.",
    alternates: {
      canonical: `${domain}/${locale}${path}`,
      languages: {
        'en': `${domain}/en${path}`,
        'es': `${domain}/es${path}`,
        'fr': `${domain}/fr${path}`,
        'de': `${domain}/de${path}`,
        'pt': `${domain}/pt${path}`,
        'ru': `${domain}/ru${path}`,
        'x-default': `${domain}/en${path}`,
      },
    },
  };
}

import { use } from 'react';

export default function Page({ params }: { params: Promise<{ locale: string }> }) {
  const locale = use(params).locale;
  setRequestLocale(locale);
  const t = useTranslations('batch_converter');

  return (
    <main className="flex-1 relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 flex flex-col gap-12 md:gap-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
      {/* Hero Section */}
      <section className="text-left">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
          {t('hero_title')}
        </h1>
        <p className="text-on-surface-variant text-lg leading-relaxed">
          {t('hero_subtitle')}
        </p>
      
      </section>
      <div className="w-full flex flex-col gap-4">
      {/* Interactive Workspace */}
      <Converter />
      </div>
    </div>

      {/* Technical Content & FAQ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
        <article className="prose dark:prose-invert prose-orange max-w-none">
          <h2 className="text-2xl font-bold mb-4">{t('tech_title')}</h2>
          <p className="text-on-surface-variant leading-relaxed mb-4">
            {t('tech_p1')}
          </p>
          <p className="text-on-surface-variant leading-relaxed mb-4">
            {t('tech_p2')}
          </p>
          <p className="text-on-surface-variant leading-relaxed">
            {t('tech_p3')}
          </p>

          <h3 className="text-xl font-bold text-on-surface mt-8 mb-3">{t('guide_title')}</h3>
          <ol className="list-decimal list-inside text-on-surface-variant space-y-2">
            <li>
              <strong>{t('guide_step1_title')}</strong> {t('guide_step1_desc')}
            </li>
            <li>
              <strong>{t('guide_step2_title')}</strong> {t('guide_step2_desc')}
            </li>
            <li>
              <strong>{t('guide_step3_title')}</strong> {t('guide_step3_desc')}
            </li>
          </ol>
        </article>

        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold mb-2">{t('faq_title')}</h2>
          <div className="bg-surface-container-high/50 p-5 rounded-xl border border-outline-variant/10">
            <h4 className="font-bold text-on-surface mb-2 text-lg">{t('faq_1_q')}</h4>
            <p className="text-on-surface-variant text-sm leading-relaxed">{t('faq_1_a')}</p>
          </div>
          <div className="bg-surface-container-high/50 p-5 rounded-xl border border-outline-variant/10">
            <h4 className="font-bold text-on-surface mb-2 text-lg">{t('faq_2_q')}</h4>
            <p className="text-on-surface-variant text-sm leading-relaxed">{t('faq_2_a')}</p>
          </div>
          <div className="bg-surface-container-high/50 p-5 rounded-xl border border-outline-variant/10">
            <h4 className="font-bold text-on-surface mb-2 text-lg">{t('faq_3_q')}</h4>
            <p className="text-on-surface-variant text-sm leading-relaxed">{t('faq_3_a')}</p>
          </div>
        </div>
      </div>
    </main>
  );
}


