import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Terminal } from 'lucide-react';
import Converter from '../../components/Converter';


export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  setRequestLocale(locale);
  const domain = 'https://m4atomp3converter.com';
  const path = '/client-side-safe';
  
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
  const t = useTranslations('client_side_safe');

  return (
    <main className="flex-1 relative z-10 w-full max-w-7xl mx-auto px-6 py-12 flex flex-col gap-16">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
          {t('hero_title_prefix')}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 dark:from-emerald-400 to-primary drop-shadow-md">
            {t('hero_title_span')}
          </span>
        </h1>
        <p className="text-on-surface-variant text-lg leading-relaxed">
          {t('hero_desc_1')}{' '}
          <strong className="text-emerald-400 font-semibold">{t('hero_desc_strong')}</strong>{' '}
          {t('hero_desc_2')}
        </p>
      </section>

      {/* Interactive Workspace */}
      <Converter />

      {/* Technical Content & FAQ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
        <article className="prose dark:prose-invert prose-emerald max-w-none">
          <h2 className="text-2xl font-bold mb-4">{t('whitepaper_title')}</h2>

          <h3 className="text-xl font-bold text-on-surface mt-8 mb-3">{t('cloud_problem_title')}</h3>
          <p className="text-on-surface-variant leading-relaxed mb-4">{t('cloud_problem_p1')}</p>
          <p className="text-on-surface-variant leading-relaxed mb-4">{t('cloud_problem_p2')}</p>

          <h3 className="text-xl font-bold text-on-surface mt-8 mb-3 flex items-center gap-2">
            <Terminal className="w-5 h-5 text-emerald-400" />
            {t('verify_title')}
          </h3>
          <p className="text-on-surface-variant leading-relaxed mb-4">{t('verify_intro')}</p>
          <ol className="list-decimal list-inside text-on-surface-variant space-y-2 mb-6">
            <li>
              {t('verify_step1_1')}{' '}
              <code className="text-xs bg-on-surface/10 px-1.5 py-0.5 rounded text-emerald-400 font-mono">
                {t('verify_step1_code')}
              </code>{' '}
              {t('verify_step1_2')}
            </li>
            <li>
              {t('verify_step2_1')}{' '}
              <strong>{t('verify_step2_strong')}</strong>{' '}
              {t('verify_step2_2')}
            </li>
            <li>{t('verify_step3')}</li>
            <li>
              {t('verify_step4_1')}{' '}
              <strong>{t('verify_step4_strong')}</strong>{' '}
              {t('verify_step4_2')}
            </li>
          </ol>

          <p className="text-on-surface-variant leading-relaxed">{t('verify_conclusion')}</p>
        </article>

        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold mb-2">{t('faq_title')}</h2>
          <div className="bg-surface-container-high/50 p-5 rounded-xl border border-emerald-500/10 shadow-[0_0_10px_rgba(16,185,129,0.03)] hover:border-emerald-500/30 transition-colors">
            <h4 className="font-bold text-on-surface mb-2 text-lg">{t('faq1_q')}</h4>
            <p className="text-on-surface-variant text-sm leading-relaxed">{t('faq1_a')}</p>
          </div>
          <div className="bg-surface-container-high/50 p-5 rounded-xl border border-emerald-500/10 shadow-[0_0_10px_rgba(16,185,129,0.03)] hover:border-emerald-500/30 transition-colors">
            <h4 className="font-bold text-on-surface mb-2 text-lg">{t('faq2_q')}</h4>
            <p className="text-on-surface-variant text-sm leading-relaxed">{t('faq2_a')}</p>
          </div>
          <div className="bg-surface-container-high/50 p-5 rounded-xl border border-emerald-500/10 shadow-[0_0_10px_rgba(16,185,129,0.03)] hover:border-emerald-500/30 transition-colors">
            <h4 className="font-bold text-on-surface mb-2 text-lg">{t('faq3_q')}</h4>
            <p className="text-on-surface-variant text-sm leading-relaxed">{t('faq3_a')}</p>
          </div>
        </div>
      </div>
    </main>
  );
}


