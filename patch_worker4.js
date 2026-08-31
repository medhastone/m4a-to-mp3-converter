const fs = require('fs');
let code = fs.readFileSync('public/ffmpeg-worker.js', 'utf8');

const now = Date.now();
code = code.replace(/814\.ffmpeg\.js\?v=\d+/, "814.ffmpeg.js?v=" + now);
code = code.replace(/ffmpeg-core\.js\?v=\d+/, "ffmpeg-core.js?v=" + now);
code = code.replace(/ffmpeg-core\.wasm\?v=\d+/, "ffmpeg-core.wasm?v=" + now);
code = code.replace(/ffmpeg\.js\?v=\d+/, "ffmpeg.js?v=" + now);
code = code.replace(/index\.js\?v=\d+/, "index.js?v=" + now);

fs.writeFileSync('public/ffmpeg-worker.js', code);
