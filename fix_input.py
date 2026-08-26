import re

with open('app/components/Converter.tsx', 'r') as f:
    content = f.read()

content = content.replace('onClick={(e) => { if (e.target !== fileInputRef.current) fileInputRef.current?.click(); }}', 'onClick={() => fileInputRef.current?.click()}')
content = content.replace('onChange={(e) => e.target.files && handleFile(e.target.files[0])}', 'onChange={(e) => e.target.files && handleFile(e.target.files[0])} onClick={(e) => e.stopPropagation()}')

with open('app/components/Converter.tsx', 'w') as f:
    f.write(content)
