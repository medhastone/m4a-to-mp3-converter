import React from 'react';
import { useTranslations } from 'next-intl';
import { Shield, Zap, FileAudio, CheckCircle2, Music, Layers, HelpCircle } from 'lucide-react';

export default function WavToMp3SEO() {
  const t = useTranslations('wav_to_mp3_seo');
  return (
    <article className="w-full max-w-4xl mx-auto flex flex-col gap-12 mt-16 pb-20 px-4 md:px-0 text-slate-300">
      
      {/* 1. Hero Section & Engineering Overview */}
      <section className="bg-surface-container-low p-8 md:p-12 rounded-3xl border border-white/5 shadow-lg space-y-6">
        <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">{t('seo_text_1')}</h1>
        <p className="text-on-surface-variant leading-relaxed">{t('seo_text_2')}</p>
        <p className="text-on-surface-variant leading-relaxed">{t('seo_text_3')}</p>
      </section>

      {/* 2. Step-by-Step Guide */}
      <section className="bg-surface-container-low p-8 md:p-12 rounded-3xl border border-white/5 shadow-lg">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-8 tracking-tight">{t('seo_text_4')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xl mb-2">1</div>
            <h3 className="font-bold text-white text-lg">{t('seo_text_5')}</h3>
            <p className="text-on-surface-variant leading-relaxed text-sm">{t('seo_text_6')}</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xl mb-2">2</div>
            <h3 className="font-bold text-white text-lg">{t('seo_text_7')}</h3>
            <p className="text-on-surface-variant leading-relaxed text-sm">{t('seo_text_8')}</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xl mb-2">3</div>
            <h3 className="font-bold text-white text-lg">{t('seo_text_9')}</h3>
            <p className="text-on-surface-variant leading-relaxed text-sm">{t('seo_text_10')}</p>
          </div>
        </div>
      </section>

      {/* 3. Technical Deep Dive */}
      <section className="bg-surface-container-low p-8 md:p-12 rounded-3xl border border-white/5 shadow-lg space-y-6">
        <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-2">{t('seo_text_11')}</h2>
        <p className="text-on-surface-variant leading-relaxed">{t('seo_text_12')}</p>
        <p className="text-on-surface-variant leading-relaxed">{t('seo_text_13')}<strong>{t('seo_text_14')}</strong>{t('seo_text_15')}</p>
        <p className="text-on-surface-variant leading-relaxed">{t('seo_text_16')}<strong>{t('seo_text_17')}</strong>{t('seo_text_18')}</p>
      </section>

      {/* 4. Matrix Table */}
      <section className="bg-surface-container-low p-8 md:p-12 rounded-3xl border border-white/5 shadow-lg">
        <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-6">{t('seo_text_19')}</h2>
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-white/10 text-on-surface-variant">
                <th className="p-4 font-semibold">{t('seo_text_20')}</th>
                <th className="p-4 font-semibold">{t('seo_text_21')}</th>
                <th className="p-4 font-semibold">{t('seo_text_22')}</th>
                <th className="p-4 font-semibold">{t('seo_text_23')}</th>
                <th className="p-4 font-semibold">{t('seo_text_24')}</th>
              </tr>
            </thead>
            <tbody className="bg-surface-container/30 text-sm text-on-surface">
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-4 font-bold text-white">{t('seo_text_25')}</td>
                <td className="p-4 text-on-surface-variant">{t('seo_text_26')}</td>
                <td className="p-4">{t('seo_text_27')}</td>
                <td className="p-4">~ 1:6</td>
                <td className="p-4 text-on-surface-variant">{t('seo_text_28')}</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-4 font-bold text-white">{t('seo_text_29')}</td>
                <td className="p-4 text-on-surface-variant">{t('seo_text_30')}</td>
                <td className="p-4">{t('seo_text_31')}</td>
                <td className="p-4">~ 1:7</td>
                <td className="p-4 text-on-surface-variant">{t('seo_text_32')}</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-4 font-bold text-white">{t('seo_text_33')}</td>
                <td className="p-4 text-on-surface-variant">{t('seo_text_34')}</td>
                <td className="p-4">{t('seo_text_35')}</td>
                <td className="p-4">~ 1:8</td>
                <td className="p-4 text-on-surface-variant">{t('seo_text_36')}</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-4 font-bold text-white">{t('seo_text_37')}</td>
                <td className="p-4 text-on-surface-variant">{t('seo_text_38')}</td>
                <td className="p-4">{t('seo_text_39')}</td>
                <td className="p-4">~ 1:11</td>
                <td className="p-4 text-on-surface-variant">{t('seo_text_40')}</td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="p-4 font-bold text-white">{t('seo_text_41')}</td>
                <td className="p-4 text-on-surface-variant">{t('seo_text_42')}</td>
                <td className="p-4">{t('seo_text_43')}</td>
                <td className="p-4">~ 1:16</td>
                <td className="p-4 text-on-surface-variant">{t('seo_text_44')}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Client vs Cloud */}
      <section className="bg-surface-container-low p-8 md:p-12 rounded-3xl border border-white/5 shadow-lg">
        <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-4">{t('seo_text_45')}</h2>
        <p className="text-on-surface-variant leading-relaxed">{t('seo_text_46')}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-surface-container p-6 rounded-2xl border border-emerald-500/20 hover:border-emerald-500/40 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-emerald-400" />
              <h3 className="text-lg font-bold text-white">{t('seo_text_47')}</h3>
            </div>
            <ul className="space-y-4 text-sm text-on-surface-variant">
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> <strong>{t('seo_text_48')}</strong>{t('seo_text_49')}</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> <strong>{t('seo_text_50')}</strong>{t('seo_text_51')}</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> <strong>{t('seo_text_52')}</strong>{t('seo_text_53')}</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> <strong>{t('seo_text_54')}</strong>{t('seo_text_55')}</li>
            </ul>
          </div>
          
          <div className="bg-surface-container p-6 rounded-2xl border border-red-500/20 hover:border-red-500/40 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-6 h-6 text-red-400" />
              <h3 className="text-lg font-bold text-white">{t('seo_text_56')}</h3>
            </div>
            <ul className="space-y-4 text-sm text-on-surface-variant">
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-red-500 shrink-0" /> <strong>{t('seo_text_57')}</strong>{t('seo_text_58')}</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-red-500 shrink-0" /> <strong>{t('seo_text_59')}</strong>{t('seo_text_60')}</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-red-500 shrink-0" /> <strong>{t('seo_text_61')}</strong>{t('seo_text_62')}</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-red-500 shrink-0" /> <strong>{t('seo_text_63')}</strong>{t('seo_text_64')}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 6. Use Cases */}
      <section className="bg-surface-container-low p-8 md:p-12 rounded-3xl border border-white/5 shadow-lg">
        <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-8">{t('seo_text_65')}</h2>
        <div className="space-y-6">
          <div className="flex gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
            <Music className="w-8 h-8 text-primary shrink-0" />
            <div>
              <h4 className="text-lg font-bold text-white mb-2">{t('seo_text_66')}</h4>
              <p className="text-on-surface-variant text-sm leading-relaxed">{t('seo_text_67')}</p>
            </div>
          </div>
          <div className="flex gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
            <FileAudio className="w-8 h-8 text-primary shrink-0" />
            <div>
              <h4 className="text-lg font-bold text-white mb-2">{t('seo_text_68')}</h4>
              <p className="text-on-surface-variant text-sm leading-relaxed">{t('seo_text_69')}</p>
            </div>
          </div>
          <div className="flex gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
            <Layers className="w-8 h-8 text-primary shrink-0" />
            <div>
              <h4 className="text-lg font-bold text-white mb-2">{t('seo_text_70')}</h4>
              <p className="text-on-surface-variant text-sm leading-relaxed">{t('seo_text_71')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQs */}
      <section className="flex flex-col gap-8">
        <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
          <HelpCircle className="w-8 h-8 text-primary" />{t('seo_text_72')}</h2>
        
        <div className="flex flex-col gap-4">
          <div className="bg-surface-container-low p-6 md:p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
            <h3 className="font-bold text-white text-xl mb-3">{t('seo_text_73')}</h3>
            <p className="text-on-surface-variant leading-relaxed">{t('seo_text_74')}</p>
          </div>

          <div className="bg-surface-container-low p-6 md:p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
            <h3 className="font-bold text-white text-xl mb-3">{t('seo_text_75')}</h3>
            <p className="text-on-surface-variant leading-relaxed">{t('seo_text_76')}</p>
          </div>

          <div className="bg-surface-container-low p-6 md:p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
            <h3 className="font-bold text-white text-xl mb-3">{t('seo_text_77')}</h3>
            <p className="text-on-surface-variant leading-relaxed">{t('seo_text_78')}</p>
          </div>

          <div className="bg-surface-container-low p-6 md:p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
            <h3 className="font-bold text-white text-xl mb-3">{t('seo_text_79')}</h3>
            <p className="text-on-surface-variant leading-relaxed">{t('seo_text_80')}</p>
          </div>

          <div className="bg-surface-container-low p-6 md:p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
            <h3 className="font-bold text-white text-xl mb-3">{t('seo_text_81')}</h3>
            <p className="text-on-surface-variant leading-relaxed">{t('seo_text_82')}</p>
          </div>
        </div>
      </section>

    </article>
  );
}
