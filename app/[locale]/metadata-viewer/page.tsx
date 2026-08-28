import MetadataViewer from '../../components/MetadataViewer';
import MetadataSEO from '../../components/MetadataSEO';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const t = await getTranslations({ locale });
  
  return {
    title: t('mv_meta_title'),
    description: t('mv_meta_desc'),
  };
}

export default async function MetadataViewerPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  return (
    <main className="min-h-screen bg-surface selection:bg-primary/30 text-on-surface flex flex-col">
      <div className="flex-1 w-full max-w-[1200px] mx-auto px-4 sm:px-8 py-12 md:py-20 flex flex-col items-center">
        
        {/* 1. Hero Section & H1 */}
        <div className="text-center mb-12 w-full max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-on-surface via-on-surface to-on-surface-variant">
            {t('mv_h1')}
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed" >
            {t.rich('mv_hero_desc', { strong: (chunks) => <strong>{chunks}</strong> })}
          </p>
        </div>
        
        {/* The Actual Tool */}
        <div className="w-full mb-10 max-w-[1000px] mx-auto">
          <MetadataViewer />
        </div>

        {/* SEO & Feature Showcase */}
        <MetadataSEO />

      </div>
    </main>
  );
}
