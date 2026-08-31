const fs = require('fs');
let code = fs.readFileSync('app/components/VideoToMp3Converter.tsx', 'utf8');
code = code.replace(/ffmpeg-worker\.js\?v=\d+/, "ffmpeg-worker.js?v=" + Date.now());
fs.writeFileSync('app/components/VideoToMp3Converter.tsx', code);
