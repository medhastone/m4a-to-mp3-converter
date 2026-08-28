const fs = require('fs');

// 1. Update Header.tsx
let header = fs.readFileSync('app/components/Header.tsx', 'utf8');
const headerLink = `
                <Link href="/metadata-viewer" className="px-4 py-2 text-sm text-on-surface-variant hover:text-primary hover:bg-surface-dim transition-colors flex items-center gap-2">
                  <span className="text-lg">🏷️</span> {t('metadata_viewer')}
                </Link>
`;
if (!header.includes('/metadata-viewer')) {
  header = header.replace(
    `                <Link href="/client-side-safe"`,
    headerLink + `                <Link href="/client-side-safe"`
  );
  fs.writeFileSync('app/components/Header.tsx', header);
}

// 2. Update Footer.tsx
let footer = fs.readFileSync('app/components/Footer.tsx', 'utf8');
const footerLink = `
              <li><Link href="/metadata-viewer" className="hover:text-primary transition-colors">{t('metadata_viewer')}</Link></li>
`;
if (!footer.includes('/metadata-viewer')) {
  footer = footer.replace(
    `              <li><Link href="/iphone-voice-memos"`,
    footerLink + `              <li><Link href="/iphone-voice-memos"`
  );
  fs.writeFileSync('app/components/Footer.tsx', footer);
}

// 3. Update MobileMenu.tsx
let mobile = fs.readFileSync('app/components/MobileMenu.tsx', 'utf8');
const mobileLink = `
              <Link href="/metadata-viewer" onClick={() => setIsOpen(false)} className="block py-2 text-on-surface-variant hover:text-primary transition-colors font-medium">
                🏷️ {t('metadata_viewer')}
              </Link>
`;
if (!mobile.includes('/metadata-viewer')) {
  mobile = mobile.replace(
    `              <Link href="/batch-converter"`,
    mobileLink + `              <Link href="/batch-converter"`
  );
  fs.writeFileSync('app/components/MobileMenu.tsx', mobile);
}
