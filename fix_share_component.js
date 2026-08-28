const fs = require('fs');
let content = fs.readFileSync('app/components/MetadataViewer.tsx', 'utf-8');

content = content.replace(
  "<{t('mv_share')}2 className=\"w-4 h-4\" />",
  "<Share2 className=\"w-4 h-4\" />"
);

fs.writeFileSync('app/components/MetadataViewer.tsx', content);
