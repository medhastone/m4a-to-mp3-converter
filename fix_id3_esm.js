const fs = require('fs');
let code = fs.readFileSync('app/components/Converter.tsx', 'utf8');
code = code.replace(`const ID3Writer = require('browser-id3-writer').ID3Writer || require('browser-id3-writer').default || require('browser-id3-writer');`, `import { ID3Writer } from 'browser-id3-writer';`);
fs.writeFileSync('app/components/Converter.tsx', code);
