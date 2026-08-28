const fs = require('fs');
let content = fs.readFileSync('app/components/Footer.tsx', 'utf8');

const oldCard = `<div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 flex flex-col items-center text-center w-full max-w-sm">
            <h3 className="font-bold text-white mb-2">Support This Free Tool</h3>
            <p className="text-slate-400 text-xs mb-4 leading-relaxed">
              Scan with any payment app or camera to buy a coffee ☕
            </p>
            <div className="bg-white p-3 rounded-xl mb-4 w-full flex justify-center max-w-[240px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={\`\${process.env.NEXT_PUBLIC_BASE_PATH || ''}/qr-code.png\`} alt="Buy Me a Coffee QR Code" className="w-full h-auto aspect-square object-contain max-w-[240px]" />
            </div>
            <a 
              href="https://buymeacoffee.com/medhastone" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 transition-colors text-sm font-semibold flex items-center gap-1"
            >
              Or open direct link <span aria-hidden="true">&rarr;</span>
            </a>
          </div>`;

const newCard = `<div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 flex flex-col items-center text-center w-full max-w-[260px]">
            <h3 className="font-bold text-white mb-1.5 text-sm">Support This Free Tool</h3>
            <p className="text-slate-400 text-xs mb-3 leading-snug">
              Scan with any payment app or camera to buy a coffee ☕
            </p>
            <div className="bg-white p-2 rounded-xl mb-3 w-full flex justify-center max-w-[120px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={\`\${process.env.NEXT_PUBLIC_BASE_PATH || ''}/qr-code.png\`} alt="Buy Me a Coffee QR Code" className="w-full h-auto aspect-square object-contain" />
            </div>
            <a 
              href="https://buymeacoffee.com/medhastone" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 transition-colors text-xs font-semibold flex items-center gap-1"
            >
              Or open direct link <span aria-hidden="true">&rarr;</span>
            </a>
          </div>`;

if (content.includes('bg-slate-900/50 border border-slate-800 rounded-2xl p-6')) {
    content = content.replace(/<div className="bg-slate-900\/50 border border-slate-800 rounded-2xl p-6 flex flex-col items-center text-center w-full max-w-sm">[\s\S]*?<\/div>/, newCard);
    fs.writeFileSync('app/components/Footer.tsx', content);
    console.log("Replaced");
} else {
    console.log("Could not find the card to replace.");
}
