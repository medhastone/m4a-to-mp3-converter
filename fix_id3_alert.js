const fs = require('fs');
let code = fs.readFileSync('app/components/Converter.tsx', 'utf8');
code = code.replace(`console.error('ID3 Tagging failed:', e); alert('ID3 Error: ' + (e.message || String(e)));`, `console.error('ID3 Tagging failed:', e);`);
fs.writeFileSync('app/components/Converter.tsx', code);
