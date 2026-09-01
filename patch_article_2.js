const fs = require('fs');
let content = fs.readFileSync('app/components/AcxCheckerArticle.tsx', 'utf8');

content = content.replace(/\(\$-\\infty\\text\{ dB\}\$\)/, '(-∞ dB)');
content = content.replace(/\\text\{max sample\}/, 'max sample');
content = content.replace(/\$20 \\log_\{10\}\(max sample\)\$/, '20 log10(max sample)');

fs.writeFileSync('app/components/AcxCheckerArticle.tsx', content);
console.log('patched');
