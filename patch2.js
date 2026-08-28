const fs = require('fs');
const file = '/app/applet/app/components/Converter.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Add FFmpeg imports at the top
content = content.replace("import { useTranslations } from 'next-intl';", "import { useTranslations } from 'next-intl';\nimport { FFmpeg } from '@ffmpeg/ffmpeg';\nimport { fetchFile } from '@ffmpeg/util';");

// 2. Add ffmpeg ref
content = content.replace("const fileInputRef = useRef<HTMLInputElement>(null);", "const fileInputRef = useRef<HTMLInputElement>(null);\n  const ffmpegRef = useRef(new FFmpeg());\n  const [ffmpegLoaded, setFfmpegLoaded] = useState(false);");

// 3. Replace the processAudioFile method
const targetFunc = `  const processAudioFile = async (file: File) => {
    try {
      setStatus('processing');
      setProgress(0);
      setErrorMsg(null);

      const arrayBuffer = await file.arrayBuffer();
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      let audioBuffer: AudioBuffer;
      try {
        audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
      } catch (err) {
        throw new Error('Could not decode audio. The file might be corrupted or DRM-protected (.m4p).');
      }

      const channels = topology === 'stereo' ? 2 : 1;
      const sampleRate = audioBuffer.sampleRate;
      const kbps = parseInt(bitrate);

      const left = audioBuffer.getChannelData(0);
      const right = channels === 2 && audioBuffer.numberOfChannels > 1 
        ? audioBuffer.getChannelData(1) 
        : left;

      // Initialize Web Worker for background processing
      const worker = new Worker('/lame-worker.js');
      
      worker.onmessage = (e) => {
        if (e.data.type === 'progress') {
          setProgress(e.data.progress);
        } else if (e.data.type === 'done') {
          setRawMp3Buffer(e.data.buffer);
          setStatus('done');
          worker.terminate();
        } else if (e.data.type === 'error') {
          setErrorMsg(e.data.message || 'An unknown error occurred in the worker.');
          setStatus('error');
          worker.terminate();
        }
      };

      worker.onerror = (err) => {
        setErrorMsg('Web Worker failed to execute properly.');
        setStatus('error');
        worker.terminate();
      };

      // Send data to worker
      worker.postMessage({
        left: left,
        right: right,
        channels: channels,
        sampleRate: sampleRate,
        kbps: kbps
      });

    } catch (error: any) {
      setErrorMsg(error.message || 'An unknown error occurred.');
      setStatus('error');
    }
  };`;

const newFunc = `  const processAudioFile = async (file: File) => {
    try {
      setStatus('processing');
      setProgress(0);
      setErrorMsg(null);

      const ffmpeg = ffmpegRef.current;
      
      if (!ffmpegLoaded) {
        // Load FFmpeg from CDN for maximum speed via WebAssembly
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
      
      // Execute FFmpeg Wasm
      await ffmpeg.exec([
        '-i', inputName,
        '-b:a', \`\${bitrate}k\`,
        '-ac', channelsStr,
        outputName
      ]);

      const data = await ffmpeg.readFile(outputName);
      
      // Cleanup
      await ffmpeg.deleteFile(inputName);
      await ffmpeg.deleteFile(outputName);
      ffmpeg.off('progress', () => {}); // remove listener

      setRawMp3Buffer(data.buffer);
      setStatus('done');

    } catch (error: any) {
      console.error(error);
      setErrorMsg(error.message || 'An error occurred during high-speed conversion.');
      setStatus('error');
    }
  };`;

if(content.includes(targetFunc)) {
  content = content.replace(targetFunc, newFunc);
  fs.writeFileSync(file, content);
  console.log("Success patching Converter.tsx");
} else {
  console.log("Target function not found. Exiting.");
  // let's try a loose replace just in case of formatting
  const split1 = content.split("const processAudioFile = async (file: File) => {");
  if(split1.length > 1) {
    const split2 = split1[1].split("const handleFile = (file: File) => {");
    if(split2.length > 1) {
       let newContent = split1[0] + newFunc + "\\n\\n  const handleFile = (file: File) => {" + split2[1];
       fs.writeFileSync(file, newContent);
       console.log("Success patching Converter.tsx via split method");
    }
  }
}
