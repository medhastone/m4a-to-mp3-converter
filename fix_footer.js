const fs = require('fs');
let code = fs.readFileSync('app/components/Footer.tsx', 'utf8');

const anchor = '                  {t("batch_converter")}\n                </Link>\n              </li>';
const replacement = anchor + '\n              <li>\n                <Link\n                  href="/acx-checker"\n                  className="text-on-surface-variant hover:text-white transition-colors text-sm font-medium"\n                >\n                  ACX Audio Checker\n                </Link>\n              </li>';

if (code.includes(anchor)) {
    code = code.replace(anchor, replacement);
    fs.writeFileSync('app/components/Footer.tsx', code);
    console.log("Success");
} else {
    console.log("Failed to find anchor");
}
