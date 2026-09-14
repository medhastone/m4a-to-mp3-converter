import type { Metadata } from 'next';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import {
  Sliders,
  Cpu,
  Layers,
  Headphones,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
  ChevronDown,
  FileAudio,
  Disc,
  Mic,
  Piano,
  Laptop,
  AlertCircle,
  RefreshCw,
  Clock,
  BookOpen,
  Award,
} from 'lucide-react';
import { getDawArticleContent } from '@/lib/translations/what-is-a-daw';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = resolvedParams.locale || 'en';
  const content = getDawArticleContent(locale);
  const canonicalUrl = `https://m4atomp3converter.com/${locale}/what-is-a-daw`;

  return {
    title: content.metadata.title,
    description: content.metadata.description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: 'https://m4atomp3converter.com/en/what-is-a-daw',
        es: 'https://m4atomp3converter.com/es/what-is-a-daw',
        fr: 'https://m4atomp3converter.com/fr/what-is-a-daw',
        de: 'https://m4atomp3converter.com/de/what-is-a-daw',
        pt: 'https://m4atomp3converter.com/pt/what-is-a-daw',
        ru: 'https://m4atomp3converter.com/ru/what-is-a-daw',
        'x-default': 'https://m4atomp3converter.com/en/what-is-a-daw',
      },
    },
    openGraph: {
      title: content.metadata.ogTitle,
      description: content.metadata.ogDescription,
      url: canonicalUrl,
      siteName: 'M4A to MP3 Converter.com',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: content.metadata.ogTitle,
      description: content.metadata.ogDescription,
    },
  };
}

export default async function WhatIsADawPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale || 'en';
  setRequestLocale(locale);

  const content = getDawArticleContent(locale);

  // Schema.org Comprehensive Linked Data Graph localized for the active language
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        '@id': `https://m4atomp3converter.com/${locale}/what-is-a-daw#article`,
        headline: content.hero.title,
        description: content.metadata.description,
        inLanguage: locale,
        mainEntityOfPage: `https://m4atomp3converter.com/${locale}/what-is-a-daw`,
        url: `https://m4atomp3converter.com/${locale}/what-is-a-daw`,
        datePublished: '2026-01-15T08:00:00+00:00',
        dateModified: '2026-09-14T08:00:00+00:00',
        author: {
          '@type': 'Organization',
          name: content.hero.author,
          url: `https://m4atomp3converter.com/${locale}/about`,
        },
        publisher: {
          '@type': 'Organization',
          name: 'M4AToMP3Converter Studio (Powered by Medhastone)',
          url: 'https://m4atomp3converter.com',
          logo: {
            '@type': 'ImageObject',
            url: 'https://m4atomp3converter.com/icon-192x192.png',
          },
        },
        about: [
          {
            '@type': 'Thing',
            name: 'Digital Audio Workstation',
            description: content.snippet.definition,
          },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: content.breadcrumbs.home,
            item: `https://m4atomp3converter.com/${locale}`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: content.breadcrumbs.guides,
            item: `https://m4atomp3converter.com/${locale}#specs`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: content.breadcrumbs.current,
            item: `https://m4atomp3converter.com/${locale}/what-is-a-daw`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `https://m4atomp3converter.com/${locale}/what-is-a-daw#faq`,
        mainEntity: content.faq.items.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.a,
          },
        })),
      },
    ],
  };

  return (
    <main className="min-h-screen bg-surface selection:bg-primary/30 text-on-surface flex flex-col">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 flex flex-col gap-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-xs sm:text-sm text-on-surface-variant">
          <Link href={`/${locale}`} className="hover:text-primary transition-colors">
            {content.breadcrumbs.home}
          </Link>
          <span>/</span>
          <Link href={`/${locale}#specs`} className="hover:text-primary transition-colors">
            {content.breadcrumbs.guides}
          </Link>
          <span>/</span>
          <span className="text-on-surface font-semibold truncate">{content.breadcrumbs.current}</span>
        </nav>

        {/* SECTION A: Hero & Featured Snippet Capture Block */}
        <header className="flex flex-col gap-6" id="hero-featured-snippet">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
              <Sparkles className="w-3.5 h-3.5" />
              {content.hero.badge}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-surface-container-high text-on-surface-variant border border-outline-variant/30">
              <Clock className="w-3.5 h-3.5" />
              {content.hero.readTime}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <Award className="w-3.5 h-3.5" />
              {content.hero.verified}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-on-surface leading-[1.2]">
            {content.hero.title}
          </h1>

          <p className="text-lg sm:text-xl text-on-surface-variant leading-relaxed max-w-4xl font-normal">
            {content.hero.subtitle}
          </p>

          <div className="flex items-center gap-4 text-xs sm:text-sm text-on-surface-variant border-y border-outline-variant/20 py-3">
            <span>{content.hero.bylinePrefix} <strong>{content.hero.author}</strong></span>
            <span>•</span>
            <span>{content.hero.updatedDate}</span>
            <span>•</span>
            <span>{content.hero.targetTopicsLabel}: <em>{content.hero.targetTopics}</em></span>
          </div>

          {/* TARGET FEATURED SNIPPET CALLOUT BOX */}
          <section
            id="featured-snippet-definition"
            aria-labelledby="snippet-heading"
            className="relative overflow-hidden bg-gradient-to-br from-surface-container-high to-surface-container-low border-2 border-primary/40 rounded-3xl p-6 sm:p-8 shadow-xl shadow-primary/5"
          >
            <div className="absolute top-0 right-0 translate-x-4 -translate-y-4 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center gap-2 text-primary font-bold text-sm tracking-wide uppercase mb-3">
              <BookOpen className="w-4 h-4" />
              <span id="snippet-heading">{content.snippet.heading}</span>
            </div>

            <p className="text-base sm:text-lg lg:text-xl font-medium text-on-surface leading-relaxed mb-4">
              {content.snippet.definition}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-outline-variant/20 text-xs sm:text-sm text-on-surface-variant">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                <span><strong>{content.snippet.acronymLabel}:</strong> {content.snippet.acronymValue}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                <span><strong>{content.snippet.pronunciationLabel}:</strong> {content.snippet.pronunciationValue}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />
                <span><strong>{content.snippet.primaryTaskLabel}:</strong> {content.snippet.primaryTaskValue}</span>
              </div>
            </div>
          </section>
        </header>

        {/* SECTION B: The 5 Core Engines Inside Every DAW */}
        <section id="daw-engines" className="flex flex-col gap-6 pt-4">
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-widest text-primary font-bold">
              {content.engines.tag}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-on-surface tracking-tight">
              {content.engines.heading}
            </h2>
            <p className="text-on-surface-variant text-base sm:text-lg leading-relaxed max-w-3xl">
              {content.engines.intro}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* System 1 */}
            <div className="bg-surface-container-low border border-outline-variant/20 rounded-2xl p-6 flex flex-col gap-4 hover:border-primary/40 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">
                <Mic className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-on-surface">
                {content.engines.system1.title}
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {content.engines.system1.description}
              </p>
              <div className="mt-auto pt-3 border-t border-outline-variant/20 text-xs text-primary font-semibold">
                {content.engines.system1.tag}
              </div>
            </div>

            {/* System 2 */}
            <div className="bg-surface-container-low border border-outline-variant/20 rounded-2xl p-6 flex flex-col gap-4 hover:border-primary/40 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold text-lg">
                <Piano className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-on-surface">
                {content.engines.system2.title}
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {content.engines.system2.description}
              </p>
              <div className="mt-auto pt-3 border-t border-outline-variant/20 text-xs text-emerald-500 font-semibold">
                {content.engines.system2.tag}
              </div>
            </div>

            {/* System 3 */}
            <div className="bg-surface-container-low border border-outline-variant/20 rounded-2xl p-6 flex flex-col gap-4 hover:border-primary/40 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold text-lg">
                <Sliders className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-on-surface">
                {content.engines.system3.title}
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {content.engines.system3.description}
              </p>
              <div className="mt-auto pt-3 border-t border-outline-variant/20 text-xs text-blue-500 font-semibold">
                {content.engines.system3.tag}
              </div>
            </div>

            {/* System 4 */}
            <div className="bg-surface-container-low border border-outline-variant/20 rounded-2xl p-6 flex flex-col gap-4 hover:border-primary/40 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center font-bold text-lg">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-on-surface">
                {content.engines.system4.title}
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {content.engines.system4.description}
              </p>
              <div className="mt-auto pt-3 border-t border-outline-variant/20 text-xs text-purple-500 font-semibold">
                {content.engines.system4.tag}
              </div>
            </div>

            {/* System 5 */}
            <div className="bg-surface-container-low border border-outline-variant/20 rounded-2xl p-6 flex flex-col gap-4 hover:border-primary/40 transition-all duration-300 md:col-span-2 lg:col-span-2">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold text-lg">
                <Disc className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-on-surface">
                {content.engines.system5.title}
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {content.engines.system5.description}
              </p>
              <div className="mt-auto pt-3 border-t border-outline-variant/20 text-xs text-amber-500 font-semibold">
                {content.engines.system5.tag}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION C: Comprehensive Beginner DAW Comparison Matrix */}
        <section id="daw-comparison-table" className="flex flex-col gap-6 pt-4">
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-widest text-primary font-bold">
              {content.comparison.tag}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-on-surface tracking-tight">
              {content.comparison.heading}
            </h2>
            <p className="text-on-surface-variant text-base sm:text-lg leading-relaxed max-w-3xl">
              {content.comparison.intro}
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-outline-variant/20 bg-surface-container-low shadow-sm">
            <table className="w-full text-left border-collapse min-w-[760px]" aria-label="Digital Audio Workstations Comparison Matrix">
              <thead>
                <tr className="border-b border-outline-variant/30 bg-surface-container text-on-surface text-xs sm:text-sm uppercase tracking-wider font-bold">
                  <th scope="col" className="py-4 px-5">{content.comparison.tableHeaders.name}</th>
                  <th scope="col" className="py-4 px-5">{content.comparison.tableHeaders.price}</th>
                  <th scope="col" className="py-4 px-5">{content.comparison.tableHeaders.os}</th>
                  <th scope="col" className="py-4 px-5">{content.comparison.tableHeaders.curve}</th>
                  <th scope="col" className="py-4 px-5">{content.comparison.tableHeaders.bestFor}</th>
                  <th scope="col" className="py-4 px-5">{content.comparison.tableHeaders.exportFormat}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10 text-sm text-on-surface-variant">
                {content.comparison.rows.map((row, idx) => {
                  const badgeClasses =
                    row.badgeStyle === 'free'
                      ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                      : row.badgeStyle === 'trial'
                      ? 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                      : 'bg-primary/10 text-primary border-primary/20';

                  const curveClasses =
                    row.curveStyle === 'easy'
                      ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
                      : row.curveStyle === 'mod'
                      ? 'text-amber-600 dark:text-amber-400 font-semibold'
                      : 'text-purple-600 dark:text-purple-400 font-semibold';

                  const dotColor =
                    idx === 0
                      ? 'bg-blue-500'
                      : idx === 1
                      ? 'bg-primary'
                      : idx === 2
                      ? 'bg-amber-500'
                      : idx === 3
                      ? 'bg-orange-500'
                      : idx === 4
                      ? 'bg-purple-500'
                      : 'bg-cyan-500';

                  return (
                    <tr key={row.name} className="hover:bg-surface-container/50 transition-colors">
                      <td className="py-4 px-5 font-semibold text-on-surface">
                        <div className="flex items-center gap-2">
                          <span className={`w-2.5 h-2.5 rounded-full ${dotColor}`} />
                          {row.name}
                        </div>
                      </td>
                      <td className="py-4 px-5">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${badgeClasses}`}>
                          {row.badge}
                        </span>
                      </td>
                      <td className="py-4 px-5">{row.os}</td>
                      <td className={`py-4 px-5 ${curveClasses}`}>{row.curve}</td>
                      <td className="py-4 px-5">{row.bestFor}</td>
                      <td className="py-4 px-5 font-mono text-xs">{row.exportFormat}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-surface-container/50 border border-outline-variant/20 flex flex-col gap-2">
              <h3 className="font-bold text-on-surface flex items-center gap-2">
                <Laptop className="w-4 h-4 text-primary" />
                {content.comparison.verdictMac.title}
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {content.comparison.verdictMac.desc}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-surface-container/50 border border-outline-variant/20 flex flex-col gap-2">
              <h3 className="font-bold text-on-surface flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                {content.comparison.verdictPc.title}
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {content.comparison.verdictPc.desc}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION D: The Crucial Distinction: Audio Editor vs Full DAW */}
        <section id="audacity-vs-daw" className="flex flex-col gap-6 pt-4">
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-widest text-primary font-bold">
              {content.audacityVsDaw.tag}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-on-surface tracking-tight">
              {content.audacityVsDaw.heading}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 flex flex-col gap-4 text-on-surface-variant text-base leading-relaxed">
              <p>{content.audacityVsDaw.p1}</p>
              <p>{content.audacityVsDaw.p2}</p>
              <ul className="space-y-3 pl-2">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-lg bg-blue-500/10 text-blue-500 font-bold flex items-center justify-center shrink-0 mt-0.5 text-xs">
                    {content.audacityVsDaw.bulletA.label}
                  </span>
                  <span>
                    <strong className="text-on-surface">{content.audacityVsDaw.bulletA.title}</strong>{' '}
                    {content.audacityVsDaw.bulletA.desc}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-lg bg-primary/10 text-primary font-bold flex items-center justify-center shrink-0 mt-0.5 text-xs">
                    {content.audacityVsDaw.bulletB.label}
                  </span>
                  <span>
                    <strong className="text-on-surface">{content.audacityVsDaw.bulletB.title}</strong>{' '}
                    {content.audacityVsDaw.bulletB.desc}
                  </span>
                </li>
              </ul>
              <p>{content.audacityVsDaw.p3}</p>
            </div>

            <div className="lg:col-span-5 bg-surface-container-low border border-outline-variant/20 rounded-3xl p-6 flex flex-col gap-4">
              <h3 className="text-lg font-bold text-on-surface flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-500" />
                {content.audacityVsDaw.sideCard.title}
              </h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 rounded-xl bg-surface-container/60 border border-outline-variant/10">
                  <span className="font-semibold text-on-surface block mb-1">
                    {content.audacityVsDaw.sideCard.editorTitle}
                  </span>
                  <span className="text-xs text-on-surface-variant block">
                    {content.audacityVsDaw.sideCard.editorDesc}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-surface-container/60 border border-outline-variant/10">
                  <span className="font-semibold text-on-surface block mb-1">
                    {content.audacityVsDaw.sideCard.dawTitle}
                  </span>
                  <span className="text-xs text-on-surface-variant block">
                    {content.audacityVsDaw.sideCard.dawDesc}
                  </span>
                </div>
              </div>
              <div className="pt-2 text-xs text-on-surface-variant border-t border-outline-variant/20">
                {content.audacityVsDaw.sideCard.proTip}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION E: The Production Bottleneck & High-Converting Conversion Bridge */}
        <section id="wav-export-bottleneck" className="flex flex-col gap-6 pt-4">
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-widest text-primary font-bold">
              {content.bottleneck.tag}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-on-surface tracking-tight">
              {content.bottleneck.heading}
            </h2>
            <p className="text-on-surface-variant text-base sm:text-lg leading-relaxed max-w-3xl">
              {content.bottleneck.intro}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex flex-col gap-2">
              <span className="text-xs uppercase tracking-wider text-primary font-bold">
                {content.bottleneck.stat1.label}
              </span>
              <span className="text-2xl font-extrabold text-on-surface">
                {content.bottleneck.stat1.value}
              </span>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                {content.bottleneck.stat1.desc}
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex flex-col gap-2">
              <span className="text-xs uppercase tracking-wider text-amber-500 font-bold">
                {content.bottleneck.stat2.label}
              </span>
              <span className="text-2xl font-extrabold text-on-surface">
                {content.bottleneck.stat2.value}
              </span>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                {content.bottleneck.stat2.desc}
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex flex-col gap-2">
              <span className="text-xs uppercase tracking-wider text-rose-500 font-bold">
                {content.bottleneck.stat3.label}
              </span>
              <span className="text-2xl font-extrabold text-on-surface">
                {content.bottleneck.stat3.value}
              </span>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                {content.bottleneck.stat3.desc}
              </p>
            </div>
          </div>

          {/* HIGH-CONVERTING EDITORIAL CTA CONVERSION BOX */}
          <div className="relative overflow-hidden rounded-3xl border-2 border-emerald-500/50 bg-gradient-to-br from-emerald-950/30 via-surface-container-low to-surface-container-high p-8 sm:p-10 shadow-2xl">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
              <div className="flex flex-col gap-4 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                  <ShieldCheck className="w-4 h-4" />
                  {content.bottleneck.ctaBox.badge}
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
                  {content.bottleneck.ctaBox.heading}
                </h3>
                
                <p className="text-on-surface-variant text-base leading-relaxed">
                  {content.bottleneck.ctaBox.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-on-surface-variant pt-1">
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> {content.bottleneck.ctaBox.benefit1}</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> {content.bottleneck.ctaBox.benefit2}</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> {content.bottleneck.ctaBox.benefit3}</span>
                </div>
              </div>

              {/* Conversion Action Buttons */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto shrink-0">
                <Link
                  href={`/${locale}/wav-to-mp3`}
                  className="inline-flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 font-bold text-base shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <FileAudio className="w-5 h-5" />
                  <span>{content.bottleneck.ctaBox.primaryBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href={`/${locale}/mp3-to-wav`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 text-on-surface font-semibold text-sm transition-colors"
                >
                  <RefreshCw className="w-4 h-4 text-primary" />
                  <span>{content.bottleneck.ctaBox.secondaryBtn}</span>
                  <span className="text-xs text-on-surface-variant">{content.bottleneck.ctaBox.secondarySubtext}</span>
                </Link>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-outline-variant/20 text-xs text-on-surface-variant flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>{content.bottleneck.ctaBox.bottomTip}</span>
            </div>
          </div>
        </section>

        {/* SECTION F: Hardware Requirements */}
        <section id="daw-hardware-requirements" className="flex flex-col gap-6 pt-4">
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-widest text-primary font-bold">
              {content.hardware.tag}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-on-surface tracking-tight">
              {content.hardware.heading}
            </h2>
            <p className="text-on-surface-variant text-base sm:text-lg leading-relaxed max-w-3xl">
              {content.hardware.intro}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Spec 1 */}
            <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/20 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Laptop className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-on-surface">
                  {content.hardware.spec1.title}
                </h3>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {content.hardware.spec1.desc}
              </p>
            </div>

            {/* Spec 2 */}
            <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/20 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-on-surface">
                  {content.hardware.spec2.title}
                </h3>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {content.hardware.spec2.desc}
              </p>
            </div>

            {/* Spec 3 */}
            <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/20 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                  <Headphones className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-on-surface">
                  {content.hardware.spec3.title}
                </h3>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {content.hardware.spec3.desc}
              </p>
            </div>

            {/* Spec 4 */}
            <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/20 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
                  <Piano className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-on-surface">
                  {content.hardware.spec4.title}
                </h3>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {content.hardware.spec4.desc}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION G: High-Intent FAQ Accordion */}
        <section id="daw-faq" className="flex flex-col gap-6 pt-4 mb-8">
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-widest text-primary font-bold">
              {content.faq.tag}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-on-surface tracking-tight">
              {content.faq.heading}
            </h2>
            <p className="text-on-surface-variant text-base sm:text-lg leading-relaxed max-w-3xl">
              {content.faq.intro}
            </p>
          </div>

          <div className="space-y-4">
            {content.faq.items.map((faqItem, idx) => (
              <details
                key={idx}
                className="group bg-surface-container-low border border-outline-variant/20 rounded-2xl p-5 sm:p-6 transition-all duration-200 hover:border-primary/30"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none font-bold text-base sm:text-lg text-on-surface gap-4">
                  <span>{faqItem.q}</span>
                  <ChevronDown className="w-5 h-5 text-primary shrink-0 transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <div className="mt-4 text-on-surface-variant text-sm sm:text-base leading-relaxed pt-3 border-t border-outline-variant/20">
                  {faqItem.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* RELATED TOOL PRESETS & QUICK LINKS */}
        <footer className="pt-6 border-t border-outline-variant/20 flex flex-col gap-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-on-surface-variant">
            {content.footerLinks.heading}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 text-xs sm:text-sm font-medium">
            {content.footerLinks.links.map((tool) => (
              <Link
                key={tool.href}
                href={`/${locale}${tool.href}`}
                className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/10 text-on-surface-variant hover:text-primary hover:border-primary/30 transition-colors flex items-center justify-between"
              >
                <span>{tool.title}</span>
                <ArrowRight className="w-4 h-4 text-primary" />
              </Link>
            ))}
          </div>
        </footer>
      </div>
    </main>
  );
}
