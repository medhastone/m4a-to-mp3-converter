const fs = require('fs');
let content = fs.readFileSync('app/components/AcxChecker.tsx', 'utf8');

const oldStr = `className={\`w-full aspect-[21/9] min-h-[300px] border-2 border-dashed rounded-3xl flex flex-col items-center justify-center p-8 transition-all duration-300 cursor-pointer 
            \${isDragging ? 'border-primary bg-primary/10 scale-[1.02] shadow-xl shadow-primary/20' : 'border-slate-700 bg-slate-900/50 hover:bg-slate-800 hover:border-primary group'}\`}`;

const newStr = `className={\`group w-full aspect-[21/9] min-h-[300px] border-2 border-dashed rounded-3xl flex flex-col items-center justify-center p-8 transition-all duration-300 cursor-pointer 
            \${isDragging ? 'border-orange-500 bg-orange-500/10 scale-[1.02] shadow-xl shadow-orange-500/20' : 'border-slate-700 bg-slate-900/50 hover:bg-slate-800 hover:border-orange-500'}\`}`;

content = content.replace(oldStr, newStr);

const oldIcon = `className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300"`;
const newIcon = `className="w-20 h-20 bg-orange-500/10 rounded-full flex items-center justify-center mb-6 text-orange-500 group-hover:scale-110 group-hover:bg-orange-500/20 transition-all duration-300"`;

content = content.replace(oldIcon, newIcon);

fs.writeFileSync('app/components/AcxChecker.tsx', content);
console.log('patched final');
