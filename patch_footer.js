const fs = require('fs');
const file = 'app/components/Footer.tsx';
let content = fs.readFileSync(file, 'utf8');

const importTarget = "import { useTranslations } from 'next-intl';";
const importReplacement = "import { useTranslations } from 'next-intl';\nimport { Facebook, Twitter, Instagram } from 'lucide-react';";

if (content.includes(importTarget)) {
  content = content.replace(importTarget, importReplacement);
} else {
  console.log("Import target not found");
}

const htmlTarget = '<div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">';
const htmlReplacement = `<div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6 text-on-surface-variant">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors" aria-label="Meta">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors" aria-label="X (Twitter)">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
            </div>`;

if (content.includes(htmlTarget)) {
  content = content.replace(htmlTarget, htmlReplacement);
  fs.writeFileSync(file, content);
  console.log("Success patching footer");
} else {
  console.log("HTML target not found");
}
