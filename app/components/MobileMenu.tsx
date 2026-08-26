"use client";

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '../../i18n/routing';
import { Menu, X, ChevronDown } from 'lucide-react';

export default function MobileMenu() {
  const t = useTranslations('mobilemenu');
  const [isOpen, setIsOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);

  return (
    <div className="lg:hidden flex items-center">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="p-2 text-on-surface-variant hover:text-on-surface transition-colors"
        aria-label={t('toggle_menu')}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div className="absolute top-20 left-0 right-0 bg-surface-container-high border-b border-outline-variant/20 shadow-xl flex flex-col z-50">
          <Link onClick={() => setIsOpen(false)} className="px-6 py-4 text-on-surface hover:bg-surface-dim transition-colors font-medium border-b border-outline-variant/10" href="/#how-it-works">
            {t('how_it_works')}
          </Link>
          <Link onClick={() => setIsOpen(false)} className="px-6 py-4 text-on-surface hover:bg-surface-dim transition-colors font-medium border-b border-outline-variant/10" href="/#specs">
            {t('technical_specs')}
          </Link>
          <Link onClick={() => setIsOpen(false)} className="px-6 py-4 text-on-surface hover:bg-surface-dim transition-colors font-medium border-b border-outline-variant/10" href="/#faq">
            {t('faq')}
          </Link>
          
          <div className="flex flex-col border-b border-outline-variant/10">
            <button 
              onClick={() => setIsToolsOpen(!isToolsOpen)}
              className="px-6 py-4 flex items-center justify-between text-on-surface hover:bg-surface-dim transition-colors font-medium"
            >
              {t('presets_and_tools')} 
              <ChevronDown className={`w-5 h-5 transition-transform ${isToolsOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isToolsOpen && (
              <div className="bg-surface-dim/30 flex flex-col py-2 px-6">
                <Link onClick={() => setIsOpen(false)} href="/iphone-voice-memos" className="py-3 text-sm text-on-surface-variant hover:text-primary flex items-center gap-3">
                  <span className="text-lg">📱</span> {t('iphone_voice_memos')}
                </Link>
                <Link onClick={() => setIsOpen(false)} href="/320kbps" className="py-3 text-sm text-on-surface-variant hover:text-primary flex items-center gap-3">
                  <span className="text-lg">🎵</span> {t('studio_master')}
                </Link>
                <Link onClick={() => setIsOpen(false)} href="/batch-converter" className="py-3 text-sm text-on-surface-variant hover:text-primary flex items-center gap-3">
                  <span className="text-lg">🗂️</span> {t('batch_audio_converter')}
                </Link>
                <Link onClick={() => setIsOpen(false)} href="/windows" className="py-3 text-sm text-on-surface-variant hover:text-primary flex items-center gap-3">
                  <span className="text-lg">💻</span> {t('windows_pc_fix')}
                </Link>
                <Link onClick={() => setIsOpen(false)} href="/mac" className="py-3 text-sm text-on-surface-variant hover:text-primary flex items-center gap-3">
                  <span className="text-lg">🍏</span> {t('mac_android_chromeos')}
                </Link>
                <Link onClick={() => setIsOpen(false)} href="/client-side-safe" className="py-3 text-sm text-on-surface-variant hover:text-primary flex items-center gap-3">
                  <span className="text-lg">🔒</span> {t('client_side_safe')}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}