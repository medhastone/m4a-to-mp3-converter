const fs = require('fs');

let content = fs.readFileSync('app/components/AcxCheckerArticle.tsx', 'utf8');

// Fix the LaTeX block that's breaking JSX parsing
content = content.replace(
  /\$20 \\log_\{10\}\(\\text\{max sample\}\)\$/,
  '20 log10(max sample)'
);
content = content.replace(
  /\{-\\\\infty\\\\text\{ dB\}\}/,
  '-∞ dB'
);

fs.writeFileSync('app/components/AcxCheckerArticle.tsx', content);
console.log('patched');
