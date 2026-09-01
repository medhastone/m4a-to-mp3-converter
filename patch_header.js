const fs = require('fs');
let header = fs.readFileSync('app/components/Header.tsx', 'utf8');

if (!header.includes('ThemeToggle')) {
    header = header.replace("import LanguageSwitcher from './LanguageSwitcher';", "import LanguageSwitcher from './LanguageSwitcher';\nimport { ThemeToggle } from './ThemeToggle';");
    header = header.replace("<LanguageSwitcher />", "<ThemeToggle />\n            <LanguageSwitcher />");
    fs.writeFileSync('app/components/Header.tsx', header);
}
