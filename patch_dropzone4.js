const fs = require('fs');
let content = fs.readFileSync('app/components/AcxChecker.tsx', 'utf8');

content = content.replace(
  "border-primary bg-primary/5 scale-[1.02] shadow-xl shadow-primary/30",
  "border-slate-500 bg-slate-800/50 scale-[1.02] shadow-xl"
);

fs.writeFileSync('app/components/AcxChecker.tsx', content);
console.log('patched dropzone 4');
