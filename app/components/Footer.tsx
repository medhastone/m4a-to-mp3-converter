import { Link } from '../../src/i18n/routing';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');

  return (
      <footer className="mt-auto border-t border-white/10 bg-surface py-16">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 xl:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="font-bold text-white mb-4">{t('devices_systems_title')}</h3>
              <ul className="space-y-3">
                <li><Link href="/iphone-voice-memos" className="text-on-surface-variant hover:text-white transition-colors text-sm font-medium">{t('iphone_voice_memos')}</Link></li>
                <li><Link href="/windows" className="text-on-surface-variant hover:text-white transition-colors text-sm font-medium">{t('windows_fix')}</Link></li>
                <li><Link href="/mac" className="text-on-surface-variant hover:text-white transition-colors text-sm font-medium">{t('mac_android_chromebook')}</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-white mb-4">{t('audio_fidelity_title')}</h3>
              <ul className="space-y-3">
                <li><Link href="/320kbps" className="text-on-surface-variant hover:text-white transition-colors text-sm font-medium">{t('studio_master_320kbps')}</Link></li>
                <li><Link href="/#specs" className="text-on-surface-variant hover:text-white transition-colors text-sm font-medium">{t('standard_mp3_192kbps')}</Link></li>
                <li><Link href="/#specs" className="text-on-surface-variant hover:text-white transition-colors text-sm font-medium">{t('speech_bitrate_128kbps')}</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-white mb-4">{t('tools_performance_title')}</h3>
              <ul className="space-y-3">
                <li><Link href="/batch-converter" className="text-on-surface-variant hover:text-white transition-colors text-sm font-medium">{t('batch_converter')}</Link></li>
                <li><Link href="/client-side-safe" className="text-on-surface-variant hover:text-white transition-colors text-sm font-medium">{t('client_side_safe')}</Link></li>
                <li><Link href="/client-side-safe" className="text-on-surface-variant hover:text-white transition-colors text-sm font-medium">{t('zero_upload_architecture')}</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-white mb-4">{t('platform_legal_title')}</h3>
              <ul className="space-y-3">
                <li><Link href="/privacy-policy" className="text-on-surface-variant hover:text-white transition-colors text-sm font-medium">{t('privacy_policy')}</Link></li>
                <li><Link href="/terms" className="text-on-surface-variant hover:text-white transition-colors text-sm font-medium">{t('terms_of_service')}</Link></li>
                <li><Link href="/about" className="text-on-surface-variant hover:text-white transition-colors text-sm font-medium">{t('about_us')}</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-on-surface-variant text-sm text-center md:text-left">
              {t.rich('copyright', {
                link: (chunks) => (
                  <Link href="https://zentova.in" target="_blank" rel="noopener" className="text-amber-400 hover:text-amber-300 font-semibold transition-colors">
                    {chunks}
                  </Link>
                )
              })}
            </p>
            <div className="flex items-center gap-4 text-on-surface-variant text-sm font-medium">
              {t('local_processing_badge')}
            </div>
          </div>
        </div>
      </footer>
  );
}