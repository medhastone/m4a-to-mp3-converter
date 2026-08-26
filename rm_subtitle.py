import os
import glob

def remove_subtitle(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Removing from Converter.tsx
    if 'Converter.tsx' in filepath:
        import re
        content = re.sub(r'\s*\{/\* Privacy & Security Badge Banner \*/\}.*?</p>\s*</div>', '', content, flags=re.DOTALL)
        
    # Removing from page.tsx (all variations)
    if 'page.tsx' in filepath:
        import re
        content = re.sub(r'\s*<div className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-4 mt-2">\s*<ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-amber-400 flex-shrink-0 mt-0\.5" />\s*<p className="text-xs md:text-sm text-on-surface-variant font-medium leading-relaxed">\s*<strong className="text-white">100% Private & Client-Side:</strong> Your files are transcoded locally using Web Audio API\. No uploads, no servers, and 100% offline-safe\.\s*</p>\s*</div>', '', content, flags=re.DOTALL)
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

# Apply to Converter.tsx
remove_subtitle('app/components/Converter.tsx')

# Apply to all page.tsx
remove_subtitle('app/page.tsx')
for p in glob.glob('app/*/page.tsx'):
    remove_subtitle(p)

