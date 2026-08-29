with open("app/components/Header.tsx", "r") as f:
    text = f.read()

import re
text = re.sub(
    r'<div className="hidden md:flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded-full text-\[10px\] sm:text-xs font-bold tracking-wider uppercase shadow-sm"> border border-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded-full text-\[10px\] sm:text-xs font-bold tracking-wider uppercase shadow-sm">',
    '<div className="hidden md:flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-bold tracking-wider uppercase shadow-sm">',
    text
)

with open("app/components/Header.tsx", "w") as f:
    f.write(text)
