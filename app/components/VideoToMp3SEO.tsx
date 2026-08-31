import React from 'react';
import { useTranslations } from 'next-intl';
import { Shield, Zap, FileAudio, CheckCircle2, Music, Layers, HelpCircle, HardDrive, Lock, MonitorSmartphone, Settings, Cpu } from 'lucide-react';

export default function VideoToMp3SEO() {
  const t = useTranslations('video_seo');
  return (
    <article className="w-full max-w-4xl mx-auto flex flex-col gap-12 mt-16 pb-20 px-4 md:px-0 text-slate-300 leading-relaxed">
      
      {/* 1. Hero Section & Technical Overview */}
      <section className="bg-surface-container-low p-8 md:p-12 rounded-3xl border border-white/5 shadow-lg space-y-6">
        <div className="flex items-center gap-3 text-primary font-semibold tracking-wider uppercase text-sm mb-2">
          <Zap size={18} /> {t('seo_badge')}
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
          {t('seo_h1')}
        </h1>
        <div className="space-y-4 text-base md:text-lg text-on-surface-variant leading-relaxed">
          <p>{t('seo_p1')}</p>
          <p>{t('seo_p2')}</p>
          <p>{t('seo_p3')}</p>
        </div>
      </section>

      {/* 2. Step-by-Step Guide */}
      <section className="bg-surface-container-low p-8 md:p-12 rounded-3xl border border-white/5 shadow-lg">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-8 tracking-tight flex items-center gap-3">
          <Cpu className="text-primary" size={24} /> {t('seo_h2_1')}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xl mb-2">1</div>
            <h3 className="font-bold text-white text-lg">{t('seo_step1_title')}</h3>
            <p className="text-on-surface-variant leading-relaxed text-sm">{t('seo_step1_desc')}</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xl mb-2">2</div>
            <h3 className="font-bold text-white text-lg">{t('seo_step2_title')}</h3>
            <p className="text-on-surface-variant leading-relaxed text-sm">{t('seo_step2_desc')}</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xl mb-2">3</div>
            <h3 className="font-bold text-white text-lg">{t('seo_step3_title')}</h3>
            <p className="text-on-surface-variant leading-relaxed text-sm">{t('seo_step3_desc')}</p>
          </div>
        </div>
      </section>

      {/* 3. Bitrate & Quality */}
      <section className="bg-surface-container-low p-8 md:p-12 rounded-3xl border border-white/5 shadow-lg space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
          <Settings className="text-primary" size={28} /> {t('seo_h2_2')}
        </h2>
        <p className="text-on-surface-variant leading-relaxed">{t('seo_quality_desc')}</p>
      </section>

      {/* 4. Supported Formats */}
      <section className="space-y-6 pt-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
          <Layers className="text-primary" size={28} /> {t('seo_h2_3')}
        </h2>
        <p className="text-on-surface-variant">{t('seo_formats_desc')}</p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-surface/50 border border-white/5 p-4 rounded-xl flex flex-col items-center justify-center gap-2 text-center hover:border-primary/50 transition-colors">
            <FileAudio className="text-primary" size={24} />
            <span className="font-bold text-white">MP4</span>
            <span className="text-xs text-on-surface-variant">{t('seo_format_mp4')}</span>
          </div>
          <div className="bg-surface/50 border border-white/5 p-4 rounded-xl flex flex-col items-center justify-center gap-2 text-center hover:border-primary/50 transition-colors">
            <FileAudio className="text-primary" size={24} />
            <span className="font-bold text-white">MKV</span>
            <span className="text-xs text-on-surface-variant">{t('seo_format_mkv')}</span>
          </div>
          <div className="bg-surface/50 border border-white/5 p-4 rounded-xl flex flex-col items-center justify-center gap-2 text-center hover:border-primary/50 transition-colors">
            <FileAudio className="text-primary" size={24} />
            <span className="font-bold text-white">MOV</span>
            <span className="text-xs text-on-surface-variant">{t('seo_format_mov')}</span>
          </div>
          <div className="bg-surface/50 border border-white/5 p-4 rounded-xl flex flex-col items-center justify-center gap-2 text-center hover:border-primary/50 transition-colors">
            <FileAudio className="text-primary" size={24} />
            <span className="font-bold text-white">WEBM</span>
            <span className="text-xs text-on-surface-variant">{t('seo_format_webm')}</span>
          </div>
          <div className="bg-surface/50 border border-white/5 p-4 rounded-xl flex flex-col items-center justify-center gap-2 text-center hover:border-primary/50 transition-colors">
            <FileAudio className="text-primary" size={24} />
            <span className="font-bold text-white">AVI</span>
            <span className="text-xs text-on-surface-variant">{t('seo_format_avi')}</span>
          </div>
        </div>
      </section>

      {/* 5. Devices & Compatibility */}
      <section className="space-y-6 pt-6 border-t border-white/10">
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
          <MonitorSmartphone className="text-primary" size={28} /> {t('seo_h2_4')}
        </h2>
        <ul className="space-y-4">
          <li className="flex gap-4 items-start bg-surface-container-low p-6 rounded-2xl border border-white/5">
            <div className="mt-1 bg-white/10 p-2 rounded-lg text-white"><CheckCircle2 size={20} /></div>
            <div>
              <h4 className="text-white font-bold text-lg mb-1">{t('seo_compat_ios_title')}</h4>
              <p className="text-sm text-on-surface-variant">{t('seo_compat_ios_desc')}</p>
            </div>
          </li>
          <li className="flex gap-4 items-start bg-surface-container-low p-6 rounded-2xl border border-white/5">
            <div className="mt-1 bg-white/10 p-2 rounded-lg text-white"><CheckCircle2 size={20} /></div>
            <div>
              <h4 className="text-white font-bold text-lg mb-1">{t('seo_compat_mac_title')}</h4>
              <p className="text-sm text-on-surface-variant">{t('seo_compat_mac_desc')}</p>
            </div>
          </li>
          <li className="flex gap-4 items-start bg-surface-container-low p-6 rounded-2xl border border-white/5">
            <div className="mt-1 bg-white/10 p-2 rounded-lg text-white"><CheckCircle2 size={20} /></div>
            <div>
              <h4 className="text-white font-bold text-lg mb-1">{t('seo_compat_android_title')}</h4>
              <p className="text-sm text-on-surface-variant">{t('seo_compat_android_desc')}</p>
            </div>
          </li>
        </ul>
      </section>

      {/* 6. Top Real-World Use Cases */}
      <section className="bg-surface-container-low p-8 md:p-12 rounded-3xl border border-white/5 shadow-lg space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
          <HardDrive className="text-primary" size={28} /> {t('seo_h2_5')}
        </h2>
        <p className="text-on-surface-variant mb-6">{t('seo_workflow_desc')}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="border border-white/10 p-6 rounded-2xl bg-surface/50">
            <h4 className="text-white font-bold mb-2">{t('seo_wf1_title')}</h4>
            <p className="text-sm text-on-surface-variant">{t('seo_wf1_desc')}</p>
          </div>
          <div className="border border-white/10 p-6 rounded-2xl bg-surface/50">
            <h4 className="text-white font-bold mb-2">{t('seo_wf2_title')}</h4>
            <p className="text-sm text-on-surface-variant">{t('seo_wf2_desc')}</p>
          </div>
          <div className="border border-white/10 p-6 rounded-2xl bg-surface/50">
            <h4 className="text-white font-bold mb-2">{t('seo_wf3_title')}</h4>
            <p className="text-sm text-on-surface-variant">{t('seo_wf3_desc')}</p>
          </div>
          <div className="border border-white/10 p-6 rounded-2xl bg-surface/50">
            <h4 className="text-white font-bold mb-2">{t('seo_wf4_title')}</h4>
            <p className="text-sm text-on-surface-variant">{t('seo_wf4_desc')}</p>
          </div>
        </div>
      </section>

      {/* 7. Frequently Asked Questions (FAQ) */}
      <section className="space-y-6 pt-6 border-t border-white/10">
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
          <HelpCircle className="text-primary" size={28} /> {t('seo_faq_title')}
        </h2>
        <div className="space-y-6">
          <div className="bg-surface-container-low p-6 rounded-2xl border border-white/5">
            <h3 className="text-lg font-bold text-white mb-2">{t('seo_faq1_q')}</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">{t('seo_faq1_a')}</p>
          </div>
          <div className="bg-surface-container-low p-6 rounded-2xl border border-white/5">
            <h3 className="text-lg font-bold text-white mb-2">{t('seo_faq2_q')}</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">{t('seo_faq2_a')}</p>
          </div>
          <div className="bg-surface-container-low p-6 rounded-2xl border border-white/5">
            <h3 className="text-lg font-bold text-white mb-2">{t('seo_faq3_q')}</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">{t('seo_faq3_a')}</p>
          </div>
          <div className="bg-surface-container-low p-6 rounded-2xl border border-white/5">
            <h3 className="text-lg font-bold text-white mb-2">{t('seo_faq4_q')}</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">{t('seo_faq4_a')}</p>
          </div>
          <div className="bg-surface-container-low p-6 rounded-2xl border border-white/5">
            <h3 className="text-lg font-bold text-white mb-2">{t('seo_faq5_q')}</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">{t('seo_faq5_a')}</p>
          </div>
        </div>
      </section>
    </article>
  );
}
