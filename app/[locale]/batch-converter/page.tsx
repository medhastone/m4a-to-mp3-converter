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
    alternates: {
      canonical: `${domain}/${locale}${path}`,
      languages: {
        'en': `${domain}/en${path}`,
        'es': `${domain}/es${path}`,
        'fr': `${domain}/fr${path}`,
        'de': `${domain}/de${path}`,
        'pt': `${domain}/pt${path}`,
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
    <main className="flex-1 relative z-10 w-full max-w-7xl mx-auto px-6 py-12 flex flex-col gap-16">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
          {t('hero_title')}
        </h1>
        <p className="text-slate-400 text-lg leading-relaxed">
          {t('hero_subtitle')}
        </p>
      </section>

      {/* Interactive Workspace */}
      <Converter />

      {/* Technical Content & FAQ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
        <article className="prose prose-invert prose-orange max-w-none">
          <h2 className="text-2xl font-bold mb-4">{t('tech_title')}</h2>
          <p className="text-slate-400 leading-relaxed mb-4">
            {t('tech_p1')}
          </p>
          <p className="text-slate-400 leading-relaxed mb-4">
            {t('tech_p2')}
          </p>
          <p className="text-slate-400 leading-relaxed">
            {t('tech_p3')}
          </p>

          <h3 className="text-xl font-bold text-white mt-8 mb-3">{t('guide_title')}</h3>
          <ol className="list-decimal list-inside text-slate-400 space-y-2">
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
          <div className="bg-slate-900/50 p-5 rounded-xl border border-white/5">
            <h4 className="font-bold text-white mb-2 text-lg">{t('faq_1_q')}</h4>
            <p className="text-slate-400 text-sm leading-relaxed">{t('faq_1_a')}</p>
          </div>
          <div className="bg-slate-900/50 p-5 rounded-xl border border-white/5">
            <h4 className="font-bold text-white mb-2 text-lg">{t('faq_2_q')}</h4>
            <p className="text-slate-400 text-sm leading-relaxed">{t('faq_2_a')}</p>
          </div>
          <div className="bg-slate-900/50 p-5 rounded-xl border border-white/5">
            <h4 className="font-bold text-white mb-2 text-lg">{t('faq_3_q')}</h4>
            <p className="text-slate-400 text-sm leading-relaxed">{t('faq_3_a')}</p>
          </div>
        </div>
      </div>
    </main>
  );
}


