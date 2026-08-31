const fs = require('fs');
let code = fs.readFileSync('public/814.ffmpeg.js', 'utf8');
code = code.replace('try{o||(o=e),importScripts(o)}catch{', 'try{o||(o=e),importScripts(o)}catch(err){console.error("importScripts error:", err);');
fs.writeFileSync('public/814.ffmpeg.js', code);
