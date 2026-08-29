import MetadataRemover from '../../components/MetadataRemover';
import AudioMetadataSEO from '../../components/AudioMetadataSEO';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const t = await getTranslations({ locale, namespace: 'audio_metadata_remover' });
  
  return {
    title: t('meta_title'),
    description: t('meta_desc'),
  };
}

export default async function AudioMetadataRemoverPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'audio_metadata_remover' });

  return (
    <main className="min-h-screen bg-surface selection:bg-primary/30 text-on-surface flex flex-col">
      <div className="flex-1 w-full max-w-[1200px] mx-auto px-4 sm:px-8 py-12 md:py-20 flex flex-col items-center">
        
        {/* Hero Section */}
        <div className="text-center mb-12 w-full max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-on-surface">
            {t.rich('h1', { highlight: (chunks) => <span className="text-orange-500">{chunks}</span> })}
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed">
            {t.rich('subtitle', { bold: (chunks) => <strong>{chunks}</strong> })}
          </p>
        </div>
        
        {/* Tool */}
        <div className="w-full mb-10 max-w-[1000px] mx-auto">
          <MetadataRemover />
        </div>

        {/* SEO Article */}
        <AudioMetadataSEO />

      </div>
    </main>
  );
}

export function generateStaticParams() {
  return ['en', 'es', 'fr', 'de', 'pt'].map((locale) => ({ locale }));
}
