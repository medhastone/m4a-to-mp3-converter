import glob
import re

for filepath in glob.glob('public/*.html'):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Avoid duplicating if already present
    if '<link rel="icon"' not in content:
        # Inject right before <title>
        favicon_tag = '    <link rel="icon" type="image/svg+xml" href="/icon.svg">\n'
        content = re.sub(r'(<title>)', favicon_tag + r'\1', content)

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

