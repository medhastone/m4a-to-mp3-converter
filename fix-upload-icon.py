import re
with open("app/components/MetadataRemover.tsx", "r") as f:
    content = f.read()

# Replace the icon container classes to always be orange (primary) or at least group-hover orange
old_code = "bg-slate-800 text-slate-400"
new_code = "bg-primary/10 text-primary group-hover:bg-primary/20"

# Also add group class to the parent if not there
content = content.replace(
    "border-slate-700 hover:border-primary hover:bg-primary/5'}",
    "border-slate-700 hover:border-primary hover:bg-primary/5 group'}"
)
content = content.replace(old_code, new_code)

with open("app/components/MetadataRemover.tsx", "w") as f:
    f.write(content)
