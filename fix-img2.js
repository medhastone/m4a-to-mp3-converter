const fs = require('fs');
let content = fs.readFileSync('app/components/Footer.tsx', 'utf8');
content = content.replace(/src="`\$\{process\.env\.NEXT_PUBLIC_BASE_PATH \|\| ''\}\/qr-code\.png`"/, 'src={`\\${process.env.NEXT_PUBLIC_BASE_PATH || \'\'}/qr-code.png`}');
fs.writeFileSync('app/components/Footer.tsx', content);
