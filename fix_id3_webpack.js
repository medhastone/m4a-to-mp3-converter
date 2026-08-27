const fs = require('fs');
let code = fs.readFileSync('app/components/Converter.tsx', 'utf8');

code = code.replace(
  `const { ID3Writer } = await import('https://unpkg.com/browser-id3-writer@6.4.0/dist/browser-id3-writer.mjs');`,
  `const { ID3Writer } = await new Function("return import('https://unpkg.com/browser-id3-writer@6.4.0/dist/browser-id3-writer.mjs')")();`
);

fs.writeFileSync('app/components/Converter.tsx', code);
