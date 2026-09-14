import type { Metadata } from 'next';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import { 
  ArrowLeft, 
  Clock, 
  BookOpen, 
  HelpCircle, 
  Sliders, 
  Activity, 
  Layers, 
  ChevronDown,
  FileAudio,
  Zap,
  Ear
} from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = resolvedParams.locale || 'en';

  const title = 'Lossless vs Lossy Audio: WAV, FLAC, AAC & MP3 Compared (2026)';
  const description =
    'Detailed technical comparison between lossless and lossy audio codecs. Learn how psychoacoustic masking works, why generational loss occurs, and when to keep audio uncompressed.';
  const canonicalUrl = `https://m4atomp3converter.com/${locale}/blog/lossless-vs-lossy-audio`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'M4A to MP3 Converter.com',
      type: 'article',
    },
  };
}

export default async function LosslessVsLossyAudioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale || 'en';
  setRequestLocale(locale);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: 'Lossless vs Lossy Audio: WAV, FLAC, AAC & MP3 Compared (2026)',
    description:
      'Explore digital audio encoding architectures: psychoacoustic algorithms, uncompressed Linear PCM WAV, lossless FLAC compression, and lossy AAC/MP3 containers.',
    author: {
      '@type': 'Organization',
      name: 'M4A to MP3 Converter Editorial Team',
      url: 'https://m4atomp3converter.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'M4A to MP3 Converter',
      logo: {
        '@type': 'ImageObject',
        url: 'https://m4atomp3converter.com/logo.png',
      },
    },
    datePublished: '2026-09-10',
    dateModified: '2026-09-14',
    mainEntityOfPage: `https://m4atomp3converter.com/${locale}/blog/lossless-vs-lossy-audio`,
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the main difference between lossless and lossy audio?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Lossless audio retains 100% of the original waveform data without discarding any information (e.g. WAV, AIFF, FLAC, ALAC). Lossy audio permanently removes frequencies and sounds deemed imperceptible by psychoacoustic models to reduce file sizes by 70% to 90% (e.g. MP3, AAC, OGG).',
        },
      },
      {
        '@type': 'Question',
        name: 'Can you hear the difference between a 320kbps MP3 and a lossless WAV?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'On typical consumer headphones, Bluetooth speakers, and smartphones, most listeners cannot distinguish high-bitrate 320kbps MP3 or 256kbps AAC from uncompressed WAV. However, on calibrated studio reference monitors in acoustically treated rooms, subtle differences in high-frequency air, stereo imaging, and transient attack can be detected.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does converting MP3 to WAV restore lost audio quality?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Once audio data is discarded during lossy compression, it cannot be reconstructed. Converting an MP3 to WAV simply wraps the lossy data into an uncompressed container, which is useful for DAW software compatibility but cannot restore high frequencies or dynamic details.',
        },
      },
    ],
  };

  return (
    <main className="min-h-screen bg-surface selection:bg-primary/30 text-on-surface flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <article className="flex-1 w-full max-w-[1000px] mx-auto px-4 sm:px-8 py-10 md:py-16 flex flex-col">
        {/* Navigation Breadcrumb */}
        <div className="w-full flex items-center justify-between mb-8 text-sm">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </Link>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
            <BookOpen className="w-3.5 h-3.5" />
            Audio Engineering Guide
          </div>
        </div>

        {/* Article Header */}
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-3 text-xs text-on-surface-variant mb-4">
            <span className="px-2.5 py-0.5 rounded-md bg-surface-container font-semibold text-primary border border-outline-variant/20">
              Compression Codecs
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              8 min read
            </span>
            <span>•</span>
            <span className="font-mono">Updated September 2026</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-on-surface mb-6 leading-tight">
            Lossless vs. Lossy Audio: WAV, FLAC, AAC, and MP3 Compared
          </h1>
          <p className="text-lg sm:text-xl text-on-surface-variant leading-relaxed font-normal">
            Every audio file you stream, export, or record relies on an audio codec. Here is an architectural breakdown of psychoacoustic compression, mathematical differences, and when fidelity matters most.
          </p>
        </header>

        {/* Comparison Overview */}
        <div className="p-6 sm:p-8 rounded-3xl bg-surface-container-low border border-outline-variant/30 mb-12 shadow-sm">
          <h2 className="text-base font-bold uppercase tracking-wider text-primary mb-3 flex items-center gap-2">
            <Activity className="w-4 h-4" /> The 3 Audio Format Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-on-surface leading-relaxed">
            <div className="p-4 rounded-2xl bg-surface-container border border-outline-variant/20">
              <h3 className="font-bold text-base mb-1 text-on-surface flex items-center gap-1.5">
                <FileAudio className="w-4 h-4 text-primary" /> Uncompressed PCM
              </h3>
              <p className="text-xs text-on-surface-variant/80 mb-2">WAV, AIFF (1,411 - 4,608 kbps)</p>
              <p className="text-xs text-on-surface-variant">
                Raw binary representation of electrical voltage levels over time. Zero compression, zero mathematical processing overhead, highest disk space.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-surface-container border border-outline-variant/20">
              <h3 className="font-bold text-base mb-1 text-on-surface flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-emerald-500" /> Lossless Compressed
              </h3>
              <p className="text-xs text-on-surface-variant/80 mb-2">FLAC, ALAC (600 - 900 kbps)</p>
              <p className="text-xs text-on-surface-variant">
                Like a ZIP archive for audio. Reduces file sizes by 40% to 50% using linear prediction and Huffman coding. Decodes to 100% bit-identical original PCM.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-surface-container border border-outline-variant/20">
              <h3 className="font-bold text-base mb-1 text-on-surface flex items-center gap-1.5">
                <Ear className="w-4 h-4 text-amber-500" /> Lossy Perceptual
              </h3>
              <p className="text-xs text-on-surface-variant/80 mb-2">MP3, AAC, OGG (128 - 320 kbps)</p>
              <p className="text-xs text-on-surface-variant">
                Uses psychoacoustic algorithms to permanently discard sound humans cannot easily hear. Shrinks files by up to 90% for instant streaming and storage.
              </p>
            </div>
          </div>
        </div>

        {/* Section 1: How Lossy Compression Works */}
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface mb-4">
            1. The Psychoacoustic Engine: How Lossy Encoders Save Space
          </h2>
          <p className="text-on-surface-variant leading-relaxed mb-4">
            Lossy compression codecs like MP3 (MPEG-1 Audio Layer III) and AAC (Advanced Audio Coding) do not simply chop off audio randomly. They run audio frames through a mathematical <strong>Modified Discrete Cosine Transform (MDCT)</strong> and evaluate them using biological models of human hearing:
          </p>

          <div className="space-y-4 my-6">
            <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/20">
              <h3 className="font-bold text-base text-on-surface mb-1">Simultaneous Frequency Masking</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                When a loud sound and a quiet sound occur at frequencies close to each other at the exact same moment (e.g. a thunderous snare hit and a subtle room reverb harmonic), the human basilar membrane inside the inner ear is overwhelmed by the louder tone. The encoder removes the masked quieter sound completely.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/20">
              <h3 className="font-bold text-base text-on-surface mb-1">Temporal Masking</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                For approximately 5 to 20 milliseconds before a loud transient attack (pre-masking) and up to 100 milliseconds after (post-masking), human hearing sensitivity drops sharply. Encoders allocate fewer bits or zero bits to sounds falling inside this window.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/20">
              <h3 className="font-bold text-base text-on-surface mb-1">Absolute Threshold of Hearing (ATH)</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Human ears are exquisitely sensitive between 1 kHz and 5 kHz (the range of human speech), but far less sensitive below 40 Hz and above 16 kHz. Encoders filter out extreme low sub-rumbles and gently roll off ultrasonic frequencies beyond 20.5 kHz.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Bitrate and Storage Comparison Table */}
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface mb-4">
            2. Side-by-Side Format Comparison Matrix
          </h2>
          <div className="overflow-x-auto my-6 border border-outline-variant/20 rounded-2xl">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface-container text-on-surface text-xs uppercase font-bold border-b border-outline-variant/20">
                <tr>
                  <th scope="col" className="p-4">Format</th>
                  <th scope="col" className="p-4">Type</th>
                  <th scope="col" className="p-4">Typical Bitrate</th>
                  <th scope="col" className="p-4">5-Min Song Size</th>
                  <th scope="col" className="p-4">DAW Editing Compatibility</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10 text-on-surface-variant">
                <tr>
                  <td className="p-4 font-semibold text-on-surface">WAV (16-bit / 44.1kHz)</td>
                  <td className="p-4 text-emerald-500 font-medium">Uncompressed</td>
                  <td className="p-4">1,411 kbps</td>
                  <td className="p-4">~50.4 MB</td>
                  <td className="p-4">100% Universal</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-on-surface">WAV (24-bit / 48kHz)</td>
                  <td className="p-4 text-emerald-500 font-medium">Uncompressed</td>
                  <td className="p-4">2,304 kbps</td>
                  <td className="p-4">~82.4 MB</td>
                  <td className="p-4">Studio Master Standard</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-on-surface">FLAC</td>
                  <td className="p-4 text-emerald-500 font-medium">Lossless</td>
                  <td className="p-4">~850 kbps</td>
                  <td className="p-4">~30.0 MB</td>
                  <td className="p-4">High (Modern DAWs)</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-on-surface">MP3 (320 kbps)</td>
                  <td className="p-4 text-amber-500 font-medium">Lossy</td>
                  <td className="p-4">320 kbps</td>
                  <td className="p-4">~11.5 MB</td>
                  <td className="p-4">Preview only (avoids jitter)</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-on-surface">AAC (256 kbps)</td>
                  <td className="p-4 text-amber-500 font-medium">Lossy</td>
                  <td className="p-4">256 kbps</td>
                  <td className="p-4">~9.2 MB</td>
                  <td className="p-4">Consumer playback (Apple Music)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: Generational Loss Warning */}
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface mb-4">
            3. The Danger of Transcoding: Generational Loss
          </h2>
          <p className="text-on-surface-variant leading-relaxed mb-4">
            One of the most important rules in digital audio engineering is: <strong>never re-compress a lossy file into another lossy format</strong>.
          </p>
          <div className="p-6 rounded-2xl bg-surface-container border border-outline-variant/20 leading-relaxed text-sm text-on-surface-variant">
            <p className="mb-2">
              If you take a 128kbps MP3 and export it as an AAC or another MP3, you are applying two consecutive psychoacoustic discarding passes. Each pass adds quantization noise, smears high-frequency transients, and creates watery artifacts.
            </p>
            <p className="font-semibold text-on-surface">
              Always preserve your original DAW project stems and master mixes in uncompressed 24-bit WAV format. Whenever you need an MP3 or AAC for sharing, create it directly from the pristine master WAV.
            </p>
          </div>
        </section>

        {/* Section 4: Frequently Asked Questions */}
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface mb-6 flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-primary" /> Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            <details className="group bg-surface-container-low border border-outline-variant/20 rounded-2xl p-5 transition-all">
              <summary className="flex items-center justify-between cursor-pointer list-none font-bold text-on-surface text-base">
                <span>Is AAC better quality than MP3 at the same bitrate?</span>
                <ChevronDown className="w-4 h-4 text-primary transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm text-on-surface-variant leading-relaxed">
                Yes. AAC was developed as the successor to MP3. It utilizes larger filter bank frequency resolutions (up to 1,024 frequency lines compared to 576 in MP3), superior transient processing, and flexible joint-stereo coding. A 256kbps AAC generally matches or outperforms a 320kbps MP3 in fidelity.
              </p>
            </details>

            <details className="group bg-surface-container-low border border-outline-variant/20 rounded-2xl p-5 transition-all">
              <summary className="flex items-center justify-between cursor-pointer list-none font-bold text-on-surface text-base">
                <span>Why don’t streaming services stream raw uncompressed WAV?</span>
                <ChevronDown className="w-4 h-4 text-primary transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm text-on-surface-variant leading-relaxed">
                Raw WAV files consume approximately 10MB of cellular bandwidth every minute. For platforms serving tens of millions of concurrent streams, this represents massive server egress costs and frequent buffering on mobile networks. Codecs like FLAC or 256kbps AAC deliver indistinguishable listening fidelity at a fraction of the bandwidth.
              </p>
            </details>
          </div>
        </section>

        {/* Footer Navigation */}
        <footer className="pt-6 border-t border-outline-variant/20 flex items-center justify-between">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to All Educational Articles</span>
          </Link>
          <Link
            href={`/${locale}/blog/sample-rate-vs-bit-depth`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors"
          >
            <span>Next Guide: Sample Rate vs Bit Depth</span>
            <Sliders className="w-4 h-4 text-primary" />
          </Link>
        </footer>
      </article>
    </main>
  );
}
