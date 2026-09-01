import React from 'react';
import { useTranslations } from 'next-intl';

export default function AcxCheckerArticle() {
  const t = useTranslations('acx_article');
  
  return (
    <article className="w-full max-w-5xl mx-auto mt-24 mb-24">
      <div className="bg-surface-container-high/50 border border-outline-variant rounded-3xl p-8 md:p-12 xl:p-16 mb-12">
        <div className="prose dark:prose-invert max-w-none lg:prose-lg mx-auto space-y-6">
      
      <h2 className="text-3xl font-bold tracking-tight mb-6">{t('h2_barrier')}</h2>
      
      <p>{t('p_barrier_1')}</p>
      <p>{t('p_barrier_2')}</p>
      <p>{t('p_barrier_3')}</p>
      <p>{t('p_barrier_4')}</p>
      <p>{t('p_barrier_5')}</p>
      <p>{t('p_barrier_6')}</p>
      
      <hr className="my-10 border-outline-variant" />
      
      <h2 className="text-3xl font-bold tracking-tight mb-6">{t('h2_verify')}</h2>
      
      <div className="not-prose grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
        <div className="bg-surface-container-high/50 border border-outline-variant rounded-xl p-6">
          <div className="text-2xl font-black text-primary mb-2">01.</div>
          <h3 className="text-lg font-semibold text-on-surface mb-2">{t('step1_title').replace('01. ', '')}</h3>
          <p className="text-on-surface-variant text-sm">{t('step1_desc')}</p>
        </div>
        <div className="bg-surface-container-high/50 border border-outline-variant rounded-xl p-6">
          <div className="text-2xl font-black text-primary mb-2">02.</div>
          <h3 className="text-lg font-semibold text-on-surface mb-2">{t('step2_title').replace('02. ', '')}</h3>
          <p className="text-on-surface-variant text-sm">{t('step2_desc')}</p>
        </div>
        <div className="bg-surface-container-high/50 border border-outline-variant rounded-xl p-6">
          <div className="text-2xl font-black text-primary mb-2">03.</div>
          <h3 className="text-lg font-semibold text-on-surface mb-2">{t('step3_title').replace('03. ', '')}</h3>
          <p className="text-on-surface-variant text-sm">{t('step3_desc')}</p>
        </div>
      </div>
      
      <h2 className="text-3xl font-bold tracking-tight mb-6 mt-16">{t('h2_matrix')}</h2>
      <p>{t('matrix_desc')}</p>
      
      <div className="overflow-x-auto not-prose my-8">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="bg-surface-container-high border-b border-outline text-on-surface-variant">
              <th className="p-4 font-semibold">{t('matrix_th_metric')}</th>
              <th className="p-4 font-semibold">{t('matrix_th_acx')}</th>
              <th className="p-4 font-semibold">{t('matrix_th_why')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant text-on-surface-variant">
            <tr>
              <td className="p-4 font-medium text-on-surface">{t('matrix_rms')}</td>
              <td className="p-4 text-emerald-600 dark:text-emerald-400">{t('matrix_rms_val')}</td>
              <td className="p-4">{t('matrix_rms_why')}</td>
            </tr>
            <tr>
              <td className="p-4 font-medium text-on-surface">{t('matrix_peak')}</td>
              <td className="p-4 text-emerald-600 dark:text-emerald-400">{t('matrix_peak_val')}</td>
              <td className="p-4">{t('matrix_peak_why')}</td>
            </tr>
            <tr>
              <td className="p-4 font-medium text-on-surface">{t('matrix_noise')}</td>
              <td className="p-4 text-emerald-600 dark:text-emerald-400">{t('matrix_noise_val')}</td>
              <td className="p-4">{t('matrix_noise_why')}</td>
            </tr>
            <tr>
              <td className="p-4 font-medium text-on-surface">{t('matrix_sample')}</td>
              <td className="p-4 text-emerald-600 dark:text-emerald-400">{t('matrix_sample_val')}</td>
              <td className="p-4">{t('matrix_sample_why')}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <h2 className="text-3xl font-bold tracking-tight mb-6 mt-16">{t('h2_guide')}</h2>
      
      <h3 className="text-2xl font-semibold text-on-surface mt-12 mb-4">{t('h3_peak')}</h3>
      <p>{t('p_peak')}</p>
      
      <h3 className="text-2xl font-semibold text-on-surface mt-12 mb-4">{t('h3_rms')}</h3>
      <p>{t('p_rms')}</p>
      
      <h3 className="text-2xl font-semibold text-on-surface mt-12 mb-4">{t('h3_noise')}</h3>
      <p>{t('p_noise_1')}</p>
      <p>{t('p_noise_2')}</p>
      
      <h3 className="text-2xl font-semibold text-on-surface mt-12 mb-4">{t('h3_room')}</h3>
      <p>{t('p_room')}</p>
      
      <hr className="my-10 border-outline-variant" />
      
      <h2 className="text-3xl font-bold tracking-tight mb-6 mt-16">{t('h2_vs')}</h2>
      <p>{t('p_vs')}</p>
      
      <div className="overflow-x-auto not-prose my-8">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="bg-surface-container-high border-b border-outline text-on-surface-variant">
              <th className="p-4 font-semibold">{t('vs_th_feature')}</th>
              <th className="p-4 font-semibold">{t('vs_th_our')}</th>
              <th className="p-4 font-semibold">{t('vs_th_trad')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant text-on-surface-variant">
            <tr>
              <td className="p-4 font-medium text-on-surface">{t('vs_install')}</td>
              <td className="p-4 text-emerald-600 dark:text-emerald-400">{t('vs_install_our')}</td>
              <td className="p-4">{t('vs_install_trad')}</td>
            </tr>
            <tr>
              <td className="p-4 font-medium text-on-surface">{t('vs_cross')}</td>
              <td className="p-4 text-emerald-600 dark:text-emerald-400">{t('vs_cross_our')}</td>
              <td className="p-4">{t('vs_cross_trad')}</td>
            </tr>
            <tr>
              <td className="p-4 font-medium text-on-surface">{t('vs_pdf')}</td>
              <td className="p-4 text-emerald-600 dark:text-emerald-400">{t('vs_pdf_our')}</td>
              <td className="p-4">{t('vs_pdf_trad')}</td>
            </tr>
            <tr>
              <td className="p-4 font-medium text-on-surface">{t('vs_dc')}</td>
              <td className="p-4 text-emerald-600 dark:text-emerald-400">{t('vs_dc_our')}</td>
              <td className="p-4">{t('vs_dc_trad')}</td>
            </tr>
            <tr>
              <td className="p-4 font-medium text-on-surface">{t('vs_priv')}</td>
              <td className="p-4 text-emerald-600 dark:text-emerald-400">{t('vs_priv_our')}</td>
              <td className="p-4">{t('vs_priv_trad')}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <h2 className="text-3xl font-bold tracking-tight mb-6 mt-16">{t('h2_pdf')}</h2>
      <p>{t('p_pdf_1')}</p>
      <p>{t('p_pdf_2')}</p>
      
        </div>
      </div>

      <div className="bg-surface-container-high/50 border border-outline-variant rounded-3xl p-8 md:p-12 xl:p-16">
        <h2 className="text-3xl font-bold tracking-tight mb-8">{t('h2_faq')}</h2>
        <div className="space-y-8 mt-8">
          <div>
            <h3 className="text-xl font-semibold text-on-surface mb-2">{t('faq_q1')}</h3>
            <p className="text-on-surface-variant">{t('faq_a1')}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-on-surface mb-2">{t('faq_q2')}</h3>
            <p className="text-on-surface-variant">{t('faq_a2')}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-on-surface mb-2">{t('faq_q3')}</h3>
            <p className="text-on-surface-variant">{t('faq_a3')}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-on-surface mb-2">{t('faq_q4')}</h3>
            <p className="text-on-surface-variant">{t('faq_a4')}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-on-surface mb-2">{t('faq_q5')}</h3>
            <p className="text-on-surface-variant">{t('faq_a5')}</p>
          </div>
        </div>                
      </div>
    </article>
  );
}
