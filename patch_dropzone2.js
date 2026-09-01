const fs = require('fs');
let content = fs.readFileSync('app/components/AcxChecker.tsx', 'utf8');

content = content.replace(
  "border-primary bg-primary/5 scale-[1.02]",
  "border-primary bg-primary/5 scale-[1.02] shadow-xl shadow-primary/30"
);

fs.writeFileSync('app/components/AcxChecker.tsx', content);
console.log('patched dropzone 2');
