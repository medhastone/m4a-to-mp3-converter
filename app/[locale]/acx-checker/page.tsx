import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing } from '../../../src/i18n/routing';
import type { Metadata } from 'next';
import AcxChecker from '../../components/AcxChecker';
import AcxCheckerArticle from '../../components/AcxCheckerArticle';

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  setRequestLocale(locale);
  const t = await getTranslations({locale, namespace: 'acx_checker'});

  return {
    title: t('meta_title'),
    description: t('meta_desc'),
  };
}

export default async function AcxCheckerPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  setRequestLocale(locale);
  
  const t = await getTranslations({locale, namespace: 'acx_checker'});

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <main className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 xl:px-12 pt-12 lg:pt-20 pb-24">
        <div className="text-center mb-12 w-full max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-white">
            {t.rich('h1', { highlight: (chunks) => <span className="text-orange-500">{chunks}</span> })}
          </h1>
          <p className="text-lg md:text-xl text-slate-400 leading-relaxed">
            {t('subtitle')}
          </p>
        </div>
        
        <AcxChecker />
        <AcxCheckerArticle />
        
      </main>
    </div>
  );
}
