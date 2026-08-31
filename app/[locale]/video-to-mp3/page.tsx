import VideoToMp3Converter from '../../components/VideoToMp3Converter';
import VideoToMp3SEO from '../../components/VideoToMp3SEO';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'video_page' });
  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function VideoToMp3Page({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen bg-surface selection:bg-primary/30 text-on-surface flex flex-col">
      <div className="flex-1 w-full mx-auto px-4 sm:px-8 py-12 md:py-20 flex flex-col items-center">
        {/* Tool */}
        <div className="w-full mb-10 mx-auto">
          <VideoToMp3Converter />
        </div>
        
        {/* SEO Article */}
        <VideoToMp3SEO />
      </div>
    </main>
  );
}
