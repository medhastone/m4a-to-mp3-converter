const fs = require('fs');
let content = fs.readFileSync('public/ffmpeg-worker.js', 'utf8');
content = content.replace(/err\.message/g, "err.message || String(err)");
fs.writeFileSync('public/ffmpeg-worker.js', content);
