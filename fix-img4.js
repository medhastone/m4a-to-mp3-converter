const fs = require('fs');
let content = fs.readFileSync('app/components/Footer.tsx', 'utf8');
content = content.replace(/<img[^>]*qr-code\.png[^>]*>/, '<img src={`\\${process.env.NEXT_PUBLIC_BASE_PATH || \'\'}/qr-code.png`} alt="Buy Me a Coffee QR Code" className="w-full h-auto aspect-square object-contain max-w-[240px]" />');
fs.writeFileSync('app/components/Footer.tsx', content);
