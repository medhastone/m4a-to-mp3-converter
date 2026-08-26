import re

with open('app/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add import
import_stmt = "import LanguageSwitcher from './components/LanguageSwitcher';\n"
if "import LanguageSwitcher" not in content:
    content = content.replace("import MobileMenu from './components/MobileMenu';", "import MobileMenu from './components/MobileMenu';\n" + import_stmt)

# Add to header
# We look for <MobileMenu /> and insert it before that.
if "<LanguageSwitcher />" not in content:
    content = content.replace("<MobileMenu />", "<LanguageSwitcher />\n            <MobileMenu />")

with open('app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
