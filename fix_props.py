import re

with open('app/components/Converter.tsx', 'r') as f:
    content = f.read()

content = content.replace('onClick={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()}', 'onClick={(e) => e.stopPropagation()}')

with open('app/components/Converter.tsx', 'w') as f:
    f.write(content)
