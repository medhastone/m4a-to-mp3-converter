import re
import json

with open('app/components/WavToMp3SEO.tsx', 'r') as f:
    content = f.read()

# Add useTranslations import
if 'useTranslations' not in content:
    content = content.replace("import {", "import { useTranslations } from 'next-intl';\nimport {", 1)
    content = content.replace("export default function WavToMp3SEO() {", "export default function WavToMp3SEO() {\n  const t = useTranslations('wav_to_mp3_seo');")

# We will use regex to find text nodes. A simple heuristic:
# >Text Text< 
# We'll find all strings between > and < that contain word characters.

en_keys = {}
counter = 1

def repl(match):
    global counter
    text = match.group(1).strip()
    if re.search(r'[a-zA-Z]', text) and '{' not in text:
        key = f"seo_text_{counter}"
        en_keys[key] = text
        counter += 1
        return f">{'{'}t('{key}'){'}'}<"
    return match.group(0)

# Replace in single line elements
content = re.sub(r'>([^<>{]+)<', repl, content)

with open('app/components/WavToMp3SEO.tsx', 'w') as f:
    f.write(content)

# Update en.json
with open('messages/en.json', 'r') as f:
    en = json.load(f)

en['wav_to_mp3_seo'] = en_keys

with open('messages/en.json', 'w') as f:
    json.dump(en, f, indent=2)

print("Done")
