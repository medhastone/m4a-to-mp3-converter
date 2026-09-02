import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Converter from '../../components/Converter';
import { HelpCircle } from 'lucide-react';


export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  setRequestLocale(locale);
  const domain = 'https://m4atomp3converter.com';
  const path = '/windows';
  
  return {
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
  const t = useTranslations('windows');

  return (
    <main className="flex-1 relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 flex flex-col gap-12 md:gap-16">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          {t('hero_title')}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 dark:from-blue-400 to-primary drop-shadow-md">
            {t('hero_title_span')}
          </span>
        </h1>
        <p className="text-on-surface-variant text-lg leading-relaxed">
          {t('hero_desc_prefix')}{' '}
          <code className="text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded text-sm">
            {t('hero_desc_code')}
          </code>{' '}
          {t('hero_desc_suffix')}
        </p>
      </section>

      {/* Interactive Workspace / Converter */}
      <Converter />

      {/* Technical Content & FAQ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
        <article className="prose dark:prose-invert prose-orange max-w-none">
          <h2 className="text-2xl font-bold mb-4">{t('article_title')}</h2>
          <p className="text-on-surface-variant leading-relaxed mb-4">
            {t('article_p1')}
          </p>
          
          <h3 className="text-xl font-bold text-on-surface mt-8 mb-3">{t('article_h2')}</h3>
          <p className="text-on-surface-variant leading-relaxed mb-4">
            {t('article_p2_prefix')}{' '}
            <code className="bg-on-surface/10 px-1 rounded text-emerald-400">
              {t('article_p2_code')}
            </code>{' '}
            {t('article_p2_suffix')}
          </p>

          <h3 className="text-xl font-bold text-on-surface mt-8 mb-3">{t('article_h3')}</h3>
          <p className="text-on-surface-variant leading-relaxed">
            {t('article_p3')}
          </p>
        </article>

        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold mb-2">{t('faq_title')}</h2>
          <div className="bg-surface-container-high/50 p-5 rounded-xl border border-outline-variant/10">
            <h4 className="font-bold text-on-surface mb-2 text-lg flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-emerald-400" />
              {t('faq1_q')}
            </h4>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              {t('faq1_a')}
            </p>
          </div>
          <div className="bg-surface-container-high/50 p-5 rounded-xl border border-outline-variant/10">
            <h4 className="font-bold text-on-surface mb-2 text-lg flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-emerald-400" />
              {t('faq2_q')}
            </h4>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              {t('faq2_a')}
            </p>
          </div>
          <div className="bg-surface-container-high/50 p-5 rounded-xl border border-outline-variant/10">
            <h4 className="font-bold text-on-surface mb-2 text-lg flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-emerald-400" />
              {t('faq3_q')}
            </h4>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              {t('faq3_a')}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}


