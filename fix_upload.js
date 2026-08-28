const fs = require('fs');
let content = fs.readFileSync('app/components/MetadataViewer.tsx', 'utf8');

content = content.replace(
  "className={`w-full bg-surface-container/80 backdrop-blur-2xl rounded-2xl border ${!isScriptLoaded ? 'opacity-50 cursor-not-allowed' : isDragging ? 'border-primary bg-primary/5' : 'border-dashed border-outline-variant'} p-10 md:p-16 text-center transition-all flex flex-col items-center justify-center gap-4`}",
  "className={`w-full bg-surface-container/80 backdrop-blur-2xl rounded-2xl border-2 border-dashed ${!isScriptLoaded ? 'opacity-50 cursor-not-allowed border-outline-variant' : isDragging ? 'border-primary bg-primary/10 scale-[1.02]' : 'border-outline-variant hover:border-primary hover:bg-primary/5 hover:shadow-lg hover:shadow-primary/10'} p-10 md:p-16 text-center transition-all duration-300 flex flex-col items-center justify-center gap-4`}"
);

fs.writeFileSync('app/components/MetadataViewer.tsx', content);
