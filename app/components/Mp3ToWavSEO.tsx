'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import {
  ShieldCheck,
  Zap,
  Cpu,
  Layers,
  HelpCircle,
  ChevronDown,
  Sliders,
  CheckCircle2,
  FileAudio,
  Sparkles,
  ArrowRight,
  Waveform,
  Headphones,
  Music,
  Lock,
  Volume2
} from 'lucide-react';

export default function Mp3ToWavSEO({ locale = 'en' }: { locale?: string }) {
  const t = useTranslations('mp3_to_wav_seo');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  const faqIndices = [1, 2, 3, 4, 5, 6] as const;

  return (
    <article className="w-full max-w-4xl mx-auto flex flex-col gap-12 mt-4 pb-20 text-slate-300">
      {/* 1. Step-by-Step Workflow Section */}
      <section
        id="how-to-convert-mp3-to-wav"
        className="bg-[#0b0f17] p-6 sm:p-10 rounded-3xl border border-slate-800 shadow-xl"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-orange-500/15 text-orange-400 flex items-center justify-center shrink-0">
            <Sliders className="w-5 h-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {t('how_to_title')}
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-8">
          {t('how_to_desc')}
        </p>

        <ol className="grid grid-cols-1 md:grid-cols-3 gap-6 list-none p-0 m-0">
          {/* Step 1 */}
          <li className="flex flex-col gap-3 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 relative group hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-lg bg-orange-500 text-slate-950 font-extrabold text-sm flex items-center justify-center shadow-sm">
                1
              </span>
              <span className="text-[11px] font-semibold text-orange-400 uppercase tracking-wider">
                {t('step1_label')}
              </span>
            </div>
            <h3 className="text-base font-bold text-white">
              {t('step1_title')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {t('step1_desc')}
            </p>
          </li>

          {/* Step 2 */}
          <li className="flex flex-col gap-3 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 relative group hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-lg bg-orange-500 text-slate-950 font-extrabold text-sm flex items-center justify-center shadow-sm">
                2
              </span>
              <span className="text-[11px] font-semibold text-orange-400 uppercase tracking-wider">
                {t('step2_label')}
              </span>
            </div>
            <h3 className="text-base font-bold text-white">
              {t('step2_title')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {t('step2_desc')}
            </p>
          </li>

          {/* Step 3 */}
          <li className="flex flex-col gap-3 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 relative group hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-lg bg-orange-500 text-slate-950 font-extrabold text-sm flex items-center justify-center shadow-sm">
                3
              </span>
              <span className="text-[11px] font-semibold text-orange-400 uppercase tracking-wider">
                {t('step3_label')}
              </span>
            </div>
            <h3 className="text-base font-bold text-white">
              {t('step3_title')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {t('step3_desc')}
            </p>
          </li>
        </ol>
      </section>

      {/* 2. Engineering Differentiator: Why Convert MP3 to WAV? */}
      <section
        id="why-convert-mp3-to-wav"
        className="bg-[#0b0f17] p-6 sm:p-10 rounded-3xl border border-slate-800 shadow-xl flex flex-col gap-6"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center shrink-0">
            <Cpu className="w-5 h-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {t('why_convert_title')}
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          {t('why_convert_intro')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col gap-3">
            <div className="flex items-center gap-2.5 text-white font-bold">
              <div className="w-8 h-8 rounded-lg bg-orange-500/15 text-orange-400 flex items-center justify-center shrink-0">
                <Zap className="w-4 h-4" />
              </div>
              <h3>{t('card1_title')}</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {t('card1_desc')}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col gap-3">
            <div className="flex items-center gap-2.5 text-white font-bold">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3>{t('card2_title')}</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {t('card2_desc')}
            </p>
          </div>
        </div>

        {/* Local WebAssembly vs Cloud Remote Comparison */}
        <div className="mt-2 p-6 rounded-2xl bg-slate-900/90 border border-emerald-500/30">
          <h3 className="text-base sm:text-lg font-bold text-white mb-2 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            {t('wasm_comparison_title')}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
            {t('wasm_comparison_intro')}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center gap-2 text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{t('wasm_perk1')}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center gap-2 text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{t('wasm_perk2')}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center gap-2 text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{t('wasm_perk3')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Technical Comparison Matrix */}
      <section
        id="technical-comparison-matrix"
        className="bg-[#0b0f17] p-6 sm:p-10 rounded-3xl border border-slate-800 shadow-xl"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-orange-500/15 text-orange-400 flex items-center justify-center shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {t('matrix_title')}
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-6">
          {t('matrix_intro')}
        </p>

        <div className="overflow-x-auto rounded-2xl border border-slate-800">
          <table className="w-full text-left text-xs sm:text-sm text-slate-300">
            <thead className="bg-slate-900/90 text-white uppercase text-[11px] tracking-wider border-b border-slate-800">
              <tr>
                <th scope="col" className="px-5 py-3.5 font-bold">
                  {t('col_spec')}
                </th>
                <th scope="col" className="px-5 py-3.5 font-bold text-orange-400">
                  {t('col_mp3')}
                </th>
                <th scope="col" className="px-5 py-3.5 font-bold text-emerald-400">
                  {t('col_wav')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 bg-slate-950/40 font-mono text-xs">
              <tr className="hover:bg-slate-900/40 transition-colors">
                <td className="px-5 py-3.5 font-sans font-semibold text-white">
                  {t('row1_title')}
                </td>
                <td className="px-5 py-3.5 text-slate-300">
                  {t('row1_mp3')}
                </td>
                <td className="px-5 py-3.5 text-emerald-300 font-semibold">
                  {t('row1_wav')}
                </td>
              </tr>
              <tr className="hover:bg-slate-900/40 transition-colors">
                <td className="px-5 py-3.5 font-sans font-semibold text-white">
                  {t('row2_title')}
                </td>
                <td className="px-5 py-3.5 text-slate-300">
                  {t('row2_mp3')}
                </td>
                <td className="px-5 py-3.5 text-emerald-300 font-semibold">
                  {t('row2_wav')}
                </td>
              </tr>
              <tr className="hover:bg-slate-900/40 transition-colors">
                <td className="px-5 py-3.5 font-sans font-semibold text-white">
                  {t('row3_title')}
                </td>
                <td className="px-5 py-3.5 text-slate-300">
                  {t('row3_mp3')}
                </td>
                <td className="px-5 py-3.5 text-slate-300">
                  {t('row3_wav')}
                </td>
              </tr>
              <tr className="hover:bg-slate-900/40 transition-colors">
                <td className="px-5 py-3.5 font-sans font-semibold text-white">
                  {t('row4_title')}
                </td>
                <td className="px-5 py-3.5 text-slate-300">
                  {t('row4_mp3')}
                </td>
                <td className="px-5 py-3.5 text-emerald-300 font-semibold">
                  {t('row4_wav')}
                </td>
              </tr>
              <tr className="hover:bg-slate-900/40 transition-colors">
                <td className="px-5 py-3.5 font-sans font-semibold text-white">
                  {t('row5_title')}
                </td>
                <td className="px-5 py-3.5 font-sans text-slate-300">
                  {t('row5_mp3')}
                </td>
                <td className="px-5 py-3.5 font-sans text-emerald-300 font-semibold">
                  {t('row5_wav')}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Contextual Internal Cross-Links */}
      <section
        id="related-audio-tools"
        className="bg-[#0b0f17] p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl"
      >
        <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2">
          <ArrowRight className="w-5 h-5 text-orange-400" />
          {t('tools_title')}
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed">
          {t('tools_desc')}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href={`/${locale}/wav-to-mp3`}
            className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-orange-500/50 transition-all flex flex-col justify-between group"
          >
            <div>
              <span className="text-[11px] font-semibold text-orange-400 uppercase tracking-wider block mb-1">
                {t('tool1_badge')}
              </span>
              <h3 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                {t('tool1_title')}
              </h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                {t('tool1_desc')}
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-xs text-orange-400 font-semibold">
              <span>{t('tool1_cta')}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href={`/${locale}/what-is-a-daw`}
            className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-orange-500/50 transition-all flex flex-col justify-between group"
          >
            <div>
              <span className="text-[11px] font-semibold text-indigo-400 uppercase tracking-wider block mb-1">
                {t('tool2_badge')}
              </span>
              <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                {t('tool2_title')}
              </h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                {t('tool2_desc')}
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-xs text-indigo-400 font-semibold">
              <span>{t('tool2_cta')}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href={`/${locale}`}
            className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-orange-500/50 transition-all flex flex-col justify-between group"
          >
            <div>
              <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider block mb-1">
                {t('tool3_badge')}
              </span>
              <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                {t('tool3_title')}
              </h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                {t('tool3_desc')}
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
              <span>{t('tool3_cta')}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* 5. Authoritative FAQ Accordion */}
      <section
        id="frequently-asked-questions"
        className="bg-[#0b0f17] p-6 sm:p-10 rounded-3xl border border-slate-800 shadow-xl"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-orange-500/15 text-orange-400 flex items-center justify-center shrink-0">
            <HelpCircle className="w-5 h-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {t('faq_title')}
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-6">
          {t('faq_intro')}
        </p>

        <div className="space-y-3">
          {faqIndices.map((num) => {
            const index = num - 1;
            const isOpen = openFaq === index;
            const questionKey = `faq${num}_q` as any;
            const answerKey = `faq${num}_a` as any;

            return (
              <div
                key={num}
                className="rounded-2xl border border-slate-800/80 bg-slate-900/60 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-white hover:text-orange-400 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span>{t(questionKey)}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-orange-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                    <p>{t(answerKey)}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </article>
  );
}
