const fs = require('fs');
const file = 'app/components/Footer.tsx';
let content = fs.readFileSync(file, 'utf8');

const targetGridStart = '<div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">';
const replacement = `<div className="flex flex-col xl:flex-row gap-12 mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-1">`;

content = content.replace(targetGridStart, replacement);

const targetGridEnd = `              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10`;

const replacementEnd = `              </li>
            </ul>
          </div>
        </div>
        
        <div className="w-full xl:w-72 shrink-0 flex flex-col items-center xl:items-start">
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 flex flex-col items-center text-center w-full max-w-sm">
            <h3 className="font-bold text-white mb-2">Support This Free Tool</h3>
            <p className="text-slate-400 text-xs mb-4 leading-relaxed">
              Scan with any payment app or camera to buy a coffee ☕
            </p>
            <div className="bg-white p-2 rounded-lg mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/bmc-qr.png" alt="Buy Me a Coffee QR Code" className="w-[130px] h-[130px] object-cover" />
            </div>
            <a 
              href="https://buymeacoffee.com/medhastone" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 transition-colors text-sm font-semibold flex items-center gap-1"
            >
              Or open direct link <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
      
      <div className="border-t border-white/10`;

content = content.replace(targetGridEnd, replacementEnd);

fs.writeFileSync(file, content);
console.log("Success patching QR code into footer");
