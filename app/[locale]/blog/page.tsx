import type { Metadata } from 'next';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import { 
  BookOpen, 
  ArrowRight, 
  Clock, 
  Sliders, 
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { getDawArticleContent } from '@/lib/translations/what-is-a-daw';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = resolvedParams.locale || 'en';

  const title = 'Audio Production Blog & Technical Guides (2026) | M4A to MP3';
  const description =
    'Educational guides and technical audio analyses. Learn about digital audio workstations, audio bitrates, sample rates, and lossless versus lossy encoding.';
  const canonicalUrl = `https://m4atomp3converter.com/${locale}/blog`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: 'https://m4atomp3converter.com/en/blog',
        es: 'https://m4atomp3converter.com/es/blog',
        fr: 'https://m4atomp3converter.com/fr/blog',
        de: 'https://m4atomp3converter.com/de/blog',
        pt: 'https://m4atomp3converter.com/pt/blog',
        ru: 'https://m4atomp3converter.com/ru/blog',
        'x-default': 'https://m4atomp3converter.com/en/blog',
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'M4A to MP3 Converter.com',
      type: 'website',
    },
  };
}

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale || 'en';
  setRequestLocale(locale);

  const dawContent = getDawArticleContent(locale);

  const articles = [
    {
      slug: 'what-is-a-daw',
      title: dawContent.hero.title,
      excerpt: dawContent.hero.subtitle,
      category: 'DAW & Studio',
      readTime: dawContent.hero.readTime,
      featured: true,
      badge: dawContent.hero.badge,
      date: '2026-09-14',
      href: '/blog/what-is-a-daw',
    },
    {
      slug: 'sample-rate-vs-bit-depth',
      title: 'Audio Sample Rate vs. Bit Depth: The Complete Guide',
      excerpt:
        'Understand sample rates (44.1kHz vs 48kHz vs 96kHz) and bit depth (16-bit vs 24-bit vs 32-bit float). Discover how the Nyquist theorem and dynamic range headroom shape digital sound.',
      category: 'Acoustics & Fidelity',
      readTime: '9 min read',
      featured: false,
      date: '2026-09-12',
      href: '/blog/sample-rate-vs-bit-depth',
    },
    {
      slug: 'lossless-vs-lossy-audio',
      title: 'Lossless vs. Lossy Audio: WAV, FLAC, AAC, and MP3 Compared',
      excerpt:
        'Explore digital audio encoding architectures: psychoacoustic algorithms, frequency masking, uncompressed Linear PCM WAV, lossless FLAC compression, and lossy MP3/AAC containers.',
      category: 'Compression Codecs',
      readTime: '8 min read',
      featured: false,
      date: '2026-09-10',
      href: '/blog/lossless-vs-lossy-audio',
    },
  ];

  const featuredArticle = articles.find((a) => a.featured) || articles[0];
  const regularArticles = articles.filter((a) => !a.featured);

  return (
    <main className="min-h-screen bg-surface selection:bg-primary/30 text-on-surface flex flex-col">
      <div className="flex-1 w-full max-w-[1300px] mx-auto px-4 sm:px-8 xl:px-12 py-10 md:py-16 flex flex-col">
        {/* Header Title Section */}
        <div className="w-full flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-4">
            <BookOpen className="w-4 h-4" />
            <span>Audio Engineering &amp; Studio Articles</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface mb-4">
            Audio Production &amp; Sound Engineering Guides
          </h1>
          <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed">
            In-depth technical guides, acoustic analyses, and digital studio workflows. Written by audio engineers for producers, musicians, and sound designers.
          </p>
        </div>

        {/* Featured Hero Article */}
        {featuredArticle && (
          <div className="w-full mb-16">
            <div className="relative overflow-hidden rounded-3xl bg-surface-container border border-outline-variant/30 hover:border-primary/40 transition-all shadow-sm group">
              <div className="p-8 sm:p-10 lg:p-12 flex flex-col lg:flex-row gap-8 lg:gap-12 items-start justify-between">
                <div className="flex-1 flex flex-col items-start gap-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary text-on-primary tracking-wide">
                      {featuredArticle.badge || 'Featured Guide'}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-surface-container-high text-xs font-medium text-on-surface-variant border border-outline-variant/20">
                      {featuredArticle.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-on-surface-variant">
                      <Clock className="w-3.5 h-3.5" />
                      {featuredArticle.readTime}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-on-surface group-hover:text-primary transition-colors leading-tight">
                    <Link href={`/${locale}${featuredArticle.href}`}>
                      {featuredArticle.title}
                    </Link>
                  </h2>

                  <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed">
                    {featuredArticle.excerpt}
                  </p>

                  <div className="pt-2">
                    <Link
                      href={`/${locale}${featuredArticle.href}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary font-semibold text-sm hover:bg-primary/90 transition-all shadow-md group-hover:shadow-lg"
                    >
                      <span>Read Complete Guide</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>

                {/* Right Highlights Panel */}
                <div className="w-full lg:w-80 shrink-0 p-6 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex flex-col gap-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                    <Sliders className="w-4 h-4" />
                    Key Topics Covered
                  </div>
                  <ul className="space-y-2.5 text-xs text-on-surface-variant">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      Top 6 Free &amp; Beginner DAWs compared
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      MIDI sequencing, VSTs, and multitrack tracking
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      Audacity vs Full DAW architecture
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      Stem export math &amp; audio resolution
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section Heading */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-outline-variant/20">
          <h2 className="text-xl sm:text-2xl font-bold text-on-surface flex items-center gap-2">
            <Layers className="w-5 h-5 text-primary" />
            All Educational Articles
          </h2>
          <span className="text-xs text-on-surface-variant font-medium">
            {articles.length} in-depth articles
          </span>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {regularArticles.map((article) => (
            <article
              key={article.slug}
              className="flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-surface-container-low border border-outline-variant/20 hover:border-primary/40 hover:shadow-md transition-all group"
            >
              <div className="flex flex-col gap-3 mb-6">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 rounded-md bg-surface-container font-medium text-on-surface-variant border border-outline-variant/20">
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1 text-on-surface-variant/80">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-on-surface group-hover:text-primary transition-colors leading-snug">
                  <Link href={`/${locale}${article.href}`}>
                    {article.title}
                  </Link>
                </h3>

                <p className="text-sm text-on-surface-variant leading-relaxed">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-outline-variant/10 flex items-center justify-between text-xs font-semibold">
                <Link
                  href={`/${locale}${article.href}`}
                  className="inline-flex items-center gap-1.5 text-primary hover:underline group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-on-surface-variant/70 font-mono text-[11px]">
                  {article.date}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
