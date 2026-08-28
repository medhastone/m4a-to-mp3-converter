const fs = require('fs');
let content = fs.readFileSync('app/[locale]/metadata-viewer/page.tsx', 'utf8');

content = content.replace(
  "title: 'Free Audio Metadata & Stream Inspector Online – Check Codec, Bitrate & ID3 Tags',",
  "title: 'Free Audio Metadata Viewer Online - Codec & Stream Inspector',"
);

content = content.replace(
  "Free Audio Metadata & Stream Inspector Online – Check Codec, Bitrate & ID3 Tags\n          </h1>",
  "Free Audio Metadata Viewer & Stream Inspector\n          </h1>"
);

fs.writeFileSync('app/[locale]/metadata-viewer/page.tsx', content);
