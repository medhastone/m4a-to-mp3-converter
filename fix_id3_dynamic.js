const fs = require('fs');
let code = fs.readFileSync('app/components/Converter.tsx', 'utf8');

// 1. Remove the static import
code = code.replace(/import\s+\{\s*ID3Writer\s*\}\s+from\s+'browser-id3-writer';\s*/g, '');

// 2. Change handleDownload to async and use dynamic import
code = code.replace(
  `const handleDownload = () => {`,
  `const handleDownload = async () => {`
);

code = code.replace(
  `const writer = new ID3Writer(bufferCopy);`,
  `const { ID3Writer } = await import('https://unpkg.com/browser-id3-writer@6.4.0/dist/browser-id3-writer.mjs');\n      const writer = new ID3Writer(bufferCopy);`
);

// If bufferCopy wasn't there (just in case), replace the original too
code = code.replace(
  `const writer = new ID3Writer(rawMp3Buffer);`,
  `const { ID3Writer } = await import('https://unpkg.com/browser-id3-writer@6.4.0/dist/browser-id3-writer.mjs');\n      const writer = new ID3Writer(rawMp3Buffer);`
);

fs.writeFileSync('app/components/Converter.tsx', code);
