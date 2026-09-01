import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { BarChart3 } from 'lucide-react';
import Converter from '../../components/Converter';


export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  setRequestLocale(locale);
  const domain = 'https://m4atomp3converter.com';
  const path = '/320kbps';
  
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
  const t = useTranslations('320kbps');

  return (
    <main className="flex-1 relative z-10 w-full max-w-7xl mx-auto px-6 py-12 flex flex-col gap-16">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          {t('hero_title_prefix')}{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary drop-shadow-md">
            {t('hero_title_highlight')}
          </span>
        </h1>
        <p className="text-on-surface-variant text-lg leading-relaxed">
          {t('hero_description')}
        </p>
      </section>

      {/* Interactive Workspace */}
      <Converter />

      {/* Audio Fidelity Comparison Table */}
      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-on-surface">
          <BarChart3 className="text-emerald-400 w-6 h-6" />
          {t('fidelity_title')}
        </h2>
        <div className="overflow-x-auto border border-outline-variant/30 rounded-2xl bg-surface-dim/30 backdrop-blur-sm">
          <table className="w-full text-left text-sm text-on-surface-variant">
            <thead className="bg-surface-dim border-b border-outline-variant/30 text-on-surface font-mono text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 rounded-tl-2xl">{t('table_col_bitrate')}</th>
                <th className="px-6 py-4">{t('table_col_use_case')}</th>
                <th className="px-6 py-4">{t('table_col_frequency')}</th>
                <th className="px-6 py-4 rounded-tr-2xl">{t('table_col_stereo')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr className="hover:bg-on-surface/5 transition-colors">
                <td className="px-6 py-4 font-bold text-on-surface">{t('bitrate_128')}</td>
                <td className="px-6 py-4">{t('use_case_128')}</td>
                <td className="px-6 py-4">{t('freq_128')}</td>
                <td className="px-6 py-4">{t('stereo_128')}</td>
              </tr>
              <tr className="hover:bg-on-surface/5 transition-colors">
                <td className="px-6 py-4 font-bold text-on-surface">{t('bitrate_192')}</td>
                <td className="px-6 py-4">{t('use_case_192')}</td>
                <td className="px-6 py-4">{t('freq_192')}</td>
                <td className="px-6 py-4">{t('stereo_192')}</td>
              </tr>
              <tr className="bg-emerald-500/5 hover:bg-emerald-500/10 transition-colors border-l-4 border-l-primary">
                <td className="px-6 py-4 font-bold text-emerald-400 flex items-center gap-2">
                  {t('bitrate_320')}{" "}
                  <span className="bg-emerald-500 text-surface px-1.5 py-0.5 rounded text-[10px] uppercase">
                    {t('badge_master')}
                  </span>
                </td>
                <td className="px-6 py-4 text-on-surface font-medium">{t('use_case_320')}</td>
                <td className="px-6 py-4 text-on-surface font-medium">{t('freq_320')}</td>
                <td className="px-6 py-4 text-on-surface font-medium">{t('stereo_320')}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Technical Content & FAQ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
        <article className="prose dark:prose-invert prose-orange max-w-none">
          <h2 className="text-2xl font-bold mb-4">{t('tech_heading')}</h2>
          <p className="text-on-surface-variant leading-relaxed mb-4">
            {t('tech_p1')}
          </p>
          <p className="text-on-surface-variant leading-relaxed mb-4">
            {t('tech_p2_1')}
            <strong>{t('tech_p2_bold')}</strong>
            {t('tech_p2_2')}
          </p>
          <p className="text-on-surface-variant leading-relaxed">
            {t('tech_p3_1')}
            <strong>{t('tech_p3_bold1')}</strong>
            {t('tech_p3_2')}
            <strong>{t('tech_p3_bold2')}</strong>
            {t('tech_p3_3')}
          </p>
        </article>

        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold mb-2">{t('faq_heading')}</h2>
          <div className="bg-surface-container-high/50 p-5 rounded-xl border border-outline-variant/10">
            <h4 className="font-bold text-on-surface mb-2 text-lg">{t('faq_q1')}</h4>
            <p className="text-on-surface-variant text-sm leading-relaxed">{t('faq_a1')}</p>
          </div>
          <div className="bg-surface-container-high/50 p-5 rounded-xl border border-outline-variant/10">
            <h4 className="font-bold text-on-surface mb-2 text-lg">{t('faq_q2')}</h4>
            <p className="text-on-surface-variant text-sm leading-relaxed">{t('faq_a2')}</p>
          </div>
          <div className="bg-surface-container-high/50 p-5 rounded-xl border border-outline-variant/10">
            <h4 className="font-bold text-on-surface mb-2 text-lg">{t('faq_q3')}</h4>
            <p className="text-on-surface-variant text-sm leading-relaxed">{t('faq_a3')}</p>
          </div>
        </div>
      </div>
    </main>
  );
}


