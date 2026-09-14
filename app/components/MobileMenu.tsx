"use client";

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '../../src/i18n/routing';
import { Menu, X, ChevronDown } from 'lucide-react';

export default function MobileMenu() {
  const t = useTranslations('mobilemenu');
  const tHeader = useTranslations('header');
  const [isOpen, setIsOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isBlogOpen, setIsBlogOpen] = useState(false);

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
          
          {/* Blog Section */}
          <div className="flex flex-col border-b border-outline-variant/10">
            <div className="flex items-center justify-between px-6 py-4">
              <Link 
                onClick={() => setIsOpen(false)} 
                className="text-on-surface hover:text-primary transition-colors font-medium flex items-center gap-2" 
                href="/blog"
              >
                <span>📚</span> {t('blog')}
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-primary/10 text-primary uppercase tracking-wider">Guides</span>
              </Link>
              <button 
                onClick={() => setIsBlogOpen(!isBlogOpen)}
                className="p-1 text-on-surface-variant hover:text-on-surface transition-colors"
                aria-label="Toggle Blog Submenu"
              >
                <ChevronDown className={`w-5 h-5 transition-transform ${isBlogOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>
            
            {isBlogOpen && (
              <div className="bg-surface-dim/30 flex flex-col py-2 px-6">
                <Link onClick={() => setIsOpen(false)} href="/blog" className="py-2.5 text-sm text-on-surface hover:text-primary flex items-center gap-2 font-medium">
                  <span>📖</span> {t('all_articles')}
                </Link>
                <Link onClick={() => setIsOpen(false)} href="/blog/what-is-a-daw" className="py-2.5 text-sm text-on-surface-variant hover:text-primary flex items-center gap-2">
                  <span>🎛️</span> {t('what_is_a_daw_title')}
                </Link>
                <Link onClick={() => setIsOpen(false)} href="/blog/sample-rate-vs-bit-depth" className="py-2.5 text-sm text-on-surface-variant hover:text-primary flex items-center gap-2">
                  <span>🎚️</span> Sample Rate vs Bit Depth
                </Link>
                <Link onClick={() => setIsOpen(false)} href="/blog/lossless-vs-lossy-audio" className="py-2.5 text-sm text-on-surface-variant hover:text-primary flex items-center gap-2">
                  <span>🎧</span> Lossless vs Lossy Audio
                </Link>
              </div>
            )}
          </div>
          
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
                <Link onClick={() => setIsOpen(false)} href="/wav-to-mp3" className="py-3 text-sm text-on-surface-variant hover:text-primary flex items-center gap-3">
                  <span className="text-lg">🌊</span> {tHeader('wav_to_mp3_converter')}
                </Link>
                <Link onClick={() => setIsOpen(false)} href="/video-to-mp3" className="py-3 text-sm text-on-surface-variant hover:text-primary flex items-center gap-3">
                  <span className="text-lg">🎬</span> {tHeader('mp4_to_mp3_converter')}
                </Link>
                <Link onClick={() => setIsOpen(false)} href="/mp3-to-m4a" className="py-3 text-sm text-on-surface-variant hover:text-primary flex items-center gap-3">
                  <span className="text-lg">🔄</span> {tHeader('mp3_to_m4a_converter')}
                </Link>
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
                <Link onClick={() => setIsOpen(false)} href="/metadata-viewer" className="py-3 text-sm text-on-surface-variant hover:text-primary flex items-center gap-3">
                  <span className="text-lg">🏷️</span> {tHeader('metadata_viewer')}
                </Link>
                <Link onClick={() => setIsOpen(false)} href="/audio-metadata-remover" className="py-3 text-sm text-on-surface-variant hover:text-primary flex items-center gap-3">
                  <span className="text-lg">🛡️</span> {tHeader('metadata_remover')}
                </Link>
                <Link onClick={() => setIsOpen(false)} href="/client-side-safe" className="py-3 text-sm text-on-surface-variant hover:text-primary flex items-center gap-3">
                  <span className="text-lg">🔒</span> {t('client_side_safe')}
                </Link>
                <Link onClick={() => setIsOpen(false)} href="/acx-checker" className="py-3 text-sm text-on-surface-variant hover:text-primary flex items-center gap-3">
                  <span className="text-lg">🎙️</span> {tHeader('acx_audio_checker')}
                </Link>
                <Link onClick={() => setIsOpen(false)} href="/mp3-to-wav" className="py-3 text-sm text-on-surface-variant hover:text-primary flex items-center gap-3">
                  <span className="text-lg">🎼</span> MP3 to WAV Converter
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}