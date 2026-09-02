import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { ShieldCheck, Mail } from 'lucide-react';


export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  setRequestLocale(locale);
  const domain = 'https://m4atomp3converter.com';
  const path = '/privacy-policy';
  
  return {
    title: "Privacy Policy - M4A to MP3 Converter",
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
  const t = useTranslations('privacy_policy');

  return (
    <main className="flex-1 relative z-10 w-full max-w-4xl mx-auto px-6 py-12 md:py-20 flex flex-col gap-10">
      <div className="text-center md:text-left border-b border-outline-variant pb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-on-surface mb-4 tracking-tight">
          {t('hero_title')}
        </h1>
        <p className="text-on-surface-variant text-lg">
          {t('last_updated')}{' '}
          <strong className="text-on-surface">{t('last_updated_date')}</strong>
        </p>
      </div>

      {/* Section 1: Client-Side Guarantee */}
      <section className="bg-surface-container-high/80 border border-outline-variant rounded-2xl p-8 relative overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[50px]"></div>
        <h2 className="text-2xl font-bold text-on-surface mb-4 flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-emerald-400" />
          {t('section1_title')}
        </h2>
        <p className="text-on-surface-variant leading-relaxed mb-4">
          {t('section1_p1')}
        </p>
        <ul className="list-disc list-inside text-on-surface-variant space-y-2 ml-2">
          <li>
            {t('section1_li1_prefix')}
            <strong>{t('section1_li1_bold')}</strong>
            {t('section1_li1_suffix')}
          </li>
          <li>{t('section1_li2')}</li>
          <li>{t('section1_li3')}</li>
        </ul>
      </section>

      {/* Section 2: Log Files & Analytics */}
      <section>
        <h2 className="text-xl font-bold text-on-surface mb-3">{t('section2_title')}</h2>
        <p className="text-on-surface-variant leading-relaxed mb-4">
          {t('section2_p1')}
        </p>
        <p className="text-on-surface-variant leading-relaxed">
          {t('section2_p2')}
        </p>
      </section>

      {/* Section 3: AdSense & Cookies */}
      <section className="bg-surface-container-high/50 border border-outline-variant rounded-2xl p-8">
        <h2 className="text-xl font-bold text-on-surface mb-4">{t('section3_title')}</h2>
        <p className="text-on-surface-variant leading-relaxed mb-4">
          {t('section3_p1')}
        </p>
        <ul className="list-disc list-inside text-on-surface-variant space-y-2 ml-2 mb-4">
          <li>{t('section3_li1')}</li>
          <li>
            {t('section3_li2_prefix')}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline"
            >
              {t('section3_li2_link')}
            </a>
            .
          </li>
          <li>
            {t('section3_li3_prefix')}
            <a
              href="http://www.aboutads.info"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline"
            >
              {t('section3_li3_link')}
            </a>
            .
          </li>
        </ul>
        <p className="text-on-surface-variant leading-relaxed">
          {t('section3_p2')}
        </p>
      </section>

      {/* Section 4: GDPR */}
      <section>
        <h2 className="text-xl font-bold text-on-surface mb-3">{t('section4_title')}</h2>
        <p className="text-on-surface-variant leading-relaxed mb-4">
          {t('section4_p1')}
        </p>
        <ul className="list-disc list-inside text-on-surface-variant space-y-2 ml-2">
          <li>
            <strong>{t('section4_li1_bold')}</strong>
            {t('section4_li1_text')}
          </li>
          <li>
            <strong>{t('section4_li2_bold')}</strong>
            {t('section4_li2_text')}
          </li>
          <li>
            <strong>{t('section4_li3_bold')}</strong>
            {t('section4_li3_text')}
          </li>
          <li>
            <strong>{t('section4_li4_bold')}</strong>
            {t('section4_li4_text')}
          </li>
        </ul>
      </section>

      {/* Section 5: CCPA */}
      <section>
        <h2 className="text-xl font-bold text-on-surface mb-3">{t('section5_title')}</h2>
        <p className="text-on-surface-variant leading-relaxed mb-4">
          {t('section5_p1')}
        </p>
        <p className="text-on-surface-variant leading-relaxed">
          <strong>{t('section5_p2_bold')}</strong> {t('section5_p2_text')}
        </p>
      </section>

      {/* Section 6: COPPA */}
      <section>
        <h2 className="text-xl font-bold text-on-surface mb-3">{t('section6_title')}</h2>
        <p className="text-on-surface-variant leading-relaxed">
          {t('section6_p1')}
        </p>
      </section>

      {/* Section 7: Contact */}
      <section className="bg-surface-container-high/80 border border-outline-variant rounded-2xl p-8 mt-4">
        <h2 className="text-xl font-bold text-on-surface mb-4">{t('section7_title')}</h2>
        <p className="text-on-surface-variant leading-relaxed mb-4">
          {t('section7_p1')}
        </p>
        <div className="flex items-center gap-3 text-on-surface-variant bg-surface border border-outline-variant px-4 py-3 rounded-lg inline-flex">
          <Mail className="w-5 h-5 text-emerald-400" />
          <a
            href="mailto:medhastone@gmail.com"
            className="hover:text-emerald-400 transition-colors font-mono text-sm"
          >
            {t('section7_email')}
          </a>
        </div>
        <p className="text-outline text-sm mt-4 italic">
          {t('section7_note')}
        </p>
      </section>
    </main>
  );
}


