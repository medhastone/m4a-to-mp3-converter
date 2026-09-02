import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Cpu, XCircle, CheckCircle, Mail, Clock, Send } from 'lucide-react';
import Converter from '../../components/Converter';

import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const t = await getTranslations({ locale, namespace: 'about' });
  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  setRequestLocale(locale);
  const t = await getTranslations('about');

  return (
    <main className="flex-1 relative z-10 w-full max-w-5xl mx-auto px-6 py-12 md:py-20 flex flex-col gap-16">
      {/* Header / Origin Story */}
      <div className="text-center md:text-left border-b border-outline-variant pb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-on-surface mb-6 tracking-tight">
          {t('hero_title')}
        </h1>
        <p className="text-on-surface-variant text-lg leading-relaxed max-w-3xl">
          {t('hero_desc_1')}
        </p>
        <p className="text-on-surface-variant text-lg leading-relaxed max-w-3xl mt-4">
          {t('hero_desc_2_prefix')}
          <strong className="text-on-surface">{t('hero_desc_2_bold')}</strong>
          {t('hero_desc_2_suffix')}
        </p>
      </div>

      {/* Technical Engineering & Architecture */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-on-surface flex items-center gap-3">
            <Cpu className="w-6 h-6 text-emerald-400" />
            {t('tech_arch_title')}
          </h2>
          <p className="text-on-surface-variant leading-relaxed">
            {t('tech_arch_p1_1')}
            <strong>{t('tech_arch_p1_bold')}</strong>
            {t('tech_arch_p1_2')}
          </p>
          <p className="text-on-surface-variant leading-relaxed">
            {t('tech_arch_p2_1')}
            <strong>{t('tech_arch_p2_bold1')}</strong>
            {t('tech_arch_p2_2')}
            <code className="bg-surface-container-high text-emerald-400 px-1.5 py-0.5 rounded text-sm font-mono border border-outline-variant">
              {t('tech_arch_p2_code')}
            </code>
            {t('tech_arch_p2_3')}
          </p>
        </div>

        {/* Comparison Matrix */}
        <div className="bg-surface-container-high/50 border border-outline-variant rounded-2xl p-6 flex flex-col gap-4">
          <h3 className="text-lg font-bold text-on-surface mb-2">
            {t('perf_title')}
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface border border-outline-variant p-4 rounded-xl">
              <span className="text-outline text-xs font-mono uppercase tracking-wider block mb-2">
                {t('perf_legacy_title')}
              </span>
              <ul className="space-y-2 text-sm text-on-surface-variant mt-3">
                <li className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-400" />
                  {t('perf_legacy_item1')}
                </li>
                <li className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-400" />
                  {t('perf_legacy_item2')}
                </li>
                <li className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-400" />
                  {t('perf_legacy_item3')}
                </li>
              </ul>
            </div>

            <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl shadow-[0_0_15px_rgba(249,115,22,0.05)]">
              <span className="text-emerald-400 text-xs font-mono uppercase tracking-wider block mb-2">
                {t('perf_our_title')}
              </span>
              <ul className="space-y-2 text-sm text-on-surface mt-3">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  {t('perf_our_item1')}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  {t('perf_our_item2')}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  {t('perf_our_item3')}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Standards & The Team */}
      <section className="bg-surface-container-high/30 border-l-4 border-emerald-500 p-8 rounded-r-2xl">
        <h2 className="text-2xl font-bold text-on-surface mb-4">
          {t('team_title')}
        </h2>
        <p className="text-on-surface-variant leading-relaxed mb-4">
          {t('team_p1_1')}
          <strong>{t('team_p1_bold')}</strong>
          {t('team_p1_2')}
          <a
            href="https://zentova.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:text-emerald-300 font-semibold underline transition"
          >
            zentova.in
          </a>
          {t('team_p1_3')}
        </p>
        <p className="text-on-surface-variant leading-relaxed">
          <strong>{t('team_p2_bold')}</strong>
          {t('team_p2_text')}
        </p>
      </section>

      {/* Contact & Feedback Center */}
      <section className="border-t border-outline-variant pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 flex flex-col gap-6">
            <h2 className="text-3xl font-bold text-on-surface tracking-tight">
              {t('contact_title')}
            </h2>
            <p className="text-on-surface-variant leading-relaxed">
              {t('contact_desc')}
            </p>

            <div className="bg-surface-container-high/80 border border-outline-variant rounded-2xl p-6 mt-4">
              <h3 className="text-on-surface font-semibold mb-4">
                {t('support_channel_title')}
              </h3>
              <div className="flex items-center gap-4 text-on-surface-variant bg-surface border border-outline-variant px-4 py-3 rounded-lg w-fit">
                <Mail className="w-5 h-5 text-emerald-400" />
                <a
                  href="mailto:medhastone@gmail.com"
                  className="hover:text-emerald-400 transition-colors font-mono text-sm"
                >
                  medhastone@gmail.com
                </a>
              </div>
            </div>

            <div className="bg-surface-container-high/30 border border-outline-variant rounded-xl p-5">
              <h4 className="text-on-surface font-semibold mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-on-surface-variant" />
                {t('timeline_title')}
              </h4>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                {t('timeline_desc_1')}
                <strong>{t('timeline_desc_bold')}</strong>.
              </p>
            </div>
          </div>

          {/* Interactive Form */}
          <div className="lg:col-span-7 bg-surface-container-high/80 border border-outline-variant rounded-2xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none" />

            <form id="contactForm" className="flex flex-col gap-5 relative z-10">
              <input
                type="hidden"
                name="_subject"
                value="New Inquiry from M4A to MP3 Converter.com"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-medium text-on-surface-variant">
                    {t('form_name_label')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="bg-surface border border-outline-variant text-on-surface rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-primary transition-colors placeholder:text-on-surface-variant"
                    placeholder={t('form_name_placeholder')}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-medium text-on-surface-variant">
                    {t('form_email_label')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="bg-surface border border-outline-variant text-on-surface rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-primary transition-colors placeholder:text-on-surface-variant"
                    placeholder={t('form_email_placeholder')}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="purpose" className="text-sm font-medium text-on-surface-variant">
                  {t('form_purpose_label')}
                </label>
                <select
                  id="purpose"
                  name="purpose"
                  className="bg-surface border border-outline-variant text-on-surface rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-primary transition-colors"
                >
                  <option value="support">{t('form_purpose_support')}</option>
                  <option value="bug">{t('form_purpose_bug')}</option>
                  <option value="feature">{t('form_purpose_feature')}</option>
                  <option value="business">{t('form_purpose_business')}</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium text-on-surface-variant">
                  {t('form_message_label')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="bg-surface border border-outline-variant text-on-surface rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-primary transition-colors placeholder:text-on-surface-variant resize-none"
                  placeholder={t('form_message_placeholder')}
                />
              </div>

              <button
                id="submitBtn"
                type="submit"
                className="mt-2 bg-gradient-to-r from-primary to-primary-container hover:from-primary-container hover:to-primary text-on-surface font-bold py-3.5 px-6 rounded-lg transition-all transform hover:scale-[1.02] shadow-[0_4px_14px_rgba(249,115,22,0.3)] flex items-center justify-center gap-2"
              >
                <span>{t('form_submit_btn')}</span> <Send className="w-4 h-4" />
              </button>

              <div
                id="formSuccess"
                className="hidden mt-2 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg text-sm text-center font-medium"
              >
                {t('form_success_msg')}
              </div>
              <div
                id="formError"
                className="hidden mt-2 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm text-center font-medium"
              >
                {t('form_error_msg')}
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}


