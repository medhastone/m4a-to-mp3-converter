import WavToMp3Converter from '../../components/WavToMp3Converter';
import WavToMp3SEO from '../../components/WavToMp3SEO';
import { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const t = await getTranslations({ locale, namespace: 'wav_to_mp3_page' });
  const canonicalUrl = `https://m4atomp3converter.com/${locale === 'en' ? 'en' : locale}/wav-to-mp3`;

  return {
    title: t('meta_title'),
    description: t('meta_desc'),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: t('og_title'),
      description: t('og_desc'),
      url: canonicalUrl,
      siteName: 'm4atomp3converter.com',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('og_title'),
      description: t('og_desc'),
    },
  };
}

export default async function WavToMp3Page({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'wav_to_mp3_page' });

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": t('jsonLd_software_name'),
        "applicationCategory": "MultimediaApplication",
        "operatingSystem": "All (Web Browser)",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "description": t('jsonLd_software_desc')
      },
      {
        "@type": "HowTo",
        "name": t('jsonLd_howto_name'),
        "description": t('jsonLd_howto_desc'),
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": t('jsonLd_step1_name'),
            "text": t('jsonLd_step1_text')
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": t('jsonLd_step2_name'),
            "text": t('jsonLd_step2_text')
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": t('jsonLd_step3_name'),
            "text": t('jsonLd_step3_text')
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": t('jsonLd_faq1_q'),
            "acceptedAnswer": {
              "@type": "Answer",
              "text": t('jsonLd_faq1_a')
            }
          },
          {
            "@type": "Question",
            "name": t('jsonLd_faq2_q'),
            "acceptedAnswer": {
              "@type": "Answer",
              "text": t('jsonLd_faq2_a')
            }
          },
          {
            "@type": "Question",
            "name": t('jsonLd_faq3_q'),
            "acceptedAnswer": {
              "@type": "Answer",
              "text": t('jsonLd_faq3_a')
            }
          },
          {
            "@type": "Question",
            "name": t('jsonLd_faq4_q'),
            "acceptedAnswer": {
              "@type": "Answer",
              "text": t('jsonLd_faq4_a')
            }
          },
          {
            "@type": "Question",
            "name": t('jsonLd_faq5_q'),
            "acceptedAnswer": {
              "@type": "Answer",
              "text": t('jsonLd_faq5_a')
            }
          },
          {
            "@type": "Question",
            "name": t('jsonLd_faq6_q'),
            "acceptedAnswer": {
              "@type": "Answer",
              "text": t('jsonLd_faq6_a')
            }
          }
        ]
      }
    ]
  };

  return (
    <main className="min-h-screen bg-surface selection:bg-primary/30 text-on-surface flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="flex-1 w-full mx-auto px-4 sm:px-8 py-8 md:py-16 flex flex-col items-center">
        {/* Tool */}
        <div className="w-full mb-8 mx-auto">
          <WavToMp3Converter />
        </div>
        
        {/* SEO Article */}
        <WavToMp3SEO />
      </div>
    </main>
  );
}
