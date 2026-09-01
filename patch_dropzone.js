const fs = require('fs');
let content = fs.readFileSync('app/components/AcxChecker.tsx', 'utf8');

content = content.replace(
  "border-slate-500 bg-slate-800/50 scale-[1.02] shadow-xl",
  "border-primary bg-primary/10 scale-[1.02] shadow-xl shadow-primary/20"
);

content = content.replace(
  "border-slate-700 bg-slate-900/50 hover:bg-slate-800 hover:border-slate-600",
  "border-slate-700 bg-slate-900/50 hover:bg-slate-800 hover:border-primary group"
);

content = content.replace(
  "bg-slate-800 rounded-full flex items-center justify-center mb-6 text-slate-400 group-hover:scale-110 transition-transform",
  "bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300"
);

fs.writeFileSync('app/components/AcxChecker.tsx', content);
console.log('patched dropzone!');
