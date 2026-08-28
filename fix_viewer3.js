const fs = require('fs');
let content = fs.readFileSync('app/components/MetadataViewer.tsx', 'utf8');

content = content.replace(
  "isDragging ? 'border-primary bg-primary/5 scale-[1.02]' : 'border-white/10 hover:border-primary hover:bg-primary/5 hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] transition-all'",
  "isDragging ? 'border-primary bg-primary/5 scale-[1.02] ring-4 ring-primary/20' : 'border-white/20 hover:border-primary hover:bg-primary/5 hover:ring-4 hover:ring-primary/20 transition-all'"
);

fs.writeFileSync('app/components/MetadataViewer.tsx', content);
