import type { Metadata } from 'next';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import { 
  ArrowLeft, 
  Clock, 
  BookOpen, 
  CheckCircle2, 
  HelpCircle, 
  Sliders, 
  Activity, 
  Layers, 
  ShieldCheck, 
  ChevronDown,
  Volume2,
  Cpu,
  Waves
} from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = resolvedParams.locale || 'en';

  const title = 'Audio Sample Rate vs Bit Depth: The Complete Guide (2026)';
  const description =
    'Understand sample rates (44.1kHz vs 48kHz) and bit depth (16-bit vs 24-bit vs 32-bit float). Learn how digital audio quantization, dynamic range, and Nyquist frequency work.';
  const canonicalUrl = `https://m4atomp3converter.com/${locale}/blog/sample-rate-vs-bit-depth`;

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

export default async function SampleRateVsBitDepthPage({
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
    headline: 'Audio Sample Rate vs Bit Depth: The Complete Guide (2026)',
    description:
      'A technical guide explaining digital audio resolution: sample rates, Nyquist frequency, quantization noise, dynamic range, and 32-bit float internal DAW processing.',
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
    datePublished: '2026-09-12',
    dateModified: '2026-09-14',
    mainEntityOfPage: `https://m4atomp3converter.com/${locale}/blog/sample-rate-vs-bit-depth`,
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the difference between sample rate and bit depth?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sample rate determines the frequency range (the horizontal time axis) that can be captured in digital audio, measured in Hertz (Hz). Bit depth determines the amplitude resolution and dynamic range (the vertical volume axis) of each sample, measured in bits.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should I record music in 44.1 kHz or 48 kHz?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For modern music production and video sync, 48 kHz is the modern industry standard across DAWs, streaming platforms, and broadcast video. 44.1 kHz is the historical Red Book Audio CD standard.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why should I track audio in 24-bit instead of 16-bit?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '24-bit audio provides 144 dB of theoretical dynamic range compared to 96 dB for 16-bit audio. This 48 dB of extra headroom lowers the noise floor well below ambient room noise and virtually eliminates quantization error.',
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
              Technical Acoustics
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              9 min read
            </span>
            <span>•</span>
            <span className="font-mono">Updated September 2026</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-on-surface mb-6 leading-tight">
            Audio Sample Rate vs. Bit Depth: The Complete Guide
          </h1>
          <p className="text-lg sm:text-xl text-on-surface-variant leading-relaxed font-normal">
            Whether you are configuring your DAW session, setting up an audio interface, or preparing stems for mastering, choosing the correct sample rate and bit depth determines digital clarity, dynamic range, and processor efficiency.
          </p>
        </header>

        {/* Quick Answer Summary Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-surface-container-low border border-outline-variant/30 mb-12 shadow-sm">
          <h2 className="text-base font-bold uppercase tracking-wider text-primary mb-3 flex items-center gap-2">
            <Activity className="w-4 h-4" /> Quick Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-on-surface leading-relaxed">
            <div className="p-4 rounded-2xl bg-surface-container border border-outline-variant/20">
              <h3 className="font-bold text-base mb-1 text-on-surface flex items-center gap-1.5">
                <Waves className="w-4 h-4 text-primary" /> Sample Rate (Frequency)
              </h3>
              <p className="text-on-surface-variant">
                The number of audio snapshots captured per second (measured in kHz). Governed by the <strong>Nyquist-Shannon theorem</strong>: your sample rate must be at least double the highest audible frequency. 48 kHz reproduces frequencies up to 24 kHz.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-surface-container border border-outline-variant/20">
              <h3 className="font-bold text-base mb-1 text-on-surface flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-emerald-500" /> Bit Depth (Dynamic Range)
              </h3>
              <p className="text-on-surface-variant">
                The numerical precision of each audio snapshot. Each additional bit provides <strong>6 dB of dynamic range</strong>. 16-bit offers 96 dB, whereas 24-bit provides 144 dB of dynamic range, virtually eliminating noise floor issues.
              </p>
            </div>
          </div>
        </div>

        {/* Section 1: Sample Rate In-Depth */}
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface mb-4">
            1. Understanding Audio Sample Rate
          </h2>
          <p className="text-on-surface-variant leading-relaxed mb-4">
            Sound in the physical world is continuous analog air pressure variations. To convert this into digital 0s and 1s, an Analog-to-Digital Converter (ADC) samples the incoming voltage thousands of times per second.
          </p>
          <div className="my-6 p-6 rounded-2xl bg-surface-container-low border border-outline-variant/20">
            <h3 className="text-lg font-bold text-on-surface mb-2">The Nyquist-Shannon Sampling Theorem</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Harry Nyquist and Claude Shannon mathematically proved that to reconstruct any waveform accurately without aliasing distortion, the sampling rate must be strictly greater than twice the highest frequency component present in the signal:
            </p>
            <div className="my-3 p-3 rounded-xl bg-surface-container font-mono text-xs text-primary font-bold">
              Maximum Reproducible Frequency (Nyquist Limit) = Sample Rate / 2
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Since human hearing spans from 20 Hz to 20,000 Hz (20 kHz), a sample rate of at least 40 kHz is mathematically required. <strong>44.1 kHz</strong> and <strong>48 kHz</strong> provide a sufficient safety band for anti-aliasing reconstruction filters.
            </p>
          </div>

          <div className="overflow-x-auto my-6 border border-outline-variant/20 rounded-2xl">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface-container text-on-surface text-xs uppercase font-bold border-b border-outline-variant/20">
                <tr>
                  <th scope="col" className="p-4">Sample Rate</th>
                  <th scope="col" className="p-4">Nyquist Limit</th>
                  <th scope="col" className="p-4">Primary Application</th>
                  <th scope="col" className="p-4">CPU &amp; File Overhead</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10 text-on-surface-variant">
                <tr>
                  <td className="p-4 font-semibold text-on-surface">44.1 kHz</td>
                  <td className="p-4">22.05 kHz</td>
                  <td className="p-4">Audio CD (Red Book standard), legacy streaming</td>
                  <td className="p-4">Baseline (1.0x)</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-on-surface">48.0 kHz</td>
                  <td className="p-4">24.00 kHz</td>
                  <td className="p-4">Video soundtracks, modern DAW projects, YouTube, Netflix</td>
                  <td className="p-4">+8.8% storage/CPU</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-on-surface">96.0 kHz</td>
                  <td className="p-4">48.00 kHz</td>
                  <td className="p-4">High-resolution master recording, sound effects pitch-shifting</td>
                  <td className="p-4">2.0x storage/CPU</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-on-surface">192.0 kHz</td>
                  <td className="p-4">96.00 kHz</td>
                  <td className="p-4">Scientific acoustic analysis, ultrasonic bioacoustics</td>
                  <td className="p-4">4.0x storage/CPU</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 2: Bit Depth In-Depth */}
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface mb-4">
            2. Understanding Audio Bit Depth
          </h2>
          <p className="text-on-surface-variant leading-relaxed mb-4">
            While sample rate divides the horizontal time axis into precise slices, <strong>bit depth</strong> divides the vertical amplitude axis. It defines how many discrete values (steps) are available to represent the volume of each audio snapshot.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
            <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/20">
              <h3 className="font-bold text-base text-on-surface mb-1">16-Bit Fixed Point</h3>
              <p className="text-xs text-primary font-mono mb-2">65,536 Amplitude Levels</p>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Provides <strong>96 dB</strong> of dynamic range. Standard for CD audio. Fine for finished, mastered music where levels are already controlled and normalized.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/20">
              <h3 className="font-bold text-base text-on-surface mb-1">24-Bit Fixed Point</h3>
              <p className="text-xs text-primary font-mono mb-2">16,777,216 Levels</p>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Provides <strong>144 dB</strong> of dynamic range. The standard for multitrack recording and studio tracking. Allows recording with safe -18 dBFS headroom without noise.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/20">
              <h3 className="font-bold text-base text-on-surface mb-1">32-Bit Floating Point</h3>
              <p className="text-xs text-emerald-500 font-mono mb-2">Over 1,500 dB Headroom</p>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Uses a mantissa and an exponent. Internal mixing audio engine standard for modern DAWs. Cannot digitally clip internally even if summing buses exceed 0 dBFS.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-surface-container border border-outline-variant/20">
            <h3 className="font-bold text-on-surface text-base mb-2">The 6 dB Rule of Bit Depth</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Every single bit in binary digital audio doubles the number of voltage levels, corresponding to exactly <strong>6.02 dB</strong> of dynamic range:
            </p>
            <div className="my-3 p-3 rounded-xl bg-surface-container-high font-mono text-xs text-primary font-bold">
              Theoretical Dynamic Range = Bit Depth × 6.02 dB
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              In 24-bit audio, the noise floor is pushed down to -144 dBFS—vastly quieter than the thermal noise floor of analog microphone preamps (which usually sits around -115 dB to -125 dB).
            </p>
          </div>
        </section>

        {/* Section 3: Recommended Studio Best Practices */}
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface mb-6">
            3. Recommended Settings for Every Production Stage
          </h2>

          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-on-surface text-base">Tracking Vocals &amp; Instruments</h3>
                <p className="text-xs text-on-surface-variant">Capturing acoustic sources with microphones or direct electric inputs.</p>
              </div>
              <span className="shrink-0 px-3 py-1.5 rounded-xl bg-primary/10 text-primary font-bold text-xs border border-primary/20">
                24-bit / 48 kHz (or 44.1 kHz)
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-on-surface text-base">In-The-Box DAW Mixing</h3>
                <p className="text-xs text-on-surface-variant">Summing dozens of tracks, reverbs, delays, and saturation plugins.</p>
              </div>
              <span className="shrink-0 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs border border-emerald-500/20">
                32-bit Float / 48 kHz
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-on-surface text-base">Mastering Delivery for Streaming</h3>
                <p className="text-xs text-on-surface-variant">Submitting final stereo files to DistroKid, TuneCore, or labels.</p>
              </div>
              <span className="shrink-0 px-3 py-1.5 rounded-xl bg-primary/10 text-primary font-bold text-xs border border-primary/20">
                24-bit / 48 kHz WAV
              </span>
            </div>
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
                <span>Can human ears hear the difference between 48 kHz and 96 kHz?</span>
                <ChevronDown className="w-4 h-4 text-primary transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm text-on-surface-variant leading-relaxed">
                In blind ABX listening tests, even trained audio engineers generally cannot distinguish between clean 48 kHz and 96 kHz playback. However, 96 kHz is valuable during audio production for extreme time-stretching (preventing sample starvation) and reducing plugin aliasing when using heavy non-linear harmonic saturation.
              </p>
            </details>

            <details className="group bg-surface-container-low border border-outline-variant/20 rounded-2xl p-5 transition-all">
              <summary className="flex items-center justify-between cursor-pointer list-none font-bold text-on-surface text-base">
                <span>What is audio dithering and when should I apply it?</span>
                <ChevronDown className="w-4 h-4 text-primary transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm text-on-surface-variant leading-relaxed">
                Dither is an intentional low-level randomized noise (analogous to visual film grain) added when converting a higher bit depth file (e.g. 24-bit or 32-bit float) down to 16-bit. Dither prevents harsh truncation distortion in quiet reverb tails and fading decays. Only apply dither once at the very final export stage.
              </p>
            </details>

            <details className="group bg-surface-container-low border border-outline-variant/20 rounded-2xl p-5 transition-all">
              <summary className="flex items-center justify-between cursor-pointer list-none font-bold text-on-surface text-base">
                <span>Does higher sample rate increase latency?</span>
                <ChevronDown className="w-4 h-4 text-primary transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm text-on-surface-variant leading-relaxed">
                Actually, the opposite! At the same buffer size (e.g. 128 samples), 96 kHz processes buffers twice as fast as 48 kHz, resulting in half the roundtrip latency in milliseconds. However, it requires twice as much CPU processing power per second.
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
            href={`/${locale}/blog/what-is-a-daw`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors"
          >
            <span>Next Guide: What is a DAW?</span>
            <Sliders className="w-4 h-4 text-primary" />
          </Link>
        </footer>
      </article>
    </main>
  );
}
