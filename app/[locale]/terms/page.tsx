import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Scale, Mail } from 'lucide-react';


export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  setRequestLocale(locale);
  const domain = 'https://m4atomp3converter.com';
  const path = '/terms';
  
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
  const t = useTranslations('terms');

  return (
    <main className="flex-1 relative z-10 w-full max-w-4xl mx-auto px-6 py-12 md:py-20 flex flex-col gap-10">
      <div className="text-center md:text-left border-b border-slate-800 pb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          {t('title')}
        </h1>
        <p className="text-slate-400 text-lg">
          {t('last_updated_label')}{' '}
          <strong className="text-slate-200">{t('last_updated_date')}</strong>
        </p>
      </div>

      {/* Section 1 */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">
          {t('section1_title')}
        </h2>
        <p className="text-slate-400 leading-relaxed mb-4">
          {t('section1_p1')}
        </p>
        <p className="text-slate-400 leading-relaxed">
          {t('section1_p2')}
        </p>
      </section>

      {/* Section 2 */}
      <section className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
        <h2 className="text-xl font-bold text-white mb-3">
          {t('section2_title')}
        </h2>
        <p className="text-slate-400 leading-relaxed">
          {t('section2_p1')}
        </p>
      </section>

      {/* Section 3 */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
          <Scale className="w-5 h-5 text-emerald-400" /> {t('section3_title')}
        </h2>
        <p className="text-slate-400 leading-relaxed mb-4">
          {t('section3_p1')}
        </p>
        <ul className="list-disc list-inside text-slate-400 space-y-2 ml-2 mb-4">
          <li>
            <strong>{t('section3_li1_bold')}</strong>
            {t('section3_li1_text')}
          </li>
          <li>
            <strong>{t('section3_li2_bold')}</strong>
            {t('section3_li2_text')}
          </li>
        </ul>
        <p className="text-slate-400 leading-relaxed">
          <strong>{t('section3_dmca_bold')}</strong> {t('section3_dmca_text')}{' '}
          <a
            href="mailto:medhastone@gmail.com"
            className="text-emerald-400 hover:underline font-mono"
          >
            medhastone@gmail.com
          </a>
          .
        </p>
      </section>

      {/* Section 4 */}
      <section className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
        <h2 className="text-xl font-bold text-white mb-3">
          {t('section4_title')}
        </h2>
        <p className="text-slate-400 leading-relaxed">
          {t('section4_p1')}
        </p>
      </section>

      {/* Section 5 */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">
          {t('section5_title')}
        </h2>
        <p className="text-slate-400 leading-relaxed">
          {t('section5_p1')}
        </p>
      </section>

      {/* Section 6 */}
      <section className="bg-slate-900/80 border border-emerald-500/20 shadow-[0_0_20px_rgba(249,115,22,0.05)] rounded-2xl p-8 mt-4 relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-40 h-40 bg-emerald-500/10 rounded-full blur-[40px]" />
        <h2 className="text-xl font-bold text-white mb-4">
          {t('section6_title')}
        </h2>
        <p className="text-slate-400 leading-relaxed mb-4 uppercase text-sm tracking-wide">
          {t('section6_p1')}
        </p>
        <p className="text-slate-400 leading-relaxed">
          {t('section6_p2')}
        </p>
      </section>

      {/* Section 7 */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">
          {t('section7_title')}
        </h2>
        <p className="text-slate-400 leading-relaxed">
          {t('section7_p1')}
        </p>
      </section>

      {/* Section 8 */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">
          {t('section8_title')}
        </h2>
        <p className="text-slate-400 leading-relaxed">
          {t('section8_p1')}
        </p>
      </section>

      {/* Section 9 */}
      <section className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 mt-4">
        <h2 className="text-xl font-bold text-white mb-4">
          {t('section9_title')}
        </h2>
        <p className="text-slate-400 leading-relaxed mb-4">
          {t('section9_p1')}
        </p>
        <div className="flex items-center gap-3 text-slate-300 bg-slate-950 border border-slate-800 px-4 py-3 rounded-lg inline-flex">
          <Mail className="w-5 h-5 text-emerald-400" />
          <a
            href="mailto:medhastone@gmail.com"
            className="hover:text-emerald-400 transition-colors font-mono text-sm"
          >
            medhastone@gmail.com
          </a>
        </div>
      </section>
    </main>
  );
}
