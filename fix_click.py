import re

with open('app/components/Converter.tsx', 'r') as f:
    content = f.read()

content = content.replace('onClick={() => fileInputRef.current?.click()}', 'onClick={(e) => { if (e.target !== fileInputRef.current) fileInputRef.current?.click(); }}')

with open('app/components/Converter.tsx', 'w') as f:
    f.write(content)
