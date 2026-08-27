import type {Metadata} from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '../../src/i18n/routing';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});
const jbMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jb-mono',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  setRequestLocale(locale);
  const t = await getTranslations({locale, });
  const domain = 'https://m4atomp3converter.com';
  
  return {
    metadataBase: new URL(domain),
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      siteName: 'M4A to MP3 Converter.com',
      locale: locale,
      alternateLocale: routing.locales.filter(l => l !== locale),
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
    icons: {
      icon: '/icon.svg',
    },
    alternates: {
      canonical: `${domain}/${locale}`,
      languages: {
        'en': `${domain}/en`,
        'es': `${domain}/es`,
        'fr': `${domain}/fr`,
        'de': `${domain}/de`,
        'pt': `${domain}/pt`,
        'x-default': `${domain}/en`,
      },
    },
  };
}

export default async function RootLayout({children, params}: {children: React.ReactNode, params: Promise<{ locale: string }>}) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  setRequestLocale(locale);
  
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${jbMono.variable}`}>
      <head>
        
        
      </head>
      <body className="bg-surface text-on-surface antialiased min-h-screen flex flex-col selection:bg-primary-container/30 selection:text-primary" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <Header />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
