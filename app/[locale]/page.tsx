import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ServerOff,
  Cpu,
  Lock,
  CheckCircle2,
  XCircle,
  FileAudio,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Radio,
  Car,
  Mic,
  Headphones,
  Clock,
  Check,
} from 'lucide-react';
import Converter from '../components/Converter';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = resolvedParams.locale || 'en';
  const t = await getTranslations({ locale, namespace: 'home' });
  const domain = 'https://m4atomp3converter.com';
  const canonicalUrl = `${domain}/${locale}`;

  return {
    title: t('meta_title'),
    description: t('meta_description'),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${domain}/en`,
        es: `${domain}/es`,
        fr: `${domain}/fr`,
        de: `${domain}/de`,
        pt: `${domain}/pt`,
        ru: `${domain}/ru`,
        'x-default': `${domain}/en`,
      },
    },
    openGraph: {
      title: t('meta_title'),
      description: t('meta_description'),
      type: 'website',
      url: canonicalUrl,
      siteName: 'M4A to MP3 Converter',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('meta_title'),
      description: t('meta_description'),
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale || 'en';
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'home' });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'M4A to MP3 Converter',
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'All (Web Browser)',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description: t('meta_description'),
        browserRequirements: 'Requires WebAssembly-compatible browser',
        softwareVersion: '2.5',
      },
      {
        '@type': 'HowTo',
        name: t('how_title'),
        description: t('how_desc'),
        totalTime: 'PT1M',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: t('how_step1_title'),
            text: t('how_step1_desc'),
            url: `https://m4atomp3converter.com/${locale}#step-1`,
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: t('how_step2_title'),
            text: t('how_step2_desc'),
            url: `https://m4atomp3converter.com/${locale}#step-2`,
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: t('how_step3_title'),
            text: t('how_step3_desc'),
            url: `https://m4atomp3converter.com/${locale}#step-3`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: t('faq_q1'),
            acceptedAnswer: {
              '@type': 'Answer',
              text: t('faq_a1'),
            },
          },
          {
            '@type': 'Question',
            name: t('faq_q2'),
            acceptedAnswer: {
              '@type': 'Answer',
              text: t('faq_a2'),
            },
          },
          {
            '@type': 'Question',
            name: t('faq_q3'),
            acceptedAnswer: {
              '@type': 'Answer',
              text: t('faq_a3'),
            },
          },
          {
            '@type': 'Question',
            name: t('faq_q4'),
            acceptedAnswer: {
              '@type': 'Answer',
              text: t('faq_a4'),
            },
          },
          {
            '@type': 'Question',
            name: t('faq_q5'),
            acceptedAnswer: {
              '@type': 'Answer',
              text: t('faq_a5'),
            },
          },
          {
            '@type': 'Question',
            name: t('faq_q6'),
            acceptedAnswer: {
              '@type': 'Answer',
              text: t('faq_a6'),
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="flex-1 flex flex-col relative w-full items-center">
        {/* HERO SECTION WITH CONVERTER TOOL */}
        <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Hero Content & Value Proposition */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-semibold mb-6">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span>{t('hero_badge')}</span>
            </div>

            {/* H1 Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-on-surface leading-[1.15] mb-6">
              <span className="text-primary">{t('hero_h1_prefix')}</span>{' '}
              <span>{t('hero_h1_highlight')}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-on-surface-variant text-base sm:text-lg lg:text-xl max-w-xl leading-relaxed mb-8 font-normal">
              {t('hero_subtitle')}
            </p>

            {/* Technical Highlights / Engineering Metrics */}
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-outline-variant/30 text-sm">
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-wider text-primary font-bold">
                  {t('hero_metric1_title')}
                </span>
                <span className="font-semibold text-on-surface text-base">
                  {t('hero_metric1_value')}
                </span>
                <span className="text-xs text-on-surface-variant">
                  {t('hero_metric1_desc')}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-wider text-primary font-bold">
                  {t('hero_metric2_title')}
                </span>
                <span className="font-semibold text-on-surface text-base">
                  {t('hero_metric2_value')}
                </span>
                <span className="text-xs text-on-surface-variant">
                  {t('hero_metric2_desc')}
                </span>
              </div>
              <div className="flex flex-col col-span-2 sm:col-span-1">
                <span className="text-xs uppercase tracking-wider text-primary font-bold">
                  {t('hero_metric3_title')}
                </span>
                <span className="font-semibold text-on-surface text-base">
                  {t('hero_metric3_value')}
                </span>
                <span className="text-xs text-on-surface-variant">
                  {t('hero_metric3_desc')}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Converter Component */}
          <div className="lg:col-span-6 w-full flex flex-col gap-4">
            <div className="w-full bg-surface-container-low rounded-3xl p-2 sm:p-4 border border-outline-variant/20 shadow-2xl relative">
              <Converter />
            </div>

            {/* CRO Privacy Guarantee Callout */}
            <div className="flex items-center gap-3 bg-surface-container-low/70 border border-outline-variant/20 rounded-2xl p-4 text-xs sm:text-sm text-on-surface-variant">
              <Lock className="w-4 h-4 text-emerald-500 shrink-0" />
              <p className="leading-snug">
                <strong className="text-on-surface font-semibold">
                  {t('hero_zero_uploads_strong')}
                </strong>{' '}
                {t('hero_zero_uploads_text')}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION A: STEP-BY-STEP "HOW TO CONVERT" (3-CARD LAYOUT) */}
        <section
          id="how-it-works"
          className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24 border-t border-outline-variant/20"
        >
          <span id="how-to-convert" className="sr-only" />
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-primary font-bold mb-2">
              {t('how_badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
              {t('how_title')}
            </h2>
            <p className="mt-4 text-on-surface-variant text-base sm:text-lg leading-relaxed">
              {t('how_desc')}
            </p>
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-3 gap-6 list-none p-0 m-0">
            {/* Step 1 */}
            <li
              id="step-1"
              className="bg-surface-container-low rounded-3xl p-8 flex flex-col items-start border border-outline-variant/20 shadow-lg relative overflow-hidden transition-all duration-300 hover:border-primary/40 hover:shadow-xl"
            >
              <div className="flex items-center justify-between w-full mb-6">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary text-on-primary font-black text-xl shadow-md">
                  1
                </span>
                <span className="p-2.5 rounded-xl bg-primary/10 text-primary">
                  <FileAudio className="w-6 h-6" />
                </span>
              </div>
              <h3 className="text-xl font-bold text-on-surface mb-3">
                {t('how_step1_title')}
              </h3>
              <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed">
                {t('how_step1_desc')}
              </p>
            </li>

            {/* Step 2 */}
            <li
              id="step-2"
              className="bg-surface-container-low rounded-3xl p-8 flex flex-col items-start border border-outline-variant/20 shadow-lg relative overflow-hidden transition-all duration-300 hover:border-primary/40 hover:shadow-xl"
            >
              <div className="flex items-center justify-between w-full mb-6">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary text-on-primary font-black text-xl shadow-md">
                  2
                </span>
                <span className="p-2.5 rounded-xl bg-primary/10 text-primary">
                  <Radio className="w-6 h-6" />
                </span>
              </div>
              <h3 className="text-xl font-bold text-on-surface mb-3">
                {t('how_step2_title')}
              </h3>
              <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed">
                {t('how_step2_desc')}
              </p>
            </li>

            {/* Step 3 */}
            <li
              id="step-3"
              className="bg-surface-container-low rounded-3xl p-8 flex flex-col items-start border border-outline-variant/20 shadow-lg relative overflow-hidden transition-all duration-300 hover:border-primary/40 hover:shadow-xl"
            >
              <div className="flex items-center justify-between w-full mb-6">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary text-on-primary font-black text-xl shadow-md">
                  3
                </span>
                <span className="p-2.5 rounded-xl bg-primary/10 text-primary">
                  <Sparkles className="w-6 h-6" />
                </span>
              </div>
              <h3 className="text-xl font-bold text-on-surface mb-3">
                {t('how_step3_title')}
              </h3>
              <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed">
                {t('how_step3_desc')}
              </p>
            </li>
          </ol>
        </section>

        {/* SECTION B: ARCHITECTURAL COMPARISON (IN-BROWSER VS CLOUD CONVERTERS) */}
        <section
          id="architectural-comparison"
          className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24"
        >
          <div className="bg-surface-container-low border border-outline-variant/20 rounded-3xl p-6 sm:p-10 lg:p-14 shadow-xl">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-widest text-primary font-bold mb-2">
                {t('arch_badge')}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
                {t('arch_title')}
              </h2>
              <p className="mt-4 text-on-surface-variant text-base sm:text-lg leading-relaxed">
                {t('arch_desc')}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Cloud Converters Card */}
              <div className="rounded-2xl bg-surface-container/60 border border-outline-variant/30 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center shrink-0">
                      <ServerOff className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-on-surface">
                        {t('arch_cloud_title')}
                      </h3>
                      <p className="text-xs text-on-surface-variant">
                        {t('arch_cloud_sub')}
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-4 text-sm text-on-surface-variant mt-6">
                    <li className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-on-surface font-semibold">
                          {t('arch_cloud_p1_strong')}
                        </strong>{' '}
                        {t('arch_cloud_p1_text')}
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-on-surface font-semibold">
                          {t('arch_cloud_p2_strong')}
                        </strong>{' '}
                        {t('arch_cloud_p2_text')}
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-on-surface font-semibold">
                          {t('arch_cloud_p3_strong')}
                        </strong>{' '}
                        {t('arch_cloud_p3_text')}
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-on-surface font-semibold">
                          {t('arch_cloud_p4_strong')}
                        </strong>{' '}
                        {t('arch_cloud_p4_text')}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* M4AToMP3Converter.com Card */}
              <div className="rounded-2xl bg-surface-container-high/60 border-2 border-primary/40 p-6 sm:p-8 flex flex-col justify-between relative shadow-lg">
                <div className="absolute -top-3 right-6 bg-primary text-on-primary text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full shadow-sm">
                  {t('arch_wasm_badge')}
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-on-surface">
                        {t('arch_wasm_title')}
                      </h3>
                      <p className="text-xs text-primary font-medium">
                        {t('arch_wasm_sub')}
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-4 text-sm text-on-surface-variant mt-6">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-on-surface font-semibold">
                          {t('arch_wasm_p1_strong')}
                        </strong>{' '}
                        {t('arch_wasm_p1_text')}
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-on-surface font-semibold">
                          {t('arch_wasm_p2_strong')}
                        </strong>{' '}
                        {t('arch_wasm_p2_text')}
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-on-surface font-semibold">
                          {t('arch_wasm_p3_strong')}
                        </strong>{' '}
                        {t('arch_wasm_p3_text')}
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-on-surface font-semibold">
                          {t('arch_wasm_p4_strong')}
                        </strong>{' '}
                        {t('arch_wasm_p4_text')}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION C: REAL-WORLD USE CASES & WORKFLOWS */}
        <section
          id="use-cases"
          className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24 border-t border-outline-variant/20"
        >
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-primary font-bold mb-2">
              {t('cases_badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
              {t('cases_title')}
            </h2>
            <p className="mt-4 text-on-surface-variant text-base sm:text-lg leading-relaxed">
              {t('cases_desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="bg-surface-container-low border border-outline-variant/20 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:border-primary/30 transition-all">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                  <Mic className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-on-surface mb-3">
                  {t('cases_c1_title')}
                </h3>
                <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed">
                  {t('cases_c1_desc')}
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-surface-container-low border border-outline-variant/20 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:border-primary/30 transition-all">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                  <Car className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-on-surface mb-3">
                  {t('cases_c2_title')}
                </h3>
                <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed">
                  {t('cases_c2_desc')}
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-surface-container-low border border-outline-variant/20 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:border-primary/30 transition-all">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                  <Headphones className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-on-surface mb-3">
                  {t('cases_c3_title')}
                </h3>
                <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed">
                  {t('cases_c3_desc')}
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-surface-container-low border border-outline-variant/20 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:border-primary/30 transition-all">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-on-surface mb-3">
                  {t('cases_c4_title')}
                </h3>
                <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed">
                  {t('cases_c4_desc')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION D: AUDIO QUALITY & BITRATE SELECTION GUIDE */}
        <section
          id="bitrate-guide"
          className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24 border-t border-outline-variant/20"
        >
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-primary font-bold mb-2">
              {t('bitrate_badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
              {t('bitrate_title')}
            </h2>
            <p className="mt-4 text-on-surface-variant text-base sm:text-lg leading-relaxed">
              {t('bitrate_desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 128 kbps */}
            <div className="bg-surface-container-low border border-outline-variant/20 rounded-3xl p-8 flex flex-col justify-between shadow-md">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-surface-container text-xs font-bold text-on-surface uppercase tracking-wider">
                    {t('bitrate_b128_tag')}
                  </span>
                  <span className="text-2xl font-extrabold text-primary">
                    {t('bitrate_b128_rate')}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-on-surface mb-2">
                  {t('bitrate_b128_title')}
                </h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-4">
                  {t('bitrate_b128_desc')}
                </p>
                <ul className="text-xs space-y-2 text-on-surface-variant">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{t('bitrate_b128_p1')}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{t('bitrate_b128_p2')}</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 192 kbps */}
            <div className="bg-surface-container-low border border-outline-variant/20 rounded-3xl p-8 flex flex-col justify-between shadow-md">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-surface-container text-xs font-bold text-on-surface uppercase tracking-wider">
                    {t('bitrate_b192_tag')}
                  </span>
                  <span className="text-2xl font-extrabold text-primary">
                    {t('bitrate_b192_rate')}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-on-surface mb-2">
                  {t('bitrate_b192_title')}
                </h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-4">
                  {t('bitrate_b192_desc')}
                </p>
                <ul className="text-xs space-y-2 text-on-surface-variant">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{t('bitrate_b192_p1')}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{t('bitrate_b192_p2')}</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 320 kbps */}
            <div className="bg-surface-container-low border-2 border-primary/30 rounded-3xl p-8 flex flex-col justify-between shadow-lg relative">
              <div className="absolute -top-3 right-6 bg-primary text-on-primary text-xs font-bold uppercase tracking-wider py-0.5 px-2.5 rounded-full">
                {t('bitrate_b320_pill')}
              </div>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-xs font-bold text-primary uppercase tracking-wider">
                    {t('bitrate_b320_tag')}
                  </span>
                  <span className="text-2xl font-extrabold text-primary">
                    {t('bitrate_b320_rate')}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-on-surface mb-2">
                  {t('bitrate_b320_title')}
                </h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-4">
                  {t('bitrate_b320_desc')}
                </p>
                <ul className="text-xs space-y-2 text-on-surface-variant">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{t('bitrate_b320_p1')}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{t('bitrate_b320_p2')}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION E: AUDIO SPECIFICATION MATRIX (ACCESSIBLE TABLE) */}
        <section
          id="specs"
          className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24 border-t border-outline-variant/20"
        >
          <span id="specifications-matrix" className="sr-only" />
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-primary font-bold mb-2">
              {t('specs_badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
              {t('specs_title')}
            </h2>
            <p className="mt-4 text-on-surface-variant text-base sm:text-lg leading-relaxed">
              {t('specs_desc')}
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-outline-variant/20 shadow-xl bg-surface-container-low">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container border-b border-outline-variant/20">
                  <th
                    scope="col"
                    className="p-4 sm:p-6 text-sm font-bold text-on-surface uppercase tracking-wider w-1/3"
                  >
                    {t('specs_th_feature')}
                  </th>
                  <th
                    scope="col"
                    className="p-4 sm:p-6 text-sm font-bold text-on-surface uppercase tracking-wider w-1/3"
                  >
                    {t('specs_th_m4a')}
                  </th>
                  <th
                    scope="col"
                    className="p-4 sm:p-6 text-sm font-bold text-primary uppercase tracking-wider w-1/3 bg-primary/5"
                  >
                    {t('specs_th_mp3')}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20 text-sm sm:text-base text-on-surface-variant">
                <tr className="hover:bg-surface-container/50 transition-colors">
                  <th
                    scope="row"
                    className="p-4 sm:p-6 font-semibold text-on-surface bg-surface-container-low/40"
                  >
                    {t('specs_r1_feature')}
                  </th>
                  <td className="p-4 sm:p-6">
                    {t('specs_r1_m4a')}
                  </td>
                  <td className="p-4 sm:p-6 font-medium text-on-surface bg-primary/5">
                    {t('specs_r1_mp3')}
                  </td>
                </tr>

                <tr className="hover:bg-surface-container/50 transition-colors">
                  <th
                    scope="row"
                    className="p-4 sm:p-6 font-semibold text-on-surface bg-surface-container-low/40"
                  >
                    {t('specs_r2_feature')}
                  </th>
                  <td className="p-4 sm:p-6">
                    {t('specs_r2_m4a')}
                  </td>
                  <td className="p-4 sm:p-6 font-medium text-on-surface bg-primary/5">
                    {t('specs_r2_mp3')}
                  </td>
                </tr>

                <tr className="hover:bg-surface-container/50 transition-colors">
                  <th
                    scope="row"
                    className="p-4 sm:p-6 font-semibold text-on-surface bg-surface-container-low/40"
                  >
                    {t('specs_r3_feature')}
                  </th>
                  <td className="p-4 sm:p-6">
                    {t('specs_r3_m4a')}
                  </td>
                  <td className="p-4 sm:p-6 font-medium text-on-surface bg-primary/5">
                    {t('specs_r3_mp3')}
                  </td>
                </tr>

                <tr className="hover:bg-surface-container/50 transition-colors">
                  <th
                    scope="row"
                    className="p-4 sm:p-6 font-semibold text-on-surface bg-surface-container-low/40"
                  >
                    {t('specs_r4_feature')}
                  </th>
                  <td className="p-4 sm:p-6">
                    {t('specs_r4_m4a')}
                  </td>
                  <td className="p-4 sm:p-6 font-medium text-on-surface bg-primary/5">
                    {t('specs_r4_mp3')}
                  </td>
                </tr>

                <tr className="hover:bg-surface-container/50 transition-colors">
                  <th
                    scope="row"
                    className="p-4 sm:p-6 font-semibold text-on-surface bg-surface-container-low/40"
                  >
                    {t('specs_r5_feature')}
                  </th>
                  <td className="p-4 sm:p-6">
                    {t('specs_r5_m4a')}
                  </td>
                  <td className="p-4 sm:p-6 font-medium text-on-surface bg-primary/5">
                    {t('specs_r5_mp3')}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION F: FAQ ACCORDION GRID */}
        <section
          id="faq"
          className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24 border-t border-outline-variant/20"
        >
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-primary font-bold mb-2">
              {t('faq_badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
              {t('faq_title')}
            </h2>
            <p className="mt-4 text-on-surface-variant text-base sm:text-lg leading-relaxed">
              {t('faq_desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* FAQ 1 */}
            <details className="group bg-surface-container-low border border-outline-variant/20 rounded-3xl p-6 sm:p-8 shadow-sm transition-all duration-200 hover:border-primary/30">
              <summary className="flex items-center justify-between cursor-pointer list-none font-bold text-lg sm:text-xl text-on-surface gap-4">
                <span>{t('faq_q1')}</span>
                <ChevronDown className="w-5 h-5 text-primary shrink-0 transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <div className="mt-4 text-on-surface-variant text-sm sm:text-base leading-relaxed pt-3 border-t border-outline-variant/20">
                {t('faq_a1')}
              </div>
            </details>

            {/* FAQ 2 */}
            <details className="group bg-surface-container-low border border-outline-variant/20 rounded-3xl p-6 sm:p-8 shadow-sm transition-all duration-200 hover:border-primary/30">
              <summary className="flex items-center justify-between cursor-pointer list-none font-bold text-lg sm:text-xl text-on-surface gap-4">
                <span>{t('faq_q2')}</span>
                <ChevronDown className="w-5 h-5 text-primary shrink-0 transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <div className="mt-4 text-on-surface-variant text-sm sm:text-base leading-relaxed pt-3 border-t border-outline-variant/20">
                {t('faq_a2')}
              </div>
            </details>

            {/* FAQ 3 */}
            <details className="group bg-surface-container-low border border-outline-variant/20 rounded-3xl p-6 sm:p-8 shadow-sm transition-all duration-200 hover:border-primary/30">
              <summary className="flex items-center justify-between cursor-pointer list-none font-bold text-lg sm:text-xl text-on-surface gap-4">
                <span>{t('faq_q3')}</span>
                <ChevronDown className="w-5 h-5 text-primary shrink-0 transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <div className="mt-4 text-on-surface-variant text-sm sm:text-base leading-relaxed pt-3 border-t border-outline-variant/20">
                {t('faq_a3')}
              </div>
            </details>

            {/* FAQ 4 */}
            <details className="group bg-surface-container-low border border-outline-variant/20 rounded-3xl p-6 sm:p-8 shadow-sm transition-all duration-200 hover:border-primary/30">
              <summary className="flex items-center justify-between cursor-pointer list-none font-bold text-lg sm:text-xl text-on-surface gap-4">
                <span>{t('faq_q4')}</span>
                <ChevronDown className="w-5 h-5 text-primary shrink-0 transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <div className="mt-4 text-on-surface-variant text-sm sm:text-base leading-relaxed pt-3 border-t border-outline-variant/20">
                {t('faq_a4')}
              </div>
            </details>

            {/* FAQ 5 */}
            <details className="group bg-surface-container-low border border-outline-variant/20 rounded-3xl p-6 sm:p-8 shadow-sm transition-all duration-200 hover:border-primary/30">
              <summary className="flex items-center justify-between cursor-pointer list-none font-bold text-lg sm:text-xl text-on-surface gap-4">
                <span>{t('faq_q5')}</span>
                <ChevronDown className="w-5 h-5 text-primary shrink-0 transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <div className="mt-4 text-on-surface-variant text-sm sm:text-base leading-relaxed pt-3 border-t border-outline-variant/20">
                {t('faq_a5')}
              </div>
            </details>

            {/* FAQ 6 */}
            <details className="group bg-surface-container-low border border-outline-variant/20 rounded-3xl p-6 sm:p-8 shadow-sm transition-all duration-200 hover:border-primary/30">
              <summary className="flex items-center justify-between cursor-pointer list-none font-bold text-lg sm:text-xl text-on-surface gap-4">
                <span>{t('faq_q6')}</span>
                <ChevronDown className="w-5 h-5 text-primary shrink-0 transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <div className="mt-4 text-on-surface-variant text-sm sm:text-base leading-relaxed pt-3 border-t border-outline-variant/20">
                {t('faq_a6')}
              </div>
            </details>
          </div>
        </section>

        {/* RELATED TOOL PRESETS & QUICK LINKS */}
        <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-8">
          <div className="bg-surface-container/50 border border-outline-variant/20 rounded-3xl p-8">
            <h3 className="text-xl font-bold text-on-surface mb-4">
              {t('related_title')}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 text-sm font-medium">
              <Link
                href={`/${locale}/320kbps`}
                className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/10 text-on-surface-variant hover:text-primary hover:border-primary/30 transition-colors flex items-center justify-between"
              >
                <span>{t('related_320kbps')}</span>
                <ArrowRight className="w-4 h-4 text-primary" />
              </Link>
              <Link
                href={`/${locale}/iphone-voice-memos`}
                className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/10 text-on-surface-variant hover:text-primary hover:border-primary/30 transition-colors flex items-center justify-between"
              >
                <span>{t('related_iphone')}</span>
                <ArrowRight className="w-4 h-4 text-primary" />
              </Link>
              <Link
                href={`/${locale}/batch-converter`}
                className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/10 text-on-surface-variant hover:text-primary hover:border-primary/30 transition-colors flex items-center justify-between"
              >
                <span>{t('related_batch')}</span>
                <ArrowRight className="w-4 h-4 text-primary" />
              </Link>
              <Link
                href={`/${locale}/client-side-safe`}
                className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/10 text-on-surface-variant hover:text-primary hover:border-primary/30 transition-colors flex items-center justify-between"
              >
                <span>{t('related_safe')}</span>
                <ArrowRight className="w-4 h-4 text-primary" />
              </Link>
              <Link
                href={`/${locale}/wav-to-mp3`}
                className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/10 text-on-surface-variant hover:text-primary hover:border-primary/30 transition-colors flex items-center justify-between"
              >
                <span>{t('related_wav')}</span>
                <ArrowRight className="w-4 h-4 text-primary" />
              </Link>
              <Link
                href={`/${locale}/video-to-mp3`}
                className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/10 text-on-surface-variant hover:text-primary hover:border-primary/30 transition-colors flex items-center justify-between"
              >
                <span>{t('related_video')}</span>
                <ArrowRight className="w-4 h-4 text-primary" />
              </Link>
              <Link
                href={`/${locale}/metadata-viewer`}
                className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/10 text-on-surface-variant hover:text-primary hover:border-primary/30 transition-colors flex items-center justify-between"
              >
                <span>{t('related_meta_viewer')}</span>
                <ArrowRight className="w-4 h-4 text-primary" />
              </Link>
              <Link
                href={`/${locale}/audio-metadata-remover`}
                className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/10 text-on-surface-variant hover:text-primary hover:border-primary/30 transition-colors flex items-center justify-between"
              >
                <span>{t('related_meta_remover')}</span>
                <ArrowRight className="w-4 h-4 text-primary" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
