const fs = require('fs');

const content = `import WavToMp3Converter from '../../components/WavToMp3Converter';
import WavToMp3SEO from '../../components/WavToMp3SEO';
import { setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  return {
    title: 'Free WAV to MP3 Converter Online (320kbps) – Fast, Large Files & 100% Private',
    description: 'Convert WAV to MP3 online at up to 320kbps with zero file size limits. Instant, 100% client-side batch audio conversion in your browser without uploading to servers.',
  };
}

export default async function WavToMp3Page({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen bg-surface selection:bg-primary/30 text-on-surface flex flex-col">
      <div className="flex-1 w-full mx-auto px-4 sm:px-8 py-12 md:py-20 flex flex-col items-center">
        {/* Tool */}
        <div className="w-full mb-10 mx-auto">
          <WavToMp3Converter />
        </div>
        
        {/* SEO Guide */}
        <div className="w-full mx-auto">
          <WavToMp3SEO />
        </div>
      </div>
    </main>
  );
}

export function generateStaticParams() {
  return ['en', 'es', 'fr', 'de', 'pt'].map((locale) => ({ locale }));
}
`;

fs.writeFileSync('app/[locale]/wav-to-mp3/page.tsx', content);
