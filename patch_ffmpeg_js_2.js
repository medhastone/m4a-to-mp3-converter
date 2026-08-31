const fs = require('fs');
let code = fs.readFileSync('public/ffmpeg/ffmpeg.js', 'utf8');
code = code.replace('"file:///Users/focus/Projects/ffmpeg.wasm/packages/ffmpeg/dist/esm/classes.js"', 'e.b');
fs.writeFileSync('public/ffmpeg/ffmpeg.js', code);
