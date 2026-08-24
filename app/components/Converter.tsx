'use client';

import { useState, useRef, useEffect } from 'react';
import { FileAudio, Download, RotateCcw, Music } from 'lucide-react';
const ID3Writer = require('browser-id3-writer');

type ProcessingStatus = 'idle' | 'processing' | 'done' | 'error';
type Bitrate = '128' | '192' | '320';
type Topology = 'mono' | 'stereo';

export default function Converter() {
  const [status, setStatus] = useState<ProcessingStatus>('idle');
  const [progress, setProgress] = useState(0);
  const [bitrate, setBitrate] = useState<Bitrate>('192');
  const [topology, setTopology] = useState<Topology>('stereo');
  const [fileName, setFileName] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const [rawMp3Buffer, setRawMp3Buffer] = useState<ArrayBuffer | null>(null);
  const [id3Title, setId3Title] = useState('');
  const [id3Artist, setId3Artist] = useState('');
  const [id3Album, setId3Album] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load LameJS via CDN
  useEffect(() => {
    if (!document.getElementById('lamejs-script')) {
      const script = document.createElement('script');
      script.id = 'lamejs-script';
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lamejs/1.2.1/lame.min.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  const processAudioFile = async (file: File) => {
    try {
      setStatus('processing');
      setProgress(0);
      setErrorMsg(null);

      const lamejs = (window as any).lamejs;
      if (!lamejs) {
        throw new Error('LameJS library is still loading. Please wait a moment.');
      }

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
      
      const mp3encoder = new lamejs.Mp3Encoder(channels, sampleRate, kbps);
      const mp3Data: any[] = [];

      const left = audioBuffer.getChannelData(0);
      const right = channels === 2 && audioBuffer.numberOfChannels > 1 
        ? audioBuffer.getChannelData(1) 
        : left; 

      const CHUNK_SIZE = 1152 * 40; 
      let offset = 0;

      const encodeChunk = () => {
        const limit = Math.min(offset + CHUNK_SIZE, left.length);
        const leftFloatChunk = left.subarray(offset, limit);
        const leftInt16Chunk = new Int16Array(leftFloatChunk.length);
        
        for (let i = 0; i < leftFloatChunk.length; i++) {
          const s = Math.max(-1, Math.min(1, leftFloatChunk[i]));
          leftInt16Chunk[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
        }

        let mp3buf;
        if (channels === 2) {
          const rightFloatChunk = right.subarray(offset, limit);
          const rightInt16Chunk = new Int16Array(rightFloatChunk.length);
          for (let i = 0; i < rightFloatChunk.length; i++) {
            const s = Math.max(-1, Math.min(1, rightFloatChunk[i]));
            rightInt16Chunk[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
          }
          mp3buf = mp3encoder.encodeBuffer(leftInt16Chunk, rightInt16Chunk);
        } else {
          mp3buf = mp3encoder.encodeBuffer(leftInt16Chunk);
        }

        if (mp3buf.length > 0) {
          mp3Data.push(mp3buf);
        }

        offset += CHUNK_SIZE;
        setProgress((offset / left.length) * 100);

        if (offset < left.length) {
          requestAnimationFrame(encodeChunk);
        } else {
          const mp3bufFinal = mp3encoder.flush();
          if (mp3bufFinal.length > 0) {
            mp3Data.push(mp3bufFinal);
          }
          
          const totalLength = mp3Data.reduce((acc, val) => acc + val.length, 0);
          const combined = new Int8Array(totalLength);
          let offsetBuffer = 0;
          for (const buf of mp3Data) {
            combined.set(buf, offsetBuffer);
            offsetBuffer += buf.length;
          }
          
          setRawMp3Buffer(combined.buffer);
          setStatus('done');
        }
      };

      requestAnimationFrame(encodeChunk);

    } catch (error: any) {
      console.error(error);
      setErrorMsg(error.message || 'An unknown error occurred.');
      setStatus('error');
    }
  };

  const handleFile = (file: File) => {
    if (file && (file.name.toLowerCase().endsWith('.m4a') || file.name.toLowerCase().endsWith('.mp4'))) {
      const baseName = file.name.replace(/\.[^/.]+$/, "");
      setFileName(file.name);
      setId3Title(baseName); // Pre-fill title with filename
      setId3Artist('');
      setId3Album('');
      processAudioFile(file);
    } else {
      alert('Please select a valid .m4a audio file.');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const reset = () => {
    setStatus('idle');
    setProgress(0);
    setFileName('');
    setErrorMsg(null);
    setRawMp3Buffer(null);
    setId3Title('');
    setId3Artist('');
    setId3Album('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDownload = () => {
    if (!rawMp3Buffer) return;
    try {
      const writer = new ID3Writer(rawMp3Buffer);
      if (id3Title) writer.setFrame('TIT2', id3Title);
      if (id3Artist) writer.setFrame('TPE1', [id3Artist]);
      if (id3Album) writer.setFrame('TALB', id3Album);
      writer.addTag();

      const taggedBlob = writer.getBlob();
      const url = URL.createObjectURL(taggedBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${fileName.replace(/\.[^/.]+$/, "")}_${bitrate}kbps.mp3`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('ID3 Tagging failed:', e);
      // Fallback without tags
      const blob = new Blob([rawMp3Buffer], { type: 'audio/mp3' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${fileName.replace(/\.[^/.]+$/, "")}_${bitrate}kbps.mp3`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="w-full md:w-2/3 bg-surface-container/80 backdrop-blur-2xl rounded-2xl border border-white/5 shadow-2xl relative overflow-hidden group p-6 md:p-10">
      
      {/* Configuration Bar */}
      <div className="flex flex-col sm:flex-row gap-6 mb-8 pb-6 border-b border-outline-variant/30">
        {/* Bitrate Selector */}
        <div className="flex-1 flex flex-col gap-2">
          <label className="font-jb-mono text-xs text-on-surface-variant tracking-widest uppercase font-medium">
            Target Bitrate
          </label>
          <div className="flex bg-surface-dim rounded-lg p-1 relative border border-outline-variant/30 overflow-hidden">
            {/* Animated Background */}
            <div 
              className="absolute top-1 bottom-1 bg-surface-container-high rounded-md shadow-sm border border-outline-variant/50 transition-all duration-300 ease-out z-0"
              style={{
                width: 'calc(33.333% - 4px)',
                transform: `translateX(calc(${['128', '192', '320'].indexOf(bitrate)} * 100% + ${['128', '192', '320'].indexOf(bitrate) * 2}px))`
              }}
            />
            {(['128', '192', '320'] as Bitrate[]).map((val) => (
              <button
                key={val}
                onClick={() => setBitrate(val)}
                className={`flex-1 py-2 font-jb-mono text-xs relative z-10 transition-colors ${
                  bitrate === val ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {val} {val === '320' && <span className="text-secondary text-[10px] ml-1">HQ</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Topology Selector */}
        <div className="flex-1 flex flex-col gap-2">
          <label className="font-jb-mono text-xs text-on-surface-variant tracking-widest uppercase font-medium">
            Topology
          </label>
          <div className="flex bg-surface-dim rounded-lg p-1 relative border border-outline-variant/30 overflow-hidden">
            <div 
              className="absolute top-1 bottom-1 bg-surface-container-high rounded-md shadow-sm border border-outline-variant/50 transition-all duration-300 ease-out z-0"
              style={{
                width: 'calc(50% - 4px)',
                transform: `translateX(calc(${['mono', 'stereo'].indexOf(topology)} * 100% + ${['mono', 'stereo'].indexOf(topology) * 4}px))`
              }}
            />
            {(['mono', 'stereo'] as Topology[]).map((val) => (
              <button
                key={val}
                onClick={() => setTopology(val)}
                className={`flex-1 py-2 font-jb-mono text-xs capitalize relative z-10 transition-colors ${
                  topology === val ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {val}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Area */}
      <div className="relative w-full min-h-[256px] flex flex-col">
        {status === 'idle' && (
          <div 
            className={`flex-auto border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-300 group/drop bg-surface-dim/50 p-6
              ${isDragging ? 'border-primary bg-primary/5 scale-[1.02]' : 'border-outline-variant hover:border-primary/50'}`}
            onDragEnter={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={(e) => { 
              e.preventDefault(); 
              if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                setIsDragging(false); 
              }
            }}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input 
              type="file" 
              accept=".m4a,audio/mp4" 
              className="hidden" 
              ref={fileInputRef}
              onChange={(e) => e.target.files && handleFile(e.target.files[0])}
            />
            <div className={`pointer-events-none w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center shadow-lg transition-all duration-300
              ${isDragging ? 'shadow-[0_0_30px_rgba(249,115,22,0.4)] scale-110' : 'group-hover/drop:shadow-[0_0_20px_rgba(249,115,22,0.2)]'}`}>
              <FileAudio className={`w-8 h-8 transition-colors ${isDragging ? 'text-primary-container' : 'text-primary'}`} />
            </div>
            <div className="text-center pointer-events-none">
              <h3 className="font-semibold text-xl text-on-surface group-hover/drop:text-primary transition-colors">Drop M4A Here</h3>
              <p className="text-on-surface-variant mt-1">or click to browse local filesystem</p>
            </div>

            {/* Subtle waveform decoration */}
            <div className="absolute bottom-4 left-4 right-4 h-8 flex items-end justify-center gap-1 opacity-20 group-hover/drop:opacity-40 transition-opacity pointer-events-none">
              <div className="w-1 bg-secondary rounded-t-full h-1/3"></div>
              <div className="w-1 bg-secondary rounded-t-full h-2/3"></div>
              <div className="w-1 bg-secondary rounded-t-full h-full"></div>
              <div className="w-1 bg-secondary rounded-t-full h-1/2"></div>
              <div className="w-1 bg-secondary rounded-t-full h-1/4"></div>
            </div>
          </div>
        )}

        {(status === 'processing' || status === 'done') && (
          <div className="flex-auto flex flex-col items-center justify-center gap-4 bg-surface-dim/80 rounded-xl border border-white/5 py-8 relative">
             {/* Ambient Glow */}
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.1)_0%,transparent_70%)] pointer-events-none"></div>
             
             {/* Equalizer Visualizer */}
             <div className="flex items-end h-16 gap-2 mb-2">
                <div className={`w-2 rounded-t-full transition-all ${status === 'processing' ? 'bg-primary animate-eq-1' : 'bg-secondary h-full'}`}></div>
                <div className={`w-2 rounded-t-full transition-all ${status === 'processing' ? 'bg-primary-container animate-eq-2 shadow-[0_0_15px_rgba(249,115,22,0.5)]' : 'bg-secondary h-full'}`}></div>
                <div className={`w-2 rounded-t-full transition-all ${status === 'processing' ? 'bg-primary animate-eq-3' : 'bg-secondary h-full'}`}></div>
                <div className={`w-2 rounded-t-full transition-all ${status === 'processing' ? 'bg-primary-container animate-eq-4' : 'bg-secondary h-full'}`}></div>
                <div className={`w-2 rounded-t-full transition-all ${status === 'processing' ? 'bg-primary animate-eq-5' : 'bg-secondary h-full'}`}></div>
             </div>

             {/* Progress Bar Container */}
              <div className="w-3/4 max-w-md bg-surface-container-high h-2 rounded-full overflow-hidden shadow-inner relative z-10">
               <div 
                 className={`h-full transition-all duration-300 ease-out relative ${status === 'done' ? 'bg-secondary' : 'bg-gradient-to-r from-primary to-primary-container'}`}
                 style={{ width: `${Math.min(progress, 100)}%` }}
               >
                 {status === 'processing' && (
                   <div className="absolute right-0 top-0 bottom-0 w-8 bg-white/30 blur-[4px] animate-pulse"></div>
                 )}
               </div>
             </div>

             <div className="flex justify-between w-3/4 max-w-md mt-1 z-10">
               <span className="font-jb-mono text-xs text-on-surface-variant truncate pr-4">
                 {status === 'done' ? 'Conversion complete.' : `Processing ${fileName}...`}
               </span>
               <span className={`font-jb-mono text-xs font-bold ${status === 'done' ? 'text-secondary' : 'text-primary'}`}>
                 {Math.round(Math.min(progress, 100))}%
               </span>
             </div>

             {/* Actions post-processing */}
             {status === 'done' && (
               <div className="w-3/4 max-w-md mt-4 animate-in fade-in slide-in-from-bottom-4 duration-500 z-10">
                 {/* ID3 Tag Editor */}
                 <div className="bg-surface-dim/40 backdrop-blur-md rounded-xl p-4 border border-outline-variant/30 mb-4 flex flex-col gap-3">
                   <div className="flex items-center gap-2 mb-1">
                     <Music className="w-4 h-4 text-primary" />
                     <h4 className="font-semibold text-sm text-on-surface">ID3 Metadata (Optional)</h4>
                   </div>
                   <div className="flex flex-col gap-1">
                     <label className="text-[10px] text-on-surface-variant uppercase tracking-wider font-jb-mono">Title</label>
                     <input 
                       type="text" 
                       value={id3Title} 
                       onChange={(e) => setId3Title(e.target.value)} 
                       placeholder="Track Title"
                       className="bg-surface-container-high border border-outline-variant/30 rounded text-sm px-3 py-1.5 text-on-surface focus:outline-none focus:border-primary/50 transition-colors"
                     />
                   </div>
                   <div className="grid grid-cols-2 gap-3">
                     <div className="flex flex-col gap-1">
                       <label className="text-[10px] text-on-surface-variant uppercase tracking-wider font-jb-mono">Artist</label>
                       <input 
                         type="text" 
                         value={id3Artist} 
                         onChange={(e) => setId3Artist(e.target.value)} 
                         placeholder="Artist Name"
                         className="bg-surface-container-high border border-outline-variant/30 rounded text-sm px-3 py-1.5 text-on-surface focus:outline-none focus:border-primary/50 transition-colors"
                       />
                     </div>
                     <div className="flex flex-col gap-1">
                       <label className="text-[10px] text-on-surface-variant uppercase tracking-wider font-jb-mono">Album</label>
                       <input 
                         type="text" 
                         value={id3Album} 
                         onChange={(e) => setId3Album(e.target.value)} 
                         placeholder="Album Name"
                         className="bg-surface-container-high border border-outline-variant/30 rounded text-sm px-3 py-1.5 text-on-surface focus:outline-none focus:border-primary/50 transition-colors"
                       />
                     </div>
                   </div>
                 </div>

                 <div className="flex gap-4">
                   <button 
                    onClick={handleDownload}
                    className="bg-primary hover:bg-primary-container text-on-primary font-semibold px-6 py-2.5 rounded-lg shadow-[0_0_15px_rgba(249,115,22,0.4)] hover:shadow-[0_0_25px_rgba(249,115,22,0.6)] transition-all flex items-center gap-2 flex-1 justify-center"
                   >
                     <Download className="w-5 h-5" /> Download MP3
                   </button>
                   <button 
                     onClick={reset}
                     className="bg-surface-container-highest hover:bg-surface-bright text-on-surface font-semibold px-6 py-2.5 rounded-lg transition-colors flex items-center gap-2"
                   >
                     <RotateCcw className="w-4 h-4" /> Reset
                   </button>
                 </div>
               </div>
             )}
          </div>
        )}

        {status === 'error' && (
          <div className="flex-auto flex flex-col items-center justify-center gap-4 bg-surface-dim/95 rounded-xl border border-error/50 p-8 text-center z-20 relative">
            <div className="w-16 h-16 rounded-full bg-error/20 flex items-center justify-center">
               <span className="text-error font-bold text-3xl">!</span>
            </div>
            <h3 className="text-xl font-semibold text-on-surface">Processing Failed</h3>
            <p className="text-on-surface-variant text-sm max-w-sm">{errorMsg}</p>
            <button onClick={reset} className="mt-4 bg-surface-container-highest hover:bg-surface-bright px-6 py-2.5 rounded-lg font-medium transition-colors">
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
