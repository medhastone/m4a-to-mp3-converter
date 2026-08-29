with open("app/components/Header.tsx", "r") as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if 'border border-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-bold tracking-wider uppercase shadow-sm">' in line:
        # replace the weird duplication
        lines[i] = line.replace('"> border border-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-bold tracking-wider uppercase shadow-sm">', '">')

with open("app/components/Header.tsx", "w") as f:
    f.writelines(lines)
