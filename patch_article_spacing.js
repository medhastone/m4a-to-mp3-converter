const fs = require('fs');

let content = fs.readFileSync('app/components/AcxCheckerArticle.tsx', 'utf8');

// Add explicit spacing utility
content = content.replace(
  '<div className="prose prose-slate prose-invert max-w-none lg:prose-lg mx-auto">',
  '<div className="prose prose-slate prose-invert max-w-none lg:prose-lg mx-auto space-y-6">'
);

fs.writeFileSync('app/components/AcxCheckerArticle.tsx', content);
console.log('patched article spacing');
