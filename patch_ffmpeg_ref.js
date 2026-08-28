const fs = require('fs');
const file = 'app/components/Converter.tsx';
let content = fs.readFileSync(file, 'utf8');

const target1 = "const ffmpegRef = useRef(new FFmpeg());";
const replace1 = "const ffmpegRef = useRef<any>(null);";

const target2 = "const ffmpeg = ffmpegRef.current;";
const replace2 = `      if (!ffmpegRef.current) {
        ffmpegRef.current = new FFmpeg();
      }
      const ffmpeg = ffmpegRef.current;`;

if (content.includes(target1) && content.includes(target2)) {
  content = content.replace(target1, replace1);
  content = content.replace(target2, replace2);
  fs.writeFileSync(file, content);
  console.log("Success patching ffmpeg ref");
} else {
  console.log("Targets not found!");
}
