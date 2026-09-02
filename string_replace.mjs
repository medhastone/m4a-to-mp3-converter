import fs from 'fs';

const tools = [
  '320kbps', 'batch-converter', 'client-side-safe', 'iphone-voice-memos',
  'mac', 'windows', 'acx-checker', 'audio-metadata-remover', 'metadata-viewer',
  'mp3-to-m4a', 'video-to-mp3', 'wav-to-mp3'
];

for (const tool of tools) {
  const p = `app/[locale]/${tool}/page.tsx`;
  if (fs.existsSync(p)) {
    let c = fs.readFileSync(p, 'utf8');
    c = c.replace(/<div className="w-full flex flex-col gap-4"><\/section>/, '</section>\n            <div className="w-full flex flex-col gap-4">');
    fs.writeFileSync(p, c);
  }
}
