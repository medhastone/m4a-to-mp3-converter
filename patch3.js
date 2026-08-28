const fs = require('fs');
const file = '/app/applet/app/components/Converter.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace("import { useTranslations } from 'next-intl';", "import { useTranslations } from 'next-intl';\nimport { FFmpeg } from '@ffmpeg/ffmpeg';\nimport { fetchFile } from '@ffmpeg/util';");

content = content.replace("const fileInputRef = useRef<HTMLInputElement>(null);", "const fileInputRef = useRef<HTMLInputElement>(null);\n  const ffmpegRef = useRef(new FFmpeg());\n  const [ffmpegLoaded, setFfmpegLoaded] = useState(false);");

const target = `  const processAudioFile = async (file: File) => {`;
const replaceWith = `  const processAudioFile = async (file: File) => {
    try {
      setStatus('processing');
      setProgress(0);
      setErrorMsg(null);

      const ffmpeg = ffmpegRef.current;
      
      if (!ffmpegLoaded) {
        await ffmpeg.load({
          coreURL: 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd/ffmpeg-core.js',
          wasmURL: 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd/ffmpeg-core.wasm'
        });
        setFfmpegLoaded(true);
      }

      ffmpeg.on('progress', ({ progress }) => {
        setProgress(Math.round(progress * 100));
      });

      const inputName = 'input.m4a';
      const outputName = 'output.mp3';

      await ffmpeg.writeFile(inputName, await fetchFile(file));

      const channelsStr = topology === 'stereo' ? '2' : '1';
      
      await ffmpeg.exec([
        '-i', inputName,
        '-b:a', \`\${bitrate}k\`,
        '-ac', channelsStr,
        outputName
      ]);

      const data = await ffmpeg.readFile(outputName);
      
      await ffmpeg.deleteFile(inputName);
      await ffmpeg.deleteFile(outputName);
      ffmpeg.off('progress', () => {});

      setRawMp3Buffer(data.buffer);
      setStatus('done');

    } catch (error: any) {
      console.error(error);
      setErrorMsg(error.message || 'An error occurred during high-speed conversion.');
      setStatus('error');
    }
  };

  const __old_processAudioFile = async (file: File) => {`;

content = content.replace(target, replaceWith);

fs.writeFileSync(file, content);
console.log("Success patching Converter with ffmpeg");
