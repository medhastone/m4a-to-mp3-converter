const fs = require('fs');
let code = fs.readFileSync('public/ffmpeg/ffmpeg.js', 'utf8');
code = code.replace('{type:"module"}', '{type:void 0}');
fs.writeFileSync('public/ffmpeg/ffmpeg.js', code);
