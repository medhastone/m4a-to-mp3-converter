"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);

  return (
    <div className="lg:hidden flex items-center">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="p-2 text-on-surface-variant hover:text-on-surface transition-colors"
        aria-label="Toggle Menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div className="absolute top-20 left-0 right-0 bg-surface-container-high border-b border-outline-variant/20 shadow-xl flex flex-col z-50">
          <Link onClick={() => setIsOpen(false)} className="px-6 py-4 text-on-surface hover:bg-surface-dim transition-colors font-medium border-b border-outline-variant/10" href="/#how-it-works">
            How it Works
          </Link>
          <Link onClick={() => setIsOpen(false)} className="px-6 py-4 text-on-surface hover:bg-surface-dim transition-colors font-medium border-b border-outline-variant/10" href="/#specs">
            Technical Specs
          </Link>
          <Link onClick={() => setIsOpen(false)} className="px-6 py-4 text-on-surface hover:bg-surface-dim transition-colors font-medium border-b border-outline-variant/10" href="/#faq">
            FAQ
          </Link>
          
          <div className="flex flex-col border-b border-outline-variant/10">
            <button 
              onClick={() => setIsToolsOpen(!isToolsOpen)}
              className="px-6 py-4 flex items-center justify-between text-on-surface hover:bg-surface-dim transition-colors font-medium"
            >
              Presets & Tools 
              <ChevronDown className={`w-5 h-5 transition-transform ${isToolsOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isToolsOpen && (
              <div className="bg-surface-dim/30 flex flex-col py-2 px-6">
                <a onClick={() => setIsOpen(false)} href="/iphone-voice-memos.html" className="py-3 text-sm text-on-surface-variant hover:text-primary flex items-center gap-3">
                  <span className="text-lg">📱</span> iPhone Voice Memos
                </a>
                <a onClick={() => setIsOpen(false)} href="/320kbps.html" className="py-3 text-sm text-on-surface-variant hover:text-primary flex items-center gap-3">
                  <span className="text-lg">🎵</span> 320kbps Studio Master
                </a>
                <a onClick={() => setIsOpen(false)} href="/batch-converter.html" className="py-3 text-sm text-on-surface-variant hover:text-primary flex items-center gap-3">
                  <span className="text-lg">🗂️</span> Batch Audio Converter
                </a>
                <a onClick={() => setIsOpen(false)} href="/windows.html" className="py-3 text-sm text-on-surface-variant hover:text-primary flex items-center gap-3">
                  <span className="text-lg">💻</span> Windows 11 / 10 PC Fix
                </a>
                <a onClick={() => setIsOpen(false)} href="/mac.html" className="py-3 text-sm text-on-surface-variant hover:text-primary flex items-center gap-3">
                  <span className="text-lg">🍏</span> Mac, Android & ChromeOS
                </a>
                <a onClick={() => setIsOpen(false)} href="/client-side-safe.html" className="py-3 text-sm text-on-surface-variant hover:text-primary flex items-center gap-3">
                  <span className="text-lg">🔒</span> 100% Client-Side Safe
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
