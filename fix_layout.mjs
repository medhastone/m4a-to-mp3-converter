import fs from 'fs';
import path from 'path';

const pagesDir = 'app/[locale]';
const tools = [
  '320kbps', 'batch-converter', 'client-side-safe', 'iphone-voice-memos',
  'mac', 'windows', 'acx-checker', 'audio-metadata-remover', 'metadata-viewer',
  'mp3-to-m4a', 'video-to-mp3', 'wav-to-mp3'
];

for (const tool of tools) {
  const pagePath = path.join(pagesDir, tool, 'page.tsx');
  if (fs.existsSync(pagePath)) {
    let content = fs.readFileSync(pagePath, 'utf8');
    
    content = content.replace(
      /<div className="w-full flex flex-col gap-4">\s*<\/section>/g,
      '</section>\n      <div className="w-full flex flex-col gap-4">'
    );
    
    fs.writeFileSync(pagePath, content);
    console.log('Fixed', pagePath);
  }
}
