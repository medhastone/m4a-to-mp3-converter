import re
with open("app/components/MetadataRemover.tsx", "r") as f:
    content = f.read()

content = content.replace("border-slate-700 hover:border-slate-500 hover:bg-slate-800/40", "border-slate-700 hover:border-primary hover:bg-primary/5")

with open("app/components/MetadataRemover.tsx", "w") as f:
    f.write(content)
