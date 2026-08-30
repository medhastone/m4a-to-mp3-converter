const fs = require('fs');
const path = 'app/components/WavToMp3Converter.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  /className=\{`relative border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 \$\{/,
  'className={`relative group border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 ${'
);

content = content.replace(
  /: 'border-slate-700 hover:border-slate-600 bg-slate-800\/20'/,
  ": 'border-slate-700 hover:border-indigo-500/50 hover:bg-slate-800/40'"
);

content = content.replace(
  /className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"/,
  'className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"'
);

content = content.replace(
  /className="mx-auto w-20 h-20 mb-6 bg-slate-800 rounded-full flex items-center justify-center shadow-lg border border-slate-700"/,
  'className="mx-auto w-20 h-20 mb-6 bg-slate-800 rounded-full flex items-center justify-center shadow-lg border border-slate-700 transition-all duration-300 group-hover:scale-110 group-hover:border-indigo-400/50 group-hover:shadow-indigo-500/20"'
);

content = content.replace(
  /<UploadCloud className="w-10 h-10 text-indigo-400" \/>/,
  '<UploadCloud className="w-10 h-10 text-indigo-400 transition-colors duration-300 group-hover:text-indigo-300" />'
);

content = content.replace(
  /<h3 className="text-xl font-semibold text-white mb-2">Drop your WAV files here<\/h3>/,
  '<h3 className="text-xl font-semibold text-white mb-2 transition-colors duration-300 group-hover:text-indigo-50">Drop your WAV files here</h3>'
);

content = content.replace(
  /<p className="text-slate-400 text-sm max-w-sm mx-auto">/,
  '<p className="text-slate-400 text-sm max-w-sm mx-auto transition-colors duration-300 group-hover:text-slate-300">'
);

fs.writeFileSync(path, content);
