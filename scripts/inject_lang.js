const fs = require('fs');
const path = require('path');

const pages = [
  'iphone-voice-memos.html',
  'windows.html',
  'mac.html',
  '320kbps.html',
  'batch-converter.html',
  'client-side-safe.html'
];

const langSwitcherHTML = `
        <div class="relative group z-50 ml-2" id="langSwitcher">
            <button onclick="document.getElementById('langMenu').classList.toggle('hidden')" onblur="setTimeout(() => { const el = document.getElementById('langMenu'); if(el) el.classList.add('hidden') }, 200)" class="text-slate-300 hover:text-white transition-colors font-medium text-sm flex items-center gap-1 bg-slate-800/50 border border-slate-700/50 px-3 py-1.5 rounded-full shadow-sm">
                <i data-lucide="globe" class="w-4 h-4"></i>
                <span class="hidden sm:inline-block uppercase">EN</span>
                <i data-lucide="chevron-down" class="w-3 h-3"></i>
            </button>
            <div id="langMenu" class="hidden absolute top-full right-0 mt-2 w-36 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl transition-all duration-200 flex flex-col py-2 z-[60]">
                <a href="/" class="px-4 py-2 text-sm text-emerald-400 font-medium bg-slate-800/50 flex items-center gap-2">English</a>
                <a href="/ja" class="px-4 py-2 text-sm text-slate-300 hover:text-emerald-400 hover:bg-slate-800/50 transition-colors flex items-center gap-2">日本語</a>
                <a href="/es" class="px-4 py-2 text-sm text-slate-300 hover:text-emerald-400 hover:bg-slate-800/50 transition-colors flex items-center gap-2">Español</a>
                <a href="/de" class="px-4 py-2 text-sm text-slate-300 hover:text-emerald-400 hover:bg-slate-800/50 transition-colors flex items-center gap-2">Deutsch</a>
                <a href="/pt" class="px-4 py-2 text-sm text-slate-300 hover:text-emerald-400 hover:bg-slate-800/50 transition-colors flex items-center gap-2">Português</a>
                <a href="/fr" class="px-4 py-2 text-sm text-slate-300 hover:text-emerald-400 hover:bg-slate-800/50 transition-colors flex items-center gap-2">Français</a>
            </div>
        </div>
`;

pages.forEach(page => {
  const filePath = path.join(__dirname, '../public', page);
  if (!fs.existsSync(filePath)) {
    console.log(`Skipping ${page} - not found`);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  
  // To safely wrap the last div before </header>, let's find the closing </header>
  // Then we can find the </div> that precedes it.
  
  if (content.includes('id="langSwitcher"')) {
      console.log(`Already injected in ${page}`);
      return;
  }

  // We find <header class="..."> ... </header>
  // A regex replacement.
  const headerEndRegex = /(<div class="flex items-center gap-2[^>]*>[\s\S]*?<\/div>)\s*<\/header>/i;
  
  if (headerEndRegex.test(content)) {
     content = content.replace(headerEndRegex, (match, badgeDiv) => {
         return `<div class="flex items-center gap-2">\n${badgeDiv}\n${langSwitcherHTML}\n</div>\n    </header>`;
     });
     fs.writeFileSync(filePath, content);
     console.log(`Injected in ${page}`);
  } else {
     console.log(`Regex failed for ${page}`);
  }
});
