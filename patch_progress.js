const fs = require('fs');
const file = 'app/components/Converter.tsx';
let content = fs.readFileSync(file, 'utf8');

const target = "ffmpeg.on('progress', ({ progress }) => {";
const replace = "ffmpeg.on('progress', ({ progress }: any) => {";

if (content.includes(target)) {
  content = content.replace(target, replace);
  fs.writeFileSync(file, content);
  console.log("Success patching progress type");
} else {
  console.log("Target not found!");
}
