import React from 'react';
import { Shield, Zap, FileAudio, CheckCircle2, FileMusic, Image as ImageIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function AudioMetadataSEO() {
  const t = useTranslations('audio_metadata_remover');
  
  return (
    <div className="w-full mt-16 max-w-4xl mx-auto flex flex-col gap-16 px-4">
      {/* Intro */}
      <section className="prose dark:prose-invert prose-slate max-w-none">
        <p className="text-lg text-on-surface-variant leading-relaxed">
          {t('intro_p1')}
        </p>
      </section>

      {/* Step-by-Step */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-on-surface">{t('step_title')}</h2>
        <p className="text-on-surface-variant mb-8 leading-relaxed">
          {t('step_desc')}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface-container-highest/50 border border-outline/50 p-6 rounded-2xl flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4 text-primary font-bold text-xl">1</div>
            <h3 className="text-lg font-bold mb-3 text-on-surface">{t('step1_title')}</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">{t('step1_desc')}</p>
          </div>
          <div className="bg-surface-container-highest/50 border border-outline/50 p-6 rounded-2xl flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4 text-primary font-bold text-xl">2</div>
            <h3 className="text-lg font-bold mb-3 text-on-surface">{t('step2_title')}</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">{t('step2_desc')}</p>
          </div>
          <div className="bg-surface-container-highest/50 border border-outline/50 p-6 rounded-2xl flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4 text-primary font-bold text-xl">3</div>
            <h3 className="text-lg font-bold mb-3 text-on-surface">{t('step3_title')}</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">{t('step3_desc')}</p>
          </div>
        </div>
      </section>

      {/* What Gets Removed */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-on-surface">{t('table_title')}</h2>
        <p className="text-on-surface-variant mb-6 leading-relaxed">
          {t('table_desc')}
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse bg-surface-container-high/50 rounded-xl overflow-hidden">
            <thead className="bg-surface-container-highest text-on-surface">
              <tr>
                <th className="py-4 px-6 font-semibold">{t('th1')}</th>
                <th className="py-4 px-6 font-semibold">{t('th2')}</th>
                <th className="py-4 px-6 font-semibold">{t('th3')}</th>
                <th className="py-4 px-6 font-semibold">{t('th4')}</th>
              </tr>
            </thead>
            <tbody className="text-on-surface-variant">
              <tr className="border-b border-outline-variant/50">
                <td className="py-4 px-6 font-bold text-on-surface">MP3</td>
                <td className="py-4 px-6">ID3v1, ID3v2, APEv2</td>
                <td className="py-4 px-6"><span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400"><CheckCircle2 className="w-3.5 h-3.5" /> {t('td_no_lossless')}</span></td>
                <td className="py-4 px-6">{t('td_instant')}</td>
              </tr>
              <tr className="border-b border-outline-variant/50">
                <td className="py-4 px-6 font-bold text-on-surface">WAV</td>
                <td className="py-4 px-6">RIFF INFO Chunks, BEXT</td>
                <td className="py-4 px-6"><span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400"><CheckCircle2 className="w-3.5 h-3.5" /> {t('td_no_lossless')}</span></td>
                <td className="py-4 px-6">{t('td_instant')}</td>
              </tr>
              <tr className="border-b border-outline-variant/50">
                <td className="py-4 px-6 font-bold text-on-surface">M4A / ALAC</td>
                <td className="py-4 px-6">MP4 Atoms, iTunes Tags</td>
                <td className="py-4 px-6"><span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400"><CheckCircle2 className="w-3.5 h-3.5" /> {t('td_no_lossless')}</span></td>
                <td className="py-4 px-6">{t('td_instant')}</td>
              </tr>
              <tr className="border-b border-outline-variant/50">
                <td className="py-4 px-6 font-bold text-on-surface">FLAC</td>
                <td className="py-4 px-6">Vorbis Comments, PICTURE</td>
                <td className="py-4 px-6"><span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400"><CheckCircle2 className="w-3.5 h-3.5" /> {t('td_no_lossless')}</span></td>
                <td className="py-4 px-6">{t('td_instant')}</td>
              </tr>
              <tr>
                <td className="py-4 px-6 font-bold text-on-surface">OGG</td>
                <td className="py-4 px-6">Vorbis Comments</td>
                <td className="py-4 px-6"><span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400"><CheckCircle2 className="w-3.5 h-3.5" /> {t('td_no_lossless')}</span></td>
                <td className="py-4 px-6">{t('td_instant')}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Top Reasons */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-on-surface">{t('reasons_title')}</h2>
        <p className="text-on-surface-variant mb-8 leading-relaxed">
          {t('reasons_desc')}
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <li className="bg-surface-container-highest/30 p-5 rounded-2xl border border-outline/30">
            <h4 className="font-bold text-on-surface mb-2 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> {t('reason1_title')}</h4>
            <p className="text-on-surface-variant text-sm leading-relaxed">{t('reason1_desc')}</p>
          </li>
          <li className="bg-surface-container-highest/30 p-5 rounded-2xl border border-outline/30">
            <h4 className="font-bold text-on-surface mb-2 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> {t('reason2_title')}</h4>
            <p className="text-on-surface-variant text-sm leading-relaxed">{t('reason2_desc')}</p>
          </li>
          <li className="bg-surface-container-highest/30 p-5 rounded-2xl border border-outline/30">
            <h4 className="font-bold text-on-surface mb-2 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> {t('reason3_title')}</h4>
            <p className="text-on-surface-variant text-sm leading-relaxed">{t('reason3_desc')}</p>
          </li>
          <li className="bg-surface-container-highest/30 p-5 rounded-2xl border border-outline/30">
            <h4 className="font-bold text-on-surface mb-2 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> {t('reason4_title')}</h4>
            <p className="text-on-surface-variant text-sm leading-relaxed">{t('reason4_desc')}</p>
          </li>
        </ul>
      </section>

      {/* FAQ */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-8 text-on-surface">{t('faq_title')}</h2>
        <div className="space-y-6">
          <div className="bg-surface-container-high/40 p-6 rounded-2xl border border-outline-variant/50">
            <h3 className="text-xl font-bold text-on-surface mb-3">{t('faq1_q')}</h3>
            <p className="text-on-surface-variant leading-relaxed">
              {t('faq1_a')}
            </p>
          </div>
          
          <div className="bg-surface-container-high/40 p-6 rounded-2xl border border-outline-variant/50">
            <h3 className="text-xl font-bold text-on-surface mb-3">{t('faq2_q')}</h3>
            <p className="text-on-surface-variant leading-relaxed">
              {t('faq2_a')}
            </p>
          </div>
          <div className="bg-surface-container-high/40 p-6 rounded-2xl border border-outline-variant/50">
            <h3 className="text-xl font-bold text-on-surface mb-3">{t('faq3_q')}</h3>
            <p className="text-on-surface-variant leading-relaxed">
              {t('faq3_a')}
            </p>
          </div>
          <div className="bg-surface-container-high/40 p-6 rounded-2xl border border-outline-variant/50">
            <h3 className="text-xl font-bold text-on-surface mb-3">{t('faq4_q')}</h3>
            <p className="text-on-surface-variant leading-relaxed">
              {t('faq4_a')}
            </p>
          </div>
          <div className="bg-surface-container-high/40 p-6 rounded-2xl border border-outline-variant/50">
            <h3 className="text-xl font-bold text-on-surface mb-3">{t('faq5_q')}</h3>
            <p className="text-on-surface-variant leading-relaxed">
              {t('faq5_a')}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
