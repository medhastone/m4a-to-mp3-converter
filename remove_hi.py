import os
import glob
import re

files_to_check = glob.glob('app/[locale]/**/page.tsx', recursive=True) + ['app/[locale]/layout.tsx', 'app/[locale]/page.tsx']

for file in files_to_check:
    if not os.path.exists(file):
        continue
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
        
    content = content.replace("{ locale: 'hi' },\n    ", "")
    content = content.replace("'en', 'es', 'fr', 'hi', 'de', 'pt'", "'en', 'es', 'fr', 'de', 'pt'")
    content = content.replace("'hi': `${domain}/hi`,\n        ", "")
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

if os.path.exists('messages/hi.json'):
    os.remove('messages/hi.json')

print("Removed 'hi' locale successfully")
