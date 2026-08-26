import { AudioLines, ArrowRight, ShieldCheck, Zap, ServerOff, Smartphone, Mic, Layers, Activity, Monitor, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import Converter from '../components/Converter';
import { getTranslations } from 'next-intl/server';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const t = await getTranslations('home');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': t('h2_faq'),
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': t('description')
            }
          }
        ]
      },
      {
        '@type': 'HowTo',
        'name': t('h2_how_it_works'),
        'step': [
          {
            '@type': 'HowToStep',
            'text': t('howto_step_1')
          }
        ]
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      

      <main className="flex-1 flex flex-col relative w-full items-center">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 xl:px-12 py-12 md:py-24 flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Left Column */}
          <div className="flex-1 flex flex-col items-start text-left">
            <div className="flex items-stretch gap-5 mb-6">
              <div className="w-1.5 md:w-2 bg-white rounded-full opacity-90"></div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight text-white py-1">
                {t('h1').split(/(Converter|Convertidor|Convertisseur|Umwandler|Conversor)/i).map((part: string, i: number) => 
                  /(Converter|Convertidor|Convertisseur|Umwandler|Conversor)/i.test(part) ? 
                    <span key={i} className="text-primary">{part}</span> : part
                )}
              </h1>
            </div>
            
            <p className="text-on-surface-variant text-lg md:text-xl max-w-lg mb-12 leading-relaxed font-medium">
              {t('hero_subtitle_1')}<br/>
              {t('hero_subtitle_2')}<br/>
              {t('hero_subtitle_3')}
            </p>

            <div className="flex gap-12 text-sm font-bold">
               <div>
                 <span className="text-amber-500 uppercase tracking-wider text-xs block mb-1">{t('engine')}</span>
                 <span className="text-white text-lg">{t('engine_value')}</span>
               </div>
               <div>
                 <span className="text-amber-500 uppercase tracking-wider text-xs block mb-1">{t('latency')}</span>
                 <span className="text-white text-lg">{t('latency_value')}</span>
               </div>
            </div>
          </div>

          {/* Right Column: Converter */}
          <div className="w-full lg:w-[60%] xl:w-[65%] flex flex-col gap-4">
             <Converter />
             <div className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-4 mt-2">
               <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-amber-400 flex-shrink-0 mt-0.5" />
               <p className="text-xs md:text-sm text-on-surface-variant font-medium leading-relaxed">
                 <strong className="text-white">{t('privacy_badge_title')}</strong> {t('privacy_badge_text')}
               </p>
             </div>
          </div>
        </div>
          
        {/* SEO Enhanced Sections: How it works, Technical Specs, FAQ */}
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 xl:px-12">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-outline-variant/30 to-transparent my-12"></div>

          <section id="how-it-works" className="mt-8 flex flex-col gap-10 scroll-mt-24">
            <div className="flex flex-col items-center text-center gap-4 w-full">
              <h2 className="text-2xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 tracking-tight leading-tight">{t('h2_how_it_works')}</h2>
              <p className="text-on-surface-variant text-lg leading-relaxed">
                {t('how_it_works_desc_1')}
                <br/><br/>
                {t('how_it_works_desc_2')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Step 1 */}
              <div className="bg-surface-container-low rounded-3xl p-8 flex flex-col items-center text-center gap-5 border border-white/5 shadow-xl relative overflow-hidden group hover:border-primary/30 transition-all duration-300">
                <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none transform translate-x-4 -translate-y-4">
                  <span className="font-black text-9xl text-on-surface">1</span>
                </div>
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20 text-primary mb-2 shadow-inner">
                  <Layers className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-2xl text-on-surface">{t('step1_title')}</h3>
                <p className="text-on-surface-variant leading-relaxed text-sm md:text-base">
                  {t('step1_desc')}
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-surface-container-low rounded-3xl p-8 flex flex-col items-center text-center gap-5 border border-white/5 shadow-xl relative overflow-hidden group hover:border-secondary/30 transition-all duration-300">
                <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none transform translate-x-4 -translate-y-4">
                  <span className="font-black text-9xl text-on-surface">2</span>
                </div>
                <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center border border-secondary/20 text-secondary mb-2 shadow-inner">
                  <Activity className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-2xl text-on-surface">{t('step2_title')}</h3>
                <p className="text-on-surface-variant leading-relaxed text-sm md:text-base">
                  {t('step2_desc')}
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-surface-container-low rounded-3xl p-8 flex flex-col items-center text-center gap-5 border border-white/5 shadow-xl relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-300">
                <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none transform translate-x-4 -translate-y-4">
                  <span className="font-black text-9xl text-on-surface">3</span>
                </div>
                <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20 text-emerald-400 mb-2 shadow-inner">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-2xl text-on-surface">{t('step3_title')}</h3>
                <p className="text-on-surface-variant leading-relaxed text-sm md:text-base">
                  {t('step3_desc')}
                </p>
              </div>
            </div>
          </section>

          {/* Technical Specs Table (Expanded) */}
          <section id="specs" className="mt-20 flex flex-col gap-10 scroll-mt-24">
            <div className="flex flex-col items-center text-center gap-4 w-full">
              <h2 className="text-2xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 tracking-tight leading-tight">{t('h2_specs')}</h2>
              <p className="text-on-surface-variant text-lg leading-relaxed">
                {t('specs_desc')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-[1px] bg-outline-variant/30 rounded-3xl overflow-hidden shadow-2xl border border-white/5">
              {/* Headers */}
              <div className="hidden sm:block bg-surface-container p-6"></div>
              
              <div className="bg-surface-container p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-surface-container-highest"></div>
                <span className="font-semibold text-2xl text-on-surface">{t('spec_m4a_label')} <span className="text-on-surface-variant font-normal text-lg">{t('spec_m4a_sub')}</span></span>
                <span className="font-jb-mono text-[11px] text-on-surface-variant uppercase tracking-[0.15em] mt-3 bg-surface-dim px-3 py-1.5 rounded-md border border-outline-variant/50 shadow-inner">{t('spec_m4a_codec')}</span>
              </div>
              
              <div className="bg-surface-container-high p-8 flex flex-col items-center justify-center relative overflow-hidden text-center">
                <div className="absolute top-0 left-0 right-0 h-1 bg-primary shadow-[0_0_10px_rgba(249,115,22,0.8)]"></div>
                <span className="font-bold text-2xl text-primary drop-shadow-[0_2px_8px_rgba(249,115,22,0.3)]">{t('spec_mp3_label')} <span className="text-primary-container font-normal text-lg">{t('spec_mp3_sub')}</span></span>
                <span className="font-jb-mono text-[11px] text-primary-container uppercase tracking-[0.15em] mt-3 bg-primary/10 px-3 py-1.5 rounded-md border border-primary/30 shadow-inner">{t('spec_mp3_codec')}</span>
              </div>
              
              {/* Row 1 */}
              <div className="bg-surface-container-low p-6 flex items-center justify-center text-center border-t border-outline-variant/10">
                <span className="text-on-surface-variant text-base font-medium">{t('spec_row1_title')}</span>
              </div>
              <div className="bg-surface p-6 flex items-center justify-center text-center border-t border-outline-variant/10">
                <span className="text-on-surface text-base">{t('spec_row1_source')}</span>
              </div>
              <div className="bg-surface p-6 flex items-center justify-center text-center border-t border-outline-variant/10">
                <span className="text-on-surface text-base">{t('spec_row1_target')}</span>
              </div>
              
              {/* Row 2 */}
              <div className="bg-surface-container-low p-6 flex items-center justify-center text-center border-t border-outline-variant/10">
                <span className="text-on-surface-variant text-base font-medium">{t('spec_row2_title')}</span>
              </div>
              <div className="bg-surface p-6 flex items-center justify-center text-center border-t border-outline-variant/10">
                <span className="text-on-surface text-base">{t('spec_row2_source')}</span>
              </div>
              <div className="bg-surface-dim p-6 flex items-center justify-center relative overflow-hidden group text-center border-t border-outline-variant/10">
                <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors"></div>
                <span className="text-primary font-bold relative z-10 drop-shadow-sm text-base">{t('spec_row2_target')}</span>
              </div>
              
              {/* Row 3 */}
              <div className="bg-surface-container-low p-6 flex items-center justify-center text-center border-t border-outline-variant/10">
                <span className="text-on-surface-variant text-base font-medium">{t('spec_row3_title')}</span>
              </div>
              <div className="bg-surface p-6 flex items-center justify-center text-center border-t border-outline-variant/10">
                <span className="text-on-surface text-base">{t('spec_row3_source')}</span>
              </div>
              <div className="bg-surface p-6 flex items-center justify-center text-center border-t border-outline-variant/10">
                <span className="text-on-surface text-base">{t('spec_row3_target')}</span>
              </div>

              {/* Row 4 */}
              <div className="bg-surface-container-low p-6 flex items-center justify-center text-center border-t border-outline-variant/10">
                <span className="text-on-surface-variant text-base font-medium">{t('spec_row4_title')}</span>
              </div>
              <div className="bg-surface p-6 flex items-center justify-center text-center border-t border-outline-variant/10">
                <span className="text-on-surface text-base">{t('spec_row4_source')}</span>
              </div>
              <div className="bg-surface p-6 flex items-center justify-center text-center border-t border-outline-variant/10">
                <span className="text-on-surface text-base">{t('spec_row4_target')}</span>
              </div>
            </div>
          </section>

          {/* Comprehensive FAQ Section */}
          <section id="faq" className="mt-24 mb-12 flex flex-col gap-10 scroll-mt-24">
            <div className="flex flex-col items-center text-center gap-4 w-full">
              <h2 className="text-2xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 tracking-tight leading-tight">{t('h2_faq')}</h2>
              <p className="text-on-surface-variant text-lg leading-relaxed">
                {t('faq_desc')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              
              {/* Question 1 */}
              <div className="bg-surface-container-low p-8 rounded-3xl border border-white/5 shadow-lg hover:bg-surface-container transition-colors duration-300">
                <h4 className="font-bold text-xl text-on-surface mb-3 flex items-start gap-3">
                  <span className="text-primary mt-1"><Mic className="w-5 h-5" /></span>
                  {t('faq_q1')}
                </h4>
                <p className="text-on-surface-variant leading-relaxed text-base">
                  <strong>{t('faq_a1_strong')}</strong> {t('faq_a1_text')}
                </p>
              </div>

              {/* Question 2 */}
              <div className="bg-surface-container-low p-8 rounded-3xl border border-white/5 shadow-lg hover:bg-surface-container transition-colors duration-300">
                <h4 className="font-bold text-xl text-on-surface mb-3 flex items-start gap-3">
                  <span className="text-primary mt-1"><Layers className="w-5 h-5" /></span>
                  {t('faq_q2')}
                </h4>
                <p className="text-on-surface-variant leading-relaxed text-base">
                  <strong>{t('faq_a2_m4a_strong')}</strong> {t('faq_a2_m4a_text')} <strong>{t('faq_a2_mp3_strong')}</strong> {t('faq_a2_mp3_text')}
                </p>
              </div>

              {/* Question 3 */}
              <div className="bg-surface-container-low p-8 rounded-3xl border border-white/5 shadow-lg hover:bg-surface-container transition-colors duration-300">
                <h4 className="font-bold text-xl text-on-surface mb-3 flex items-start gap-3">
                  <span className="text-primary mt-1"><Smartphone className="w-5 h-5" /></span>
                  {t('faq_q3')}
                </h4>
                <p className="text-on-surface-variant leading-relaxed text-base">
                  {t('faq_a3')}
                </p>
              </div>

              {/* Question 4 */}
              <div className="bg-surface-container-low p-8 rounded-3xl border border-white/5 shadow-lg hover:bg-surface-container transition-colors duration-300">
                <h4 className="font-bold text-xl text-on-surface mb-3 flex items-start gap-3">
                  <span className="text-primary mt-1"><AudioLines className="w-5 h-5" /></span>
                  {t('faq_q4')}
                </h4>
                <p className="text-on-surface-variant leading-relaxed text-base">
                  {t('faq_a4_part1')} <strong>{t('faq_a4_strong')}</strong> {t('faq_a4_part2')}
                </p>
              </div>
              
              {/* Question 5 */}
              <div className="bg-surface-container-low p-8 rounded-3xl border border-white/5 shadow-lg hover:bg-surface-container transition-colors duration-300">
                <h4 className="font-bold text-xl text-on-surface mb-3 flex items-start gap-3">
                  <span className="text-primary mt-1"><Activity className="w-5 h-5" /></span>
                  {t('faq_q5')}
                </h4>
                <p className="text-on-surface-variant leading-relaxed text-base">
                  {t('faq_a5')}
                </p>
              </div>

              {/* Question 6 */}
              <div className="bg-surface-container-low p-8 rounded-3xl border border-white/5 shadow-lg hover:bg-surface-container transition-colors duration-300">
                <h4 className="font-bold text-xl text-on-surface mb-3 flex items-start gap-3">
                  <span className="text-primary mt-1"><Monitor className="w-5 h-5" /></span>
                  {t('faq_q6')}
                </h4>
                <p className="text-on-surface-variant leading-relaxed text-base">
                  {t('faq_a6')}
                </p>
              </div>
              
            </div>
          </section>

        </div>
      </main>


      
    </>
  );
}