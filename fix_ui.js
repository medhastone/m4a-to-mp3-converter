const fs = require('fs');
const file = 'app/components/VideoToMp3Converter.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  /<span dangerouslySetInnerHTML={{ __html: t\('title'\) }} \/>/g,
  `{t.rich('title', { highlight: (chunks) => <span className="text-orange-500">{chunks}</span> })}`
);

fs.writeFileSync(file, content);
