const fs = require('fs');
const file = 'app/components/Footer.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace imports
const importTarget = "import { Facebook, Twitter, Instagram } from 'lucide-react';";
const importReplacement = "import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';";
content = content.replace(importTarget, importReplacement);

// Just use regex to replace the hrefs
content = content.replace(/href="https:\/\/facebook\.com"/, 'href="https://www.facebook.com/share/1FadEdrneX/"');
content = content.replace(/href="https:\/\/x\.com"/, 'href="https://x.com/zentova_in"');
content = content.replace(/href="https:\/\/instagram\.com"/, 'href="https://www.instagram.com/medha_stone?igsi=MXZzaDFta2VwMTNqdQ=="');

// Add youtube icon right after the Instagram anchor closing tag
const instagramEnd = `</a>            </div>`;
const replaceEnd = `</a>              <a href="https://youtube.com/@medhastone?si=bqXCsWFRsJGFUP18" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors" aria-label="YouTube">                <Youtube className="w-5 h-5" />              </a>            </div>`;
content = content.replace(instagramEnd, replaceEnd);

fs.writeFileSync(file, content);
console.log("Success patching social links via regex");
