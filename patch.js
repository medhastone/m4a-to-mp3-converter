const fs = require('fs');
const file = '/app/applet/app/components/Converter.tsx';
let lines = fs.readFileSync(file, 'utf8').split('\n');

const replacement = `  const processAudioFile = async (file: File) => {
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

// replace lines 31 to 125
lines.splice(30, 95, replacement);

fs.writeFileSync(file, lines.join('\n'));
console.log('Success replacing lines 31-125');
