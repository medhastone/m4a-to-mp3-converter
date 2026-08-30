import Mp3ToM4aConverter from '../../components/Mp3ToM4aConverter';
import Mp3ToM4aSEO from '../../components/Mp3ToM4aSEO';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const t = await getTranslations({ locale });
  
  return {
    title: t('mp3_to_m4a.meta_title'),
    description: t('mp3_to_m4a.meta_description'),
  };
}

export default async function Mp3ToM4aPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  return (
    <main className="min-h-screen bg-surface selection:bg-primary/30 text-on-surface flex flex-col">
      <div className="flex-1 w-full max-w-[1200px] mx-auto px-4 sm:px-8 py-12 md:py-20 flex flex-col items-center">
        
        {/* 1. Hero Section & Intro */}
        <div className="text-center mb-12 w-full max-w-4xl mx-auto">
                              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-on-surface">
            {t.rich('mp3_to_m4a.h1', {
              highlight: (chunks) => <span className="text-orange-500">{chunks}</span>
            })}
          </h1>
                    <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed">
            {t('mp3_to_m4a.subtitle')}
          </p>
        </div>
        
        {/* Tool */}
        <div className="w-full mb-10 max-w-[1000px] mx-auto">
          <Mp3ToM4aConverter />
        </div>

        {/* SEO Copy */}
        <Mp3ToM4aSEO />

      </div>
    </main>
  );
}


