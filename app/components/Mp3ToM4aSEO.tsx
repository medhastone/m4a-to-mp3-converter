import { useTranslations } from 'next-intl';
import { HelpCircle, Shield, Zap, FileAudio, Layers, CheckCircle2 } from 'lucide-react';

export default function Mp3ToM4aSEO() {
  const t = useTranslations('mp3_to_m4a');
  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-16 mt-16 pb-20">
      
      {/* 2. Step-by-Step Guide */}
      <section className="bg-surface-container-low p-8 md:p-12 rounded-3xl border border-outline-variant/10 shadow-lg">
        <h2 className="text-2xl md:text-3xl font-extrabold text-on-surface mb-8 tracking-tight">
          {t('step_title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-4 relative">
            <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xl mb-2">1</div>
            <h3 className="font-bold text-on-surface text-lg">{t('step1_title')}</h3>
            <p className="text-on-surface-variant leading-relaxed">
              {t('step1_desc')}
            </p>
          </div>
          <div className="flex flex-col gap-4 relative">
            <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xl mb-2">2</div>
            <h3 className="font-bold text-on-surface text-lg">{t('step2_title')}</h3>
            <p className="text-on-surface-variant leading-relaxed">
              {t('step2_desc')}
            </p>
          </div>
          <div className="flex flex-col gap-4 relative">
            <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xl mb-2">3</div>
            <h3 className="font-bold text-on-surface text-lg">{t('step3_title')}</h3>
            <p className="text-on-surface-variant leading-relaxed">
              {t('step3_desc')}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Why Convert MP3 to AAC/M4A? */}
      <section className="prose dark:prose-invert prose-lg max-w-none">
        <h2 className="text-2xl md:text-3xl font-extrabold text-on-surface tracking-tight mb-6">{t('why_title')}</h2>
        <p className="text-on-surface-variant">{t('why_p1')}</p>
        <p className="text-on-surface-variant">
          {t.rich('why_p2', { bold: (chunks) => <strong>{chunks}</strong> })}
        </p>
      </section>

      {/* 4. Detailed Bitrate & Quality Guide */}
      <section className="bg-surface-container p-1 rounded-3xl border border-outline-variant/10 overflow-hidden">
        <div className="bg-surface-container-low p-8 md:p-10 rounded-[22px]">
          <h2 className="text-2xl font-extrabold text-on-surface mb-6 tracking-tight">{t('bitrate_title')}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-outline-variant/30 text-on-surface-variant">
                  <th className="py-4 px-4 font-semibold">{t('bitrate_th1')}</th>
                  <th className="py-4 px-4 font-semibold">{t('bitrate_th2')}</th>
                  <th className="py-4 px-4 font-semibold">{t('bitrate_th3')}</th>
                  <th className="py-4 px-4 font-semibold">{t('bitrate_th4')}</th>
                </tr>
              </thead>
              <tbody className="text-on-surface">
                <tr className="border-b border-outline-variant/10 hover:bg-on-surface/5 transition-colors">
                  <td className="py-4 px-4 font-bold text-on-surface">128 kbps</td>
                  <td className="py-4 px-4 text-on-surface-variant">AAC-LC</td>
                  <td className="py-4 px-4">{t('bitrate_128_use')}</td>
                  <td className="py-4 px-4 text-on-surface-variant">{t('bitrate_128_desc')}</td>
                </tr>
                <tr className="border-b border-outline-variant/10 hover:bg-on-surface/5 transition-colors">
                  <td className="py-4 px-4 font-bold text-on-surface">192 kbps</td>
                  <td className="py-4 px-4 text-on-surface-variant">AAC-LC</td>
                  <td className="py-4 px-4">{t('bitrate_192_use')}</td>
                  <td className="py-4 px-4 text-on-surface-variant">{t('bitrate_192_desc')}</td>
                </tr>
                <tr className="border-b border-outline-variant/10 bg-primary/5 hover:bg-primary/10 transition-colors">
                  <td className="py-4 px-4 font-bold text-primary">256 kbps</td>
                  <td className="py-4 px-4 text-on-surface-variant">AAC-LC</td>
                  <td className="py-4 px-4 font-semibold text-on-surface">{t('bitrate_256_use')}</td>
                  <td className="py-4 px-4 text-on-surface-variant">{t('bitrate_256_desc')}</td>
                </tr>
                <tr className="hover:bg-on-surface/5 transition-colors">
                  <td className="py-4 px-4 font-bold text-on-surface">320 kbps</td>
                  <td className="py-4 px-4 text-on-surface-variant">AAC-LC</td>
                  <td className="py-4 px-4">{t('bitrate_320_use')}</td>
                  <td className="py-4 px-4 text-on-surface-variant">{t('bitrate_320_desc')}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. Key Features */}
      <section className="flex flex-col gap-8">
        <h2 className="text-2xl md:text-3xl font-extrabold text-on-surface tracking-tight">
          Key Features of Our Client-Side Audio Engine
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/10 hover:border-primary/30 transition-colors">
            <Shield className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-bold text-on-surface text-lg mb-2">{t('feat1_title')}</h3>
            <p className="text-on-surface-variant">
              {t.rich('feat1_desc', { bold: (chunks) => <strong>{chunks}</strong> })}
            </p>
          </div>
          <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/10 hover:border-primary/30 transition-colors">
            <Layers className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-bold text-on-surface text-lg mb-2">{t('feat2_title')}</h3>
            <p className="text-on-surface-variant">
              {t.rich('feat2_desc', { bold: (chunks) => <strong>{chunks}</strong> })}
            </p>
          </div>
          <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/10 hover:border-primary/30 transition-colors">
            <FileAudio className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-bold text-on-surface text-lg mb-2">{t('feat3_title')}</h3>
            <p className="text-on-surface-variant">
              {t('feat3_desc')}
            </p>
          </div>
          <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/10 hover:border-primary/30 transition-colors">
            <Zap className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-bold text-on-surface text-lg mb-2">{t('feat4_title')}</h3>
            <p className="text-on-surface-variant">
              {t.rich('feat4_desc', { bold: (chunks) => <strong>{chunks}</strong> })}
            </p>
          </div>
        </div>
      </section>

      {/* 6. Frequently Asked Questions */}
      <section className="flex flex-col gap-8 mb-12">
        <h2 className="text-2xl md:text-3xl font-extrabold text-on-surface tracking-tight flex items-center gap-3">
          <HelpCircle className="w-8 h-8 text-primary" />
          Frequently Asked Questions
        </h2>
        
        <div className="flex flex-col gap-4">
          <div className="bg-surface-container-low p-6 md:p-8 rounded-2xl border border-outline-variant/10">
            <h3 className="font-bold text-on-surface text-xl mb-3">
              How to convert MP3 to M4A without losing sound quality?
            </h3>
            <p className="text-on-surface-variant leading-relaxed">
              {t.rich('faq1_a', { bold: (chunks) => <strong>{chunks}</strong> })}
            </p>
          </div>

          <div className="bg-surface-container-low p-6 md:p-8 rounded-2xl border border-outline-variant/10">
            <h3 className="font-bold text-on-surface text-xl mb-3">
              Is there a file size limit when converting large audio files?
            </h3>
            <p className="text-on-surface-variant leading-relaxed">
              {t.rich('faq2_a', { bold: (chunks) => <strong>{chunks}</strong> })}
            </p>
          </div>

          <div className="bg-surface-container-low p-6 md:p-8 rounded-2xl border border-outline-variant/10">
            <h3 className="font-bold text-on-surface text-xl mb-3">
              Can I convert MP3 to M4A directly on iPhone without downloading an app?
            </h3>
            <p className="text-on-surface-variant leading-relaxed">
              {t.rich('faq3_a', { bold: (chunks) => <strong>{chunks}</strong> })}
            </p>
          </div>

          <div className="bg-surface-container-low p-6 md:p-8 rounded-2xl border border-outline-variant/10">
            <h3 className="font-bold text-on-surface text-xl mb-3">
              Why is 256kbps AAC considered better than 320kbps MP3?
            </h3>
            <p className="text-on-surface-variant leading-relaxed">
              {t('faq4_a')}
            </p>
          </div>

          <div className="bg-surface-container-low p-6 md:p-8 rounded-2xl border border-outline-variant/10">
            <h3 className="font-bold text-on-surface text-xl mb-3">
              Are my audio files uploaded to your server during conversion?
            </h3>
            <p className="text-on-surface-variant leading-relaxed">
              {t.rich('faq5_a', { bold: (chunks) => <strong>{chunks}</strong> })}
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
