import re

with open("app/components/Header.tsx", "r") as f:
    content = f.read()

target = """            <a 
              href="https://buymeacoffee.com/medhastone" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-bold tracking-wider uppercase shadow-sm hover:bg-amber-500/20 transition-colors"
            >
               ☕ Buy Me a Coffee
            </a>
"""

# The file might have different spaces or newlines, so let's use a regex or string replacement if it matches exactly.
# First, let's just try exact replacement, then fallback to regex.
if target in content:
    content = content.replace(target, "")
else:
    # Use regex to strip it out robustly
    content = re.sub(
        r'\s*<a\s+href="https://buymeacoffee\.com/medhastone".*?>\s*☕ Buy Me a Coffee\s*</a>',
        '',
        content,
        flags=re.DOTALL
    )

with open("app/components/Header.tsx", "w") as f:
    f.write(content)
