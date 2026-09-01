const fs = require('fs');

let content = fs.readFileSync('app/[locale]/layout.tsx', 'utf8');

content = content.replace("import { routing } from '../../src/i18n/routing';", "import { routing } from '../../src/i18n/routing';\nimport { ThemeProvider } from '../components/ThemeProvider';");
content = content.replace("<NextIntlClientProvider messages={messages}>", "<NextIntlClientProvider messages={messages}>\n          <ThemeProvider attribute=\"class\" defaultTheme=\"system\" enableSystem>\n");
content = content.replace("</NextIntlClientProvider>", "          </ThemeProvider>\n        </NextIntlClientProvider>");

// add suppressHydrationWarning to html tag
content = content.replace('<html lang={locale} className={`${inter.variable} ${jbMono.variable}`}>', '<html lang={locale} className={`${inter.variable} ${jbMono.variable}`} suppressHydrationWarning>');

fs.writeFileSync('app/[locale]/layout.tsx', content);
