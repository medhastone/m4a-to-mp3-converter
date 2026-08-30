import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Converter from '../../components/Converter';


export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  setRequestLocale(locale);
  const domain = 'https://m4atomp3converter.com';
  const path = '/iphone-voice-memos';
  
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
  const t = useTranslations('iphone_voice_memos');

  return (
    <main className="flex-1 relative z-10 w-full max-w-7xl mx-auto px-6 py-12 flex flex-col gap-16">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          {t('hero_title_prefix')}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary drop-shadow-md">
            {t('hero_title_highlight')}
          </span>
          {t('hero_title_suffix')}
        </h1>
        <p className="text-slate-400 text-lg leading-relaxed">
          {t('hero_description_prefix')}
          <code className="text-emerald-400 bg-emerald-500/10 px-1 rounded">
            {t('hero_description_code')}
          </code>
          {t('hero_description_suffix')}
        </p>
      </section>

      {/* Converter Component */}
      <Converter />

      {/* Visual iOS Export Guide */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-2xl border border-white/5 flex flex-col gap-4">
          <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-mono font-bold text-emerald-400">
            {t('step1_number')}
          </div>
          <h3 className="font-bold text-lg">{t('step1_title')}</h3>
          <p className="text-slate-400 text-sm">
            {t('step1_desc_prefix')}
            <code className="text-emerald-400">{t('step1_desc_code')}</code>
            {t('step1_desc_middle')}
            <strong>{t('step1_desc_strong')}</strong>
            {t('step1_desc_suffix')}
          </p>
        </div>
        <div className="glass-panel p-6 rounded-2xl border border-white/5 flex flex-col gap-4">
          <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-mono font-bold text-emerald-400">
            {t('step2_number')}
          </div>
          <h3 className="font-bold text-lg">{t('step2_title')}</h3>
          <p className="text-slate-400 text-sm">
            {t('step2_desc_prefix')}
            <strong>{t('step2_desc_strong1')}</strong>
            {t('step2_desc_middle')}
            <strong>{t('step2_desc_strong2')}</strong>
            {t('step2_desc_suffix')}
          </p>
        </div>
        <div className="glass-panel p-6 rounded-2xl border border-white/5 flex flex-col gap-4">
          <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-mono font-bold text-emerald-400">
            {t('step3_number')}
          </div>
          <h3 className="font-bold text-lg">{t('step3_title')}</h3>
          <p className="text-slate-400 text-sm">{t('step3_desc')}</p>
        </div>
      </section>

      {/* Technical Content & FAQ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
        <article className="prose prose-invert prose-orange max-w-none">
          <h2 className="text-2xl font-bold mb-4">{t('article_title')}</h2>
          <p className="text-slate-400 leading-relaxed mb-4">
            {t('article_p1_prefix')}
            <code className="bg-white/10 px-1 rounded">{t('article_p1_code')}</code>
            {t('article_p1_suffix')}
          </p>
          <p className="text-slate-400 leading-relaxed">
            {t('article_p2_prefix')}
            <strong>{t('article_p2_range')}</strong>
            {t('article_p2_middle')}
            <strong>{t('article_p2_preset')}</strong>
            {t('article_p2_suffix')}
          </p>
        </article>

        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold mb-2">{t('faq_title')}</h2>
          <div className="bg-slate-900/50 p-5 rounded-xl border border-white/5">
            <h4 className="font-bold text-white mb-2 text-lg">{t('faq1_question')}</h4>
            <p className="text-slate-400 text-sm leading-relaxed">{t('faq1_answer')}</p>
          </div>
          <div className="bg-slate-900/50 p-5 rounded-xl border border-white/5">
            <h4 className="font-bold text-white mb-2 text-lg">{t('faq2_question')}</h4>
            <p className="text-slate-400 text-sm leading-relaxed">{t('faq2_answer')}</p>
          </div>
          <div className="bg-slate-900/50 p-5 rounded-xl border border-white/5">
            <h4 className="font-bold text-white mb-2 text-lg">{t('faq3_question')}</h4>
            <p className="text-slate-400 text-sm leading-relaxed">{t('faq3_answer')}</p>
          </div>
        </div>
      </div>
    </main>
  );
}


