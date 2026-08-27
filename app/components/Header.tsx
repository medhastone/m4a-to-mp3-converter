import { AudioLines, ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '../../src/i18n/routing';
import LanguageSwitcher from './LanguageSwitcher';
import MobileMenu from './MobileMenu';

export default function Header() {
  const t = useTranslations('header');

  return (
      <header className="sticky top-0 z-40 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 xl:px-12 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-container rounded flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
               <AudioLines className="text-on-primary w-5 h-5" />
            </div>
            <span className="font-semibold text-xl tracking-tight group-hover:text-primary transition-colors">{t('brand_name')}<span className="text-primary">.com</span></span>
          </Link>
          
          <nav className="hidden lg:flex items-center gap-6 mx-12">
            <Link className="text-on-surface-variant hover:text-on-surface transition-colors font-medium text-sm" href="/#how-it-works">{t('how_it_works')}</Link>
            <Link className="text-on-surface-variant hover:text-on-surface transition-colors font-medium text-sm" href="/#specs">{t('technical_specs')}</Link>
            <Link className="text-on-surface-variant hover:text-on-surface transition-colors font-medium text-sm" href="/#faq">{t('faq')}</Link>
            
            <div className="relative group">
              <button className="text-on-surface-variant hover:text-on-surface transition-colors font-medium text-sm flex items-center gap-1">
                {t('presets_and_tools')} <ChevronDown className="w-4 h-4" />
              </button>
              
              <div className="absolute top-full left-0 mt-2 w-64 bg-surface-container-high border border-outline-variant/30 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col py-2 z-50">
                <Link href="/iphone-voice-memos" className="px-4 py-2 text-sm text-on-surface-variant hover:text-primary hover:bg-surface-dim transition-colors flex items-center gap-2">
                  <span className="text-lg">📱</span> {t('iphone_voice_memos')}
                </Link>
                <Link href="/320kbps" className="px-4 py-2 text-sm text-on-surface-variant hover:text-primary hover:bg-surface-dim transition-colors flex items-center gap-2">
                  <span className="text-lg">🎵</span> {t('studio_master_320kbps')}
                </Link>
                <Link href="/batch-converter" className="px-4 py-2 text-sm text-on-surface-variant hover:text-primary hover:bg-surface-dim transition-colors flex items-center gap-2">
                  <span className="text-lg">🗂️</span> {t('batch_audio_converter')}
                </Link>
                <Link href="/windows" className="px-4 py-2 text-sm text-on-surface-variant hover:text-primary hover:bg-surface-dim transition-colors flex items-center gap-2">
                  <span className="text-lg">💻</span> {t('windows_pc_fix')}
                </Link>
                <Link href="/mac" className="px-4 py-2 text-sm text-on-surface-variant hover:text-primary hover:bg-surface-dim transition-colors flex items-center gap-2">
                  <span className="text-lg">🍏</span> {t('mac_android_chromeos')}
                </Link>
                <Link href="/client-side-safe" className="px-4 py-2 text-sm text-on-surface-variant hover:text-primary hover:bg-surface-dim transition-colors flex items-center gap-2">
                  <span className="text-lg">🔒</span> {t('client_side_safe')}
                </Link>
              </div>
            </div>
          </nav>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-bold tracking-wider uppercase shadow-sm">
               <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
               {t('client_side_badge')}
            </div>
            <LanguageSwitcher />
            <MobileMenu />
          </div>
        </div>
      </header>
  );
}