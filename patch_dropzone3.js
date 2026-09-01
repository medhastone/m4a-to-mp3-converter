const fs = require('fs');
let content = fs.readFileSync('app/components/AcxChecker.tsx', 'utf8');

content = content.replace(
  "border-slate-700 bg-slate-900/50 hover:bg-slate-800 hover:border-primary hover:shadow-lg hover:shadow-primary/20",
  "border-slate-700 bg-slate-900/50 hover:bg-slate-800 hover:border-slate-600"
);

fs.writeFileSync('app/components/AcxChecker.tsx', content);
console.log('patched dropzone 3');
