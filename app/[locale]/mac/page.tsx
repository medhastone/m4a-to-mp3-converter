import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Converter from '../../components/Converter';
import { Layers, Apple, Smartphone, Laptop2, Monitor } from 'lucide-react';


export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  setRequestLocale(locale);
  const domain = 'https://m4atomp3converter.com';
  const path = '/mac';
  
  return {
    title: "Mac - M4A to MP3 Converter",
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
  const t = useTranslations('mac');

  return (
    <main className="flex-1 relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 flex flex-col gap-12 md:gap-16">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
          {t('hero_title')}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 dark:from-emerald-400 to-primary drop-shadow-md">
            {t('hero_title_highlight')}
          </span>
        </h1>
        <p className="text-on-surface-variant text-lg leading-relaxed">
          {t('hero_subtitle')}
        </p>
      </section>

      {/* Converter Section */}
      <Converter />

      {/* Compatibility Matrix */}
      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-on-surface">
          <Layers className="text-emerald-400 w-6 h-6" /> {t('table_heading')}
        </h2>
        <div className="overflow-x-auto border border-outline-variant/30 rounded-2xl bg-surface-dim/30 backdrop-blur-sm">
          <table className="w-full text-left text-sm text-on-surface-variant">
            <thead className="bg-surface-dim border-b border-outline-variant/30 text-on-surface font-mono text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 rounded-tl-2xl">{t('th_os')}</th>
                <th className="px-6 py-4">{t('th_m4a')}</th>
                <th className="px-6 py-4">{t('th_mp3')}</th>
                <th className="px-6 py-4 rounded-tr-2xl">{t('th_action')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr className="hover:bg-on-surface/5 transition-colors">
                <td className="px-6 py-4 font-bold text-on-surface flex items-center gap-2">
                  <Apple className="w-4 h-4" /> {t('os_mac')}
                </td>
                <td className="px-6 py-4 text-emerald-400">{t('os_mac_m4a')}</td>
                <td className="px-6 py-4 text-emerald-400">{t('os_mac_mp3')}</td>
                <td className="px-6 py-4">{t('os_mac_action')}</td>
              </tr>
              <tr className="hover:bg-on-surface/5 transition-colors">
                <td className="px-6 py-4 font-bold text-on-surface flex items-center gap-2">
                  <Smartphone className="w-4 h-4" /> {t('os_android')}
                </td>
                <td className="px-6 py-4 text-amber-400">{t('os_android_m4a')}</td>
                <td className="px-6 py-4 text-emerald-400 font-bold">{t('os_android_mp3')}</td>
                <td className="px-6 py-4 text-emerald-400">{t('os_android_action')}</td>
              </tr>
              <tr className="hover:bg-on-surface/5 transition-colors">
                <td className="px-6 py-4 font-bold text-on-surface flex items-center gap-2">
                  <Laptop2 className="w-4 h-4" /> {t('os_chromeos')}
                </td>
                <td className="px-6 py-4 text-amber-400">{t('os_chromeos_m4a')}</td>
                <td className="px-6 py-4 text-emerald-400 font-bold">{t('os_chromeos_mp3')}</td>
                <td className="px-6 py-4 text-emerald-400">{t('os_chromeos_action')}</td>
              </tr>
              <tr className="hover:bg-on-surface/5 transition-colors">
                <td className="px-6 py-4 font-bold text-on-surface flex items-center gap-2">
                  <Monitor className="w-4 h-4" /> {t('os_windows')}
                </td>
                <td className="px-6 py-4 text-red-400">{t('os_windows_m4a')}</td>
                <td className="px-6 py-4 text-emerald-400 font-bold">{t('os_windows_mp3')}</td>
                <td className="px-6 py-4 text-emerald-400">{t('os_windows_action')}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Technical Content & FAQ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
        <article className="prose dark:prose-invert prose-orange max-w-none">
          <h2 className="text-2xl font-bold mb-4">{t('guides_title')}</h2>
          
          <h3 className="text-xl font-bold text-on-surface mt-8 mb-3">{t('mac_guide_title')}</h3>
          <p className="text-on-surface-variant leading-relaxed mb-4">
            {t('mac_guide_desc')}
          </p>

          <h3 className="text-xl font-bold text-on-surface mt-8 mb-3">{t('android_guide_title')}</h3>
          <p className="text-on-surface-variant leading-relaxed mb-4">
            {t('android_guide_desc')}
          </p>
          
          <h3 className="text-xl font-bold text-on-surface mt-8 mb-3">{t('chromebook_guide_title')}</h3>
          <p className="text-on-surface-variant leading-relaxed">
            {t('chromebook_guide_desc')}
          </p>
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


