"use client";
import { CheckCircle, Lock } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function MetadataSEO() {
  const t = useTranslations();
  
  return (
    <div className="w-full mt-16 flex flex-col items-center">
      
      {/* 2. "How It Works" Visual Section */}
      <section className="w-full mb-20">
        <h2 className="text-3xl font-bold mb-10 text-center">{t('mv_seo_h2_how')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          
          <div className="bg-primary/10 border border-primary/20 p-8 rounded-2xl flex flex-col items-center text-center relative z-10 backdrop-blur-sm">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4 text-primary font-bold">
              1
            </div>
            <h3 className="text-xl font-bold mb-3 text-on-surface">{t('mv_seo_step1_title')}</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              {t('mv_seo_step1_desc')}
            </p>
          </div>
          
          <div className="bg-primary/10 border border-primary/20 p-8 rounded-2xl flex flex-col items-center text-center relative z-10 backdrop-blur-sm">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4 text-primary font-bold">
              2
            </div>
            <h3 className="text-xl font-bold mb-3 text-on-surface">{t('mv_seo_step2_title')}</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              {t('mv_seo_step2_desc')}
            </p>
          </div>
          
          <div className="bg-primary/10 border border-primary/20 p-8 rounded-2xl flex flex-col items-center text-center relative z-10 backdrop-blur-sm">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4 text-primary font-bold">
              3
            </div>
            <h3 className="text-xl font-bold mb-3 text-on-surface">{t('mv_seo_step3_title')}</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              {t('mv_seo_step3_desc')}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Deep Dive Feature Cards (Data points) */}
      <section className="w-full mb-20 text-center">
        <h2 className="text-3xl font-bold mb-4">{t('mv_seo_h2_cap')}</h2>
        <p className="text-on-surface-variant mb-10 max-w-3xl mx-auto leading-relaxed">
          {t('mv_seo_cap_desc')}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          
          <div className="bg-surface-container rounded-2xl p-6 border border-white/5 hover:border-primary/30 transition-colors">
            <h3 className="text-lg font-bold text-on-surface mb-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              {t('mv_seo_cap1_title')}
            </h3>
            <ul className="text-sm text-on-surface-variant space-y-2 list-disc list-inside">
              <li><strong className="text-on-surface">{t('mv_seo_cap1_i1_str')}</strong>{t('mv_seo_cap1_i1_txt')}</li>
              <li><strong className="text-on-surface">{t('mv_seo_cap1_i2_str')}</strong>{t('mv_seo_cap1_i2_txt')}</li>
              <li><strong className="text-on-surface">{t('mv_seo_cap1_i3_str')}</strong>{t('mv_seo_cap1_i3_txt')}</li>
            </ul>
          </div>
          
          <div className="bg-surface-container rounded-2xl p-6 border border-white/5 hover:border-primary/30 transition-colors">
            <h3 className="text-lg font-bold text-on-surface mb-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              {t('mv_seo_cap2_title')}
            </h3>
            <ul className="text-sm text-on-surface-variant space-y-2 list-disc list-inside">
              <li><strong className="text-on-surface">{t('mv_seo_cap2_i1_str')}</strong>{t('mv_seo_cap2_i1_txt')}</li>
              <li><strong className="text-on-surface">{t('mv_seo_cap2_i2_str')}</strong>{t('mv_seo_cap2_i2_txt')}</li>
              <li><strong className="text-on-surface">{t('mv_seo_cap2_i3_str')}</strong>{t('mv_seo_cap2_i3_txt')}</li>
            </ul>
          </div>

          <div className="bg-surface-container rounded-2xl p-6 border border-white/5 hover:border-primary/30 transition-colors">
            <h3 className="text-lg font-bold text-on-surface mb-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              {t('mv_seo_cap3_title')}
            </h3>
            <ul className="text-sm text-on-surface-variant space-y-2 list-disc list-inside">
              <li><strong className="text-on-surface">{t('mv_seo_cap3_i1_str')}</strong>{t('mv_seo_cap3_i1_txt')}</li>
              <li><strong className="text-on-surface">{t('mv_seo_cap3_i2_str')}</strong>{t('mv_seo_cap3_i2_txt')}</li>
              <li><strong className="text-on-surface">{t('mv_seo_cap3_i3_str')}</strong>{t('mv_seo_cap3_i3_txt')}</li>
            </ul>
          </div>

          <div className="bg-surface-container rounded-2xl p-6 border border-white/5 hover:border-primary/30 transition-colors">
            <h3 className="text-lg font-bold text-on-surface mb-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              {t('mv_seo_cap4_title')}
            </h3>
            <ul className="text-sm text-on-surface-variant space-y-2 list-disc list-inside">
              <li><strong className="text-on-surface">{t('mv_seo_cap4_i1_str')}</strong>{t('mv_seo_cap4_i1_txt')}</li>
              <li><strong className="text-on-surface">{t('mv_seo_cap4_i2_str')}</strong>{t('mv_seo_cap4_i2_txt')}</li>
              <li><strong className="text-on-surface">{t('mv_seo_cap4_i3_str')}</strong>{t('mv_seo_cap4_i3_txt')}</li>
              <li><strong className="text-on-surface">{t('mv_seo_cap4_i4_str')}</strong>{t('mv_seo_cap4_i4_txt')}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Why In-Browser Deep Audio Inspection Matters (Use Cases) */}
      <section className="w-full mb-20 bg-surface-container/50 rounded-3xl p-8 md:p-12 border border-white/5">
        <h2 className="text-3xl font-bold mb-8 text-center">{t('mv_seo_h2_why')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-3 text-on-surface">{t('mv_seo_why1_title')}</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              {t.rich('mv_seo_why1_desc', { howto: (chunks) => <strong>{chunks}</strong> })}
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-3 text-on-surface">{t('mv_seo_why2_title')}</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              {t('mv_seo_why2_desc')}
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-3 text-on-surface">{t('mv_seo_why3_title')}</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              {t.rich('mv_seo_why3_desc', { free: (chunks) => <strong>{chunks}</strong> })}
            </p>
          </div>
        </div>
      </section>

      {/* 4. Detailed Feature Matrix Table */}
      <section className="w-full mb-20">
        <h2 className="text-3xl font-bold mb-8 text-center">{t('mv_seo_h2_adv')}</h2>
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container border-b border-white/10">
                <th className="p-4 text-on-surface font-bold w-1/3">{t('mv_seo_adv_th1')}</th>
                <th className="p-4 text-on-surface font-bold w-1/3">{t('mv_seo_adv_th2')}</th>
                <th className="p-4 text-primary font-bold w-1/3 bg-primary/5">{t('mv_seo_adv_th3')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 bg-surface-dim/20">
              <tr>
                <td className="p-4 align-middle text-on-surface-variant font-medium">{t('mv_seo_adv_r1c1')}</td>
                <td className="p-4 align-middle text-on-surface-variant"><CheckCircle className="w-5 h-5 text-green-500 inline-block align-middle -mt-0.5" /></td>
                <td className="p-4 align-middle bg-primary/5"><CheckCircle className="w-5 h-5 text-primary inline-block align-middle -mt-0.5" /></td>
              </tr>
              <tr>
                <td className="p-4 align-middle text-on-surface-variant font-medium">{t('mv_seo_adv_r2c1')}</td>
                <td className="p-4 align-middle text-on-surface-variant">{t('mv_seo_adv_r2c2')}</td>
                <td className="p-4 align-middle bg-primary/5 text-on-surface font-semibold">{t('mv_seo_adv_r2c3')}</td>
              </tr>
              <tr>
                <td className="p-4 align-middle text-on-surface-variant font-medium">{t('mv_seo_adv_r3c1')}</td>
                <td className="p-4 align-middle text-on-surface-variant">{t('mv_seo_adv_r3c2')}</td>
                <td className="p-4 align-middle bg-primary/5"><CheckCircle className="w-5 h-5 text-primary inline-block align-middle -mt-0.5" /></td>
              </tr>
              <tr>
                <td className="p-4 align-middle text-on-surface-variant font-medium">{t('mv_seo_adv_r4c1')}</td>
                <td className="p-4 align-middle text-on-surface-variant">{t('mv_seo_adv_r4c2')}</td>
                <td className="p-4 align-middle bg-primary/5 text-on-surface font-semibold">{t('mv_seo_adv_r4c3')}</td>
              </tr>
              <tr>
                <td className="p-4 align-middle text-on-surface-variant font-medium">{t('mv_seo_adv_r5c1')}</td>
                <td className="p-4 align-middle text-on-surface-variant">{t('mv_seo_adv_r5c2')}</td>
                <td className="p-4 align-middle bg-primary/5 text-on-surface font-semibold">{t('mv_seo_adv_r5c3')}</td>
              </tr>
              <tr>
                <td className="p-4 align-middle text-on-surface-variant font-medium">{t('mv_seo_adv_r6c1')}</td>
                <td className="p-4 align-middle text-on-surface-variant">{t('mv_seo_adv_r6c2')}</td>
                <td className="p-4 align-middle bg-primary/5"><CheckCircle className="w-5 h-5 text-primary inline-block align-middle -mt-0.5" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. Frequently Asked Questions */}
      <section className="w-full max-w-3xl mx-auto mb-10">
        <h2 className="text-3xl font-bold mb-8 text-center">{t('mv_seo_h2_faq')}</h2>
        <div className="space-y-6">
          <div className="bg-surface-container rounded-2xl p-6 border border-white/5">
            <h3 className="text-lg font-bold text-on-surface flex items-center gap-2 mb-2">
              <Lock className="w-5 h-5 text-primary" /> {t('mv_seo_faq1_q')}
            </h3>
            <p className="text-on-surface-variant leading-relaxed">
              {t.rich('mv_seo_faq1_a', { no: (chunks) => <strong>{chunks}</strong> })}
            </p>
          </div>
          
          <div className="bg-surface-container rounded-2xl p-6 border border-white/5">
            <h3 className="text-lg font-bold text-on-surface mb-2">{t('mv_seo_faq2_q')}</h3>
            <p className="text-on-surface-variant leading-relaxed">
              {t.rich('mv_seo_faq2_a', { 
                id3: (chunks) => <strong>{chunks}</strong>,
                stream: (chunks) => <strong>{chunks}</strong>,
                inspect: (chunks) => <strong>{chunks}</strong>
              })}
            </p>
          </div>

          <div className="bg-surface-container rounded-2xl p-6 border border-white/5">
            <h3 className="text-lg font-bold text-on-surface mb-2">{t('mv_seo_faq3_q')}</h3>
            <p className="text-on-surface-variant leading-relaxed">
              {t.rich('mv_seo_faq3_a', { 
                online: (chunks) => <strong>{chunks}</strong>,
                wasm: (chunks) => <strong>{chunks}</strong>
              })}
            </p>
          </div>

          <div className="bg-surface-container rounded-2xl p-6 border border-white/5">
            <h3 className="text-lg font-bold text-on-surface mb-2">{t('mv_seo_faq4_q')}</h3>
            <p className="text-on-surface-variant leading-relaxed">
              {t.rich('mv_seo_faq4_a', { 
                true: (chunks) => <strong>{chunks}</strong>,
                sample: (chunks) => <strong>{chunks}</strong>
              })}
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
