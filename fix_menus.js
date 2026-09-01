const fs = require('fs');

// Fix Header.tsx
let header = fs.readFileSync('app/components/Header.tsx', 'utf8');
if (!header.includes('acx-checker')) {
  header = header.replace(
    `<Link href="/client-side-safe" className="px-4 py-2 text-sm text-on-surface-variant hover:text-primary hover:bg-surface-dim transition-colors flex items-center gap-2">
                  <span className="text-lg">🔒</span> {t('client_side_safe')}
                </Link>`,
    `<Link href="/client-side-safe" className="px-4 py-2 text-sm text-on-surface-variant hover:text-primary hover:bg-surface-dim transition-colors flex items-center gap-2">
                  <span className="text-lg">🔒</span> {t('client_side_safe')}
                </Link>
                <Link href="/acx-checker" className="px-4 py-2 text-sm text-on-surface-variant hover:text-primary hover:bg-surface-dim transition-colors flex items-center gap-2">
                  <span className="text-lg">🎙️</span> ACX Audio Checker
                </Link>`
  );
}
if (!header.includes('☕ Support Us')) {
  header = header.replace(
    '<LanguageSwitcher />',
    '<LanguageSwitcher />\n            <a href="https://buymeacoffee.com/medhastone" target="_blank" rel="noopener noreferrer" className="hidden lg:flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-500 hover:bg-amber-500/20 transition-colors px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-bold tracking-wider uppercase shadow-sm">☕ Support Us</a>'
  );
}
fs.writeFileSync('app/components/Header.tsx', header);

// Fix MobileMenu.tsx
let mobile = fs.readFileSync('app/components/MobileMenu.tsx', 'utf8');
if (!mobile.includes('acx-checker')) {
  mobile = mobile.replace(
    `<Link onClick={() => setIsOpen(false)} href="/client-side-safe" className="py-3 text-sm text-on-surface-variant hover:text-primary flex items-center gap-3">
                  <span className="text-lg">🔒</span> {t('client_side_safe')}
                </Link>`,
    `<Link onClick={() => setIsOpen(false)} href="/client-side-safe" className="py-3 text-sm text-on-surface-variant hover:text-primary flex items-center gap-3">
                  <span className="text-lg">🔒</span> {t('client_side_safe')}
                </Link>
                <Link onClick={() => setIsOpen(false)} href="/acx-checker" className="py-3 text-sm text-on-surface-variant hover:text-primary flex items-center gap-3">
                  <span className="text-lg">🎙️</span> ACX Audio Checker
                </Link>`
  );
}
fs.writeFileSync('app/components/MobileMenu.tsx', mobile);

// Fix Footer.tsx
let footer = fs.readFileSync('app/components/Footer.tsx', 'utf8');
if (!footer.includes('acx-checker')) {
  footer = footer.replace(
    `              <li>
                <Link
                  href="/batch-converter"
                  className="text-on-surface-variant hover:text-white transition-colors text-sm font-medium"
                >
                  {t("batch_converter")}
                </Link>
              </li>`,
    `              <li>
                <Link
                  href="/batch-converter"
                  className="text-on-surface-variant hover:text-white transition-colors text-sm font-medium"
                >
                  {t("batch_converter")}
                </Link>
              </li>
              <li>
                <Link
                  href="/acx-checker"
                  className="text-on-surface-variant hover:text-white transition-colors text-sm font-medium"
                >
                  ACX Audio Checker
                </Link>
              </li>`
  );
}
fs.writeFileSync('app/components/Footer.tsx', footer);

console.log('Fixed menus');
