'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  ShieldCheck,
  Zap,
  Cpu,
  Layers,
  HelpCircle,
  ChevronDown,
  Lock,
  CheckCircle2,
  XCircle,
  FileAudio,
  Radio,
  Sliders,
  Sparkles
} from 'lucide-react';

export default function WavToMp3SEO() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const t = useTranslations('wav_to_mp3_seo');

  const toggleFaq = (index: number) => {
    setOpenFaq(prev => (prev === index ? null : index));
  };

  return (
    <article className="w-full max-w-4xl mx-auto flex flex-col gap-12 mt-4 pb-20 text-on-surface-variant">
      
      {/* 1. 3-Step Workflow */}
      <section id="how-to-convert-wav-to-mp3" className="bg-surface-container-low p-6 sm:p-10 rounded-3xl border border-outline-variant/20 shadow-md">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center shrink-0">
            <Sliders className="w-5 h-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-on-surface tracking-tight" dangerouslySetInnerHTML={{ __html: t.raw('seo_how_to_title') }} />
        </div>
        
        <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed mb-8" dangerouslySetInnerHTML={{ __html: t.raw('seo_how_to_desc') }} />

        <ol className="grid grid-cols-1 md:grid-cols-3 gap-6 list-none p-0 m-0">
          <li className="flex flex-col gap-3 p-5 rounded-2xl bg-surface-container border border-outline-variant/20 relative">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-lg bg-primary text-on-primary font-bold text-sm flex items-center justify-center shadow-xs">1</span>
              <span className="text-[11px] font-semibold text-primary uppercase tracking-wider">{t('seo_step1_label')}</span>
            </div>
            <h3 className="text-base font-bold text-on-surface" dangerouslySetInnerHTML={{ __html: t.raw('seo_step1_title') }} />
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed" dangerouslySetInnerHTML={{ __html: t.raw('seo_step1_desc') }} />
          </li>

          <li className="flex flex-col gap-3 p-5 rounded-2xl bg-surface-container border border-outline-variant/20 relative">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-lg bg-primary text-on-primary font-bold text-sm flex items-center justify-center shadow-xs">2</span>
              <span className="text-[11px] font-semibold text-primary uppercase tracking-wider">{t('seo_step2_label')}</span>
            </div>
            <h3 className="text-base font-bold text-on-surface" dangerouslySetInnerHTML={{ __html: t.raw('seo_step2_title') }} />
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed" dangerouslySetInnerHTML={{ __html: t.raw('seo_step2_desc') }} />
          </li>

          <li className="flex flex-col gap-3 p-5 rounded-2xl bg-surface-container border border-outline-variant/20 relative">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-lg bg-primary text-on-primary font-bold text-sm flex items-center justify-center shadow-xs">3</span>
              <span className="text-[11px] font-semibold text-primary uppercase tracking-wider">{t('seo_step3_label')}</span>
            </div>
            <h3 className="text-base font-bold text-on-surface" dangerouslySetInnerHTML={{ __html: t.raw('seo_step3_title') }} />
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed" dangerouslySetInnerHTML={{ __html: t.raw('seo_step3_desc') }} />
          </li>
        </ol>
      </section>

      {/* 2. WASM vs Cloud */}
      <section id="wasm-vs-cloud" className="bg-surface-container-low p-6 sm:p-10 rounded-3xl border border-outline-variant/20 shadow-md">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <Cpu className="w-5 h-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-on-surface tracking-tight" dangerouslySetInnerHTML={{ __html: t.raw('seo_wasm_title') }} />
        </div>

        <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: t.raw('seo_wasm_desc1') }} />
        <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed mb-8" dangerouslySetInnerHTML={{ __html: t.raw('seo_wasm_desc2') }} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-surface-container border border-emerald-500/30 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-on-surface" dangerouslySetInnerHTML={{ __html: t.raw('seo_wasm_client_title') }} />
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-on-surface-variant list-none p-0 m-0">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span dangerouslySetInnerHTML={{ __html: t.raw('seo_wasm_client_1') }} />
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span dangerouslySetInnerHTML={{ __html: t.raw('seo_wasm_client_2') }} />
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span dangerouslySetInnerHTML={{ __html: t.raw('seo_wasm_client_3') }} />
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span dangerouslySetInnerHTML={{ __html: t.raw('seo_wasm_client_4') }} />
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-surface-container border border-outline-variant/30 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-rose-500/15 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                <XCircle className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-on-surface" dangerouslySetInnerHTML={{ __html: t.raw('seo_wasm_legacy_title') }} />
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-on-surface-variant list-none p-0 m-0">
              <li className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span dangerouslySetInnerHTML={{ __html: t.raw('seo_wasm_legacy_1') }} />
              </li>
              <li className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span dangerouslySetInnerHTML={{ __html: t.raw('seo_wasm_legacy_2') }} />
              </li>
              <li className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span dangerouslySetInnerHTML={{ __html: t.raw('seo_wasm_legacy_3') }} />
              </li>
              <li className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span dangerouslySetInnerHTML={{ __html: t.raw('seo_wasm_legacy_4') }} />
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. Audio Specification Matrix */}
      <section id="audio-spec-matrix" className="bg-surface-container-low p-6 sm:p-10 rounded-3xl border border-outline-variant/20 shadow-md">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Radio className="w-5 h-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-on-surface tracking-tight" dangerouslySetInnerHTML={{ __html: t.raw('seo_matrix_title') }} />
        </div>

        <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: t.raw('seo_matrix_desc') }} />

        <div className="overflow-x-auto rounded-2xl border border-outline-variant/30">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-surface-container-high/80 border-b border-outline-variant/30 text-on-surface">
                <th scope="col" className="p-4 font-bold" dangerouslySetInnerHTML={{ __html: t.raw('seo_matrix_h1') }} />
                <th scope="col" className="p-4 font-bold" dangerouslySetInnerHTML={{ __html: t.raw('seo_matrix_h2') }} />
                <th scope="col" className="p-4 font-bold text-primary" dangerouslySetInnerHTML={{ __html: t.raw('seo_matrix_h3') }} />
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 bg-surface-container/40">
              <tr className="hover:bg-surface-container-high/40 transition-colors">
                <td className="p-4 font-semibold text-on-surface" dangerouslySetInnerHTML={{ __html: t.raw('seo_matrix_r1_c1') }} />
                <td className="p-4 text-on-surface-variant" dangerouslySetInnerHTML={{ __html: t.raw('seo_matrix_r1_c2') }} />
                <td className="p-4 text-on-surface font-medium" dangerouslySetInnerHTML={{ __html: t.raw('seo_matrix_r1_c3') }} />
              </tr>
              <tr className="hover:bg-surface-container-high/40 transition-colors">
                <td className="p-4 font-semibold text-on-surface" dangerouslySetInnerHTML={{ __html: t.raw('seo_matrix_r2_c1') }} />
                <td className="p-4 text-on-surface-variant" dangerouslySetInnerHTML={{ __html: t.raw('seo_matrix_r2_c2') }} />
                <td className="p-4 text-on-surface font-medium" dangerouslySetInnerHTML={{ __html: t.raw('seo_matrix_r2_c3') }} />
              </tr>
              <tr className="hover:bg-surface-container-high/40 transition-colors">
                <td className="p-4 font-semibold text-on-surface" dangerouslySetInnerHTML={{ __html: t.raw('seo_matrix_r3_c1') }} />
                <td className="p-4 text-on-surface-variant" dangerouslySetInnerHTML={{ __html: t.raw('seo_matrix_r3_c2') }} />
                <td className="p-4 text-emerald-600 dark:text-emerald-400 font-bold" dangerouslySetInnerHTML={{ __html: t.raw('seo_matrix_r3_c3') }} />
              </tr>
              <tr className="hover:bg-surface-container-high/40 transition-colors">
                <td className="p-4 font-semibold text-on-surface" dangerouslySetInnerHTML={{ __html: t.raw('seo_matrix_r4_c1') }} />
                <td className="p-4 text-on-surface-variant" dangerouslySetInnerHTML={{ __html: t.raw('seo_matrix_r4_c2') }} />
                <td className="p-4 text-on-surface font-medium" dangerouslySetInnerHTML={{ __html: t.raw('seo_matrix_r4_c3') }} />
              </tr>
              <tr className="hover:bg-surface-container-high/40 transition-colors">
                <td className="p-4 font-semibold text-on-surface" dangerouslySetInnerHTML={{ __html: t.raw('seo_matrix_r5_c1') }} />
                <td className="p-4 text-on-surface-variant" dangerouslySetInnerHTML={{ __html: t.raw('seo_matrix_r5_c2') }} />
                <td className="p-4 text-on-surface font-medium" dangerouslySetInnerHTML={{ __html: t.raw('seo_matrix_r5_c3') }} />
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Professional Use Cases */}
      <section id="wav-to-mp3-use-cases" className="bg-surface-container-low p-6 sm:p-10 rounded-3xl border border-outline-variant/20 shadow-md">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-on-surface tracking-tight" dangerouslySetInnerHTML={{ __html: t.raw('seo_use_cases_title') }} />
        </div>

        <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: t.raw('seo_use_cases_desc') }} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-surface-container border border-outline-variant/20 flex flex-col gap-3">
            <h3 className="text-base font-bold text-on-surface" dangerouslySetInnerHTML={{ __html: t.raw('seo_use_case1_title') }} />
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed" dangerouslySetInnerHTML={{ __html: t.raw('seo_use_case1_desc') }} />
          </div>

          <div className="p-5 rounded-2xl bg-surface-container border border-outline-variant/20 flex flex-col gap-3">
            <h3 className="text-base font-bold text-on-surface" dangerouslySetInnerHTML={{ __html: t.raw('seo_use_case2_title') }} />
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed" dangerouslySetInnerHTML={{ __html: t.raw('seo_use_case2_desc') }} />
          </div>

          <div className="p-5 rounded-2xl bg-surface-container border border-outline-variant/20 flex flex-col gap-3">
            <h3 className="text-base font-bold text-on-surface" dangerouslySetInnerHTML={{ __html: t.raw('seo_use_case3_title') }} />
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed" dangerouslySetInnerHTML={{ __html: t.raw('seo_use_case3_desc') }} />
          </div>
        </div>
      </section>

      {/* 5. FAQs */}
      <section id="faq" className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center shrink-0">
            <HelpCircle className="w-5 h-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-on-surface tracking-tight" dangerouslySetInnerHTML={{ __html: t.raw('seo_faq_title') }} />
        </div>

        <div className="flex flex-col gap-4">
          
          {/* FAQ 1 */}
          <div className="bg-surface-container-low rounded-2xl border border-outline-variant/20 overflow-hidden shadow-xs transition-colors">
            <button
              id="faq-btn-1"
              type="button"
              onClick={() => toggleFaq(0)}
              className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-on-surface hover:text-primary transition-colors cursor-pointer"
            >
              <span dangerouslySetInnerHTML={{ __html: t.raw('seo_faq1_q') }} />
              <ChevronDown className={`w-5 h-5 shrink-0 text-on-surface-variant transition-transform duration-200 ${openFaq === 0 ? 'rotate-180' : ''}`} />
            </button>
            {openFaq === 0 && (
              <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-on-surface-variant leading-relaxed border-t border-outline-variant/10 pt-4" dangerouslySetInnerHTML={{ __html: t.raw('seo_faq1_a') }} />
            )}
          </div>

          {/* FAQ 2 */}
          <div className="bg-surface-container-low rounded-2xl border border-outline-variant/20 overflow-hidden shadow-xs transition-colors">
            <button
              id="faq-btn-2"
              type="button"
              onClick={() => toggleFaq(1)}
              className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-on-surface hover:text-primary transition-colors cursor-pointer"
            >
              <span dangerouslySetInnerHTML={{ __html: t.raw('seo_faq2_q') }} />
              <ChevronDown className={`w-5 h-5 shrink-0 text-on-surface-variant transition-transform duration-200 ${openFaq === 1 ? 'rotate-180' : ''}`} />
            </button>
            {openFaq === 1 && (
              <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-on-surface-variant leading-relaxed border-t border-outline-variant/10 pt-4" dangerouslySetInnerHTML={{ __html: t.raw('seo_faq2_a') }} />
            )}
          </div>

          {/* FAQ 3 */}
          <div className="bg-surface-container-low rounded-2xl border border-outline-variant/20 overflow-hidden shadow-xs transition-colors">
            <button
              id="faq-btn-3"
              type="button"
              onClick={() => toggleFaq(2)}
              className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-on-surface hover:text-primary transition-colors cursor-pointer"
            >
              <span dangerouslySetInnerHTML={{ __html: t.raw('seo_faq3_q') }} />
              <ChevronDown className={`w-5 h-5 shrink-0 text-on-surface-variant transition-transform duration-200 ${openFaq === 2 ? 'rotate-180' : ''}`} />
            </button>
            {openFaq === 2 && (
              <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-on-surface-variant leading-relaxed border-t border-outline-variant/10 pt-4" dangerouslySetInnerHTML={{ __html: t.raw('seo_faq3_a') }} />
            )}
          </div>

          {/* FAQ 4 */}
          <div className="bg-surface-container-low rounded-2xl border border-outline-variant/20 overflow-hidden shadow-xs transition-colors">
            <button
              id="faq-btn-4"
              type="button"
              onClick={() => toggleFaq(3)}
              className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-on-surface hover:text-primary transition-colors cursor-pointer"
            >
              <span dangerouslySetInnerHTML={{ __html: t.raw('seo_faq4_q') }} />
              <ChevronDown className={`w-5 h-5 shrink-0 text-on-surface-variant transition-transform duration-200 ${openFaq === 3 ? 'rotate-180' : ''}`} />
            </button>
            {openFaq === 3 && (
              <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-on-surface-variant leading-relaxed border-t border-outline-variant/10 pt-4" dangerouslySetInnerHTML={{ __html: t.raw('seo_faq4_a') }} />
            )}
          </div>

          {/* FAQ 5 */}
          <div className="bg-surface-container-low rounded-2xl border border-outline-variant/20 overflow-hidden shadow-xs transition-colors">
            <button
              id="faq-btn-5"
              type="button"
              onClick={() => toggleFaq(4)}
              className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-on-surface hover:text-primary transition-colors cursor-pointer"
            >
              <span dangerouslySetInnerHTML={{ __html: t.raw('seo_faq5_q') }} />
              <ChevronDown className={`w-5 h-5 shrink-0 text-on-surface-variant transition-transform duration-200 ${openFaq === 4 ? 'rotate-180' : ''}`} />
            </button>
            {openFaq === 4 && (
              <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-on-surface-variant leading-relaxed border-t border-outline-variant/10 pt-4" dangerouslySetInnerHTML={{ __html: t.raw('seo_faq5_a') }} />
            )}
          </div>

          {/* FAQ 6 */}
          <div className="bg-surface-container-low rounded-2xl border border-outline-variant/20 overflow-hidden shadow-xs transition-colors">
            <button
              id="faq-btn-6"
              type="button"
              onClick={() => toggleFaq(5)}
              className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-on-surface hover:text-primary transition-colors cursor-pointer"
            >
              <span dangerouslySetInnerHTML={{ __html: t.raw('seo_faq6_q') }} />
              <ChevronDown className={`w-5 h-5 shrink-0 text-on-surface-variant transition-transform duration-200 ${openFaq === 5 ? 'rotate-180' : ''}`} />
            </button>
            {openFaq === 5 && (
              <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-on-surface-variant leading-relaxed border-t border-outline-variant/10 pt-4" dangerouslySetInnerHTML={{ __html: t.raw('seo_faq6_a') }} />
            )}
          </div>

        </div>
      </section>

    </article>
  );
}
