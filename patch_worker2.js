const fs = require('fs');
let code = fs.readFileSync('public/ffmpeg-worker.js', 'utf8');

code = code.replace(
  'const classWorkerURL = await toBlobURL(`${basePath}/814.ffmpeg.js?v=1788107467`, "application/javascript");',
  'const classWorkerURL = `${basePath}/814.ffmpeg.js?v=1788107467`;'
);
code = code.replace(
  'const coreURL = await toBlobURL(`${basePath}/ffmpeg/core/ffmpeg-core.js?v=1788107467`, \'application/javascript\');',
  'const coreURL = `${basePath}/ffmpeg/core/ffmpeg-core.js?v=1788107467`;'
);

fs.writeFileSync('public/ffmpeg-worker.js', code);
