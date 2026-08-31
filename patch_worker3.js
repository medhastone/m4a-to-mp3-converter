const fs = require('fs');
let code = fs.readFileSync('public/ffmpeg-worker.js', 'utf8');

code = code.replace(
  "basePath = location.pathname.split('/').slice(0, location.pathname.split('/').indexOf('ffmpeg-worker.js')).join('/');",
  "basePath = self.location.origin + location.pathname.split('/').slice(0, location.pathname.split('/').indexOf('ffmpeg-worker.js')).join('/');"
);

fs.writeFileSync('public/ffmpeg-worker.js', code);
