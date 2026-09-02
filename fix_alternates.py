import os
import glob
import re

for root, _, files in os.walk('app'):
    for file in files:
        if file in ['page.tsx', 'layout.tsx']:
            filepath = os.path.join(root, file)
            with open(filepath, 'r') as f:
                content = f.read()
            
            # Find the languages block
            if 'languages: {' in content:
                # Replace the messy lines
                content = re.sub(r"'pt': `/pt`,\n\s*'ru': `/ru`,\n\s*'ru': `\$\{domain\}/ru\$\{path\}`", r"'pt': `${domain}/pt${path}`,\n        'ru': `${domain}/ru${path}`", content)
                # For layout.tsx where path doesn't exist
                content = re.sub(r"'pt': \`\$\{domain\}/pt\`,\n\s*'ru': \`\$\{domain\}/ru\`,\n\s*'ru': \`\$\{domain\}/ru\`", r"'pt': `${domain}/pt`,\n        'ru': `${domain}/ru`", content)
                
                with open(filepath, 'w') as f:
                    f.write(content)
