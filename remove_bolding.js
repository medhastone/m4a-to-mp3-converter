const fs = require('fs');
const path = 'app/components/WavToMp3SEO.tsx';
let content = fs.readFileSync(path, 'utf8');

const keywords = [
  "wav to mp3 converter without uploading",
  "convert large wav to mp3 online",
  "convert wav to mp3 locally in browser no server upload",
  "fastest wav to mp3 converter online",
  "lossless quality wav to mp3 converter free no limit",
  "best free wav to mp3 converter online 320kbps high quality",
  "convert 24 bit wav to mp3 online",
  "wav to mp3 no file size limit free",
  "batch convert 24-bit 96khz wav to 320kbps mp3 online",
  "batch wav to mp3 converter online",
  "convert wav to mp3 in browser free",
  "how to convert large wav files to mp3 online without error",
  "wav to mp3 320kbps online free"
];

keywords.forEach(kw => {
  // Replace exactly <strong>keyword</strong> with just keyword
  content = content.replace(new RegExp(`<strong>${kw}<\/strong>`, 'g'), kw);
});

fs.writeFileSync(path, content);
