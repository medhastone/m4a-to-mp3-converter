const fs = require('fs');

let worker = fs.readFileSync('public/ffmpeg-worker.js', 'utf8');
worker = worker.replace(/\?v=\d+/g, '?v=1.0.1');
fs.writeFileSync('public/ffmpeg-worker.js', worker);

let component = fs.readFileSync('app/components/VideoToMp3Converter.tsx', 'utf8');
component = component.replace(/\?v=\d+/g, '?v=1.0.1');
fs.writeFileSync('app/components/VideoToMp3Converter.tsx', component);

