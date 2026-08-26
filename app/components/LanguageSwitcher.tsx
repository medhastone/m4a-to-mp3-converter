'use client';
import { useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { usePathname, Link } from '../../i18n/routing';
import { useLocale } from 'next-intl';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
];

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const currentLocale = useLocale();
  const currentLang = languages.find(l => l.code === currentLocale) || languages[0];

  return (
    <div className="relative group z-50">
      <button 
        className="text-on-surface-variant hover:text-on-surface transition-colors font-medium text-sm flex items-center gap-1.5 bg-surface-container-low border border-outline-variant/30 px-3 py-1.5 rounded-full shadow-sm"
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
      >
        <span className="text-base leading-none">{currentLang.flag}</span>
        <span className="hidden sm:inline-block uppercase">{currentLocale}</span>
        <ChevronDown className="w-3 h-3" />
      </button>
      
      <div className={`absolute top-full right-0 mt-2 w-36 bg-surface-container-high border border-outline-variant/30 rounded-xl shadow-2xl transition-all duration-200 flex flex-col py-2 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible group-hover:opacity-100 group-hover:visible'}`}>
        {languages.map((lang) => (
          <Link 
            key={lang.code}
            href={pathname}
            locale={lang.code}
            onClick={() => setIsOpen(false)}
            className={`px-4 py-2 text-sm transition-colors flex items-center gap-3 ${
              currentLocale === lang.code 
                ? 'text-primary font-medium bg-surface-dim/30' 
                : 'text-on-surface-variant hover:text-primary hover:bg-surface-dim'
            }`}
          >
            <span className="text-base leading-none">{lang.flag}</span>
            <span>{lang.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
