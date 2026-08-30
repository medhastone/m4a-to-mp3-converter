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
  const t = useTranslations('mac');

  return (
    <main className="flex-1 relative z-10 w-full max-w-7xl mx-auto px-6 py-12 flex flex-col gap-16">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
          {t('hero_title')}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-primary drop-shadow-md">
            {t('hero_title_highlight')}
          </span>
        </h1>
        <p className="text-slate-400 text-lg leading-relaxed">
          {t('hero_subtitle')}
        </p>
      </section>

      {/* Converter Section */}
      <Converter />

      {/* Compatibility Matrix */}
      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
          <Layers className="text-emerald-400 w-6 h-6" /> {t('table_heading')}
        </h2>
        <div className="overflow-x-auto border border-white/10 rounded-2xl bg-surface-dim/30 backdrop-blur-sm">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-surface-dim border-b border-white/10 text-slate-100 font-mono text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 rounded-tl-2xl">{t('th_os')}</th>
                <th className="px-6 py-4">{t('th_m4a')}</th>
                <th className="px-6 py-4">{t('th_mp3')}</th>
                <th className="px-6 py-4 rounded-tr-2xl">{t('th_action')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 font-bold text-white flex items-center gap-2">
                  <Apple className="w-4 h-4" /> {t('os_mac')}
                </td>
                <td className="px-6 py-4 text-emerald-400">{t('os_mac_m4a')}</td>
                <td className="px-6 py-4 text-emerald-400">{t('os_mac_mp3')}</td>
                <td className="px-6 py-4">{t('os_mac_action')}</td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 font-bold text-white flex items-center gap-2">
                  <Smartphone className="w-4 h-4" /> {t('os_android')}
                </td>
                <td className="px-6 py-4 text-amber-400">{t('os_android_m4a')}</td>
                <td className="px-6 py-4 text-emerald-400 font-bold">{t('os_android_mp3')}</td>
                <td className="px-6 py-4 text-emerald-400">{t('os_android_action')}</td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 font-bold text-white flex items-center gap-2">
                  <Laptop2 className="w-4 h-4" /> {t('os_chromeos')}
                </td>
                <td className="px-6 py-4 text-amber-400">{t('os_chromeos_m4a')}</td>
                <td className="px-6 py-4 text-emerald-400 font-bold">{t('os_chromeos_mp3')}</td>
                <td className="px-6 py-4 text-emerald-400">{t('os_chromeos_action')}</td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 font-bold text-white flex items-center gap-2">
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
        <article className="prose prose-invert prose-orange max-w-none">
          <h2 className="text-2xl font-bold mb-4">{t('guides_title')}</h2>
          
          <h3 className="text-xl font-bold text-white mt-8 mb-3">{t('mac_guide_title')}</h3>
          <p className="text-slate-400 leading-relaxed mb-4">
            {t('mac_guide_desc')}
          </p>

          <h3 className="text-xl font-bold text-white mt-8 mb-3">{t('android_guide_title')}</h3>
          <p className="text-slate-400 leading-relaxed mb-4">
            {t('android_guide_desc')}
          </p>
          
          <h3 className="text-xl font-bold text-white mt-8 mb-3">{t('chromebook_guide_title')}</h3>
          <p className="text-slate-400 leading-relaxed">
            {t('chromebook_guide_desc')}
          </p>
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


