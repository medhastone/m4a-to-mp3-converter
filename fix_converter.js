const fs = require('fs');
let code = fs.readFileSync('app/components/Converter.tsx', 'utf8');

// 1. Fix the accept attribute
code = code.replace(
  `accept=".m4a,audio/mp4"`,
  `accept=".m4a,audio/mp4,audio/x-m4a,audio/*"`
);

// 2. Fix the ID3 saving logic: clone the ArrayBuffer and log strictly
code = code.replace(
  `const writer = new ID3Writer(rawMp3Buffer);`,
  `const bufferCopy = rawMp3Buffer.slice(0);\n      const writer = new ID3Writer(bufferCopy);`
);

fs.writeFileSync('app/components/Converter.tsx', code);
