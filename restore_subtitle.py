import os
import glob

snippet = """             <div className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-4 mt-2">
               <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-amber-400 flex-shrink-0 mt-0.5" />
               <p className="text-xs md:text-sm text-on-surface-variant font-medium leading-relaxed">
                 <strong className="text-white">100% Private & Client-Side:</strong> Your files are transcoded locally using Web Audio API. No uploads, no servers, and 100% offline-safe.
               </p>
             </div>"""

def restore_in_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if '<Converter />' in content and '100% Private & Client-Side:' not in content:
        content = content.replace('<Converter />', f"<Converter />\n{snippet}")
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

restore_in_file('app/page.tsx')
for p in glob.glob('app/*/page.tsx'):
    restore_in_file(p)

