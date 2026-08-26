import re

with open('app/[locale]/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove imports
content = re.sub(r"import LanguageSwitcher from '\.\./components/LanguageSwitcher';\n", "", content)
content = re.sub(r"import MobileMenu from '\.\./components/MobileMenu';\n", "", content)

# Header starts at <header ...> and ends at </header>
content = re.sub(r'<header.*?</header>', '', content, flags=re.DOTALL)

# Footer starts at <footer ...> and ends at </footer>
content = re.sub(r'<footer.*?</footer>', '', content, flags=re.DOTALL)

with open('app/[locale]/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
    print("Stripped header and footer from page.tsx")
