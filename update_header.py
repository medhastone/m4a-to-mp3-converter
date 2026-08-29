import re

with open("app/components/Header.tsx", "r") as f:
    content = f.read()

cta = """
          <div className="flex items-center gap-4">
            <a 
              href="https://buymeacoffee.com/medhastone" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-bold tracking-wider uppercase shadow-sm hover:bg-amber-500/20 transition-colors"
            >
               ☕ Buy Me a Coffee
            </a>
            <div className="hidden md:flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-bold tracking-wider uppercase shadow-sm">
"""

content = content.replace(
    '<div className="flex items-center gap-4">\n            <div className="hidden md:flex items-center gap-1.5 bg-emerald-500/10',
    cta
)

with open("app/components/Header.tsx", "w") as f:
    f.write(content)
