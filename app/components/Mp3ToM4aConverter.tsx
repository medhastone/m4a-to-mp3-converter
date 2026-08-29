'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { FileAudio, Download, RotateCcw, Music, Layers, ShieldCheck, Monitor, Upload, Trash2, CheckCircle2, FileArchive } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';
import JSZip from 'jszip';

type Bitrate = '128' | '192' | '256' | '320';

interface ProcessedFile {
  id: string;
  originalName: string;
  blob: Blob;
  m4aName: string;
}

export default function Mp3ToM4aConverter() {
  const pathname = usePathname() || '';
  const [status, setStatus] = useState<'idle' | 'processing' | 'done'>('idle');
  const [globalProgress, setGlobalProgress] = useState(0);
  const [bitrate, setBitrate] = useState<Bitrate>('256');
  const [isDragging, setIsDragging] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const [processedFiles, setProcessedFiles] = useState<ProcessedFile[]>([]);
  const [queue, setQueue] = useState<File[]>([]);
  const [currentProcessingFile, setCurrentProcessingFile] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const ffmpegRef = useRef<any>(null);

  const initFFmpeg = async () => {
    if (!ffmpegRef.current) {
      const ffmpeg = new FFmpeg();
      ffmpeg.on('progress', ({ progress }) => {
        setGlobalProgress(Math.max(0, Math.min(100, progress * 100)));
      });
      await ffmpeg.load();
      ffmpegRef.current = ffmpeg;
    }
  };

  const handleFiles = async (files: File[]) => {
    const mp3Files = files.filter(f => f.name.toLowerCase().endsWith('.mp3'));
    if (mp3Files.length === 0) {
      setErrorMsg('Please select at least one MP3 file.');
      return;
    }
    setErrorMsg(null);
    setStatus('processing');
    setProcessedFiles([]);
    
    try {
      await initFFmpeg();
      const ffmpeg = ffmpegRef.current;
      const results: ProcessedFile[] = [];

      for (let i = 0; i < mp3Files.length; i++) {
        const file = mp3Files[i];
        setCurrentProcessingFile(file.name);
        setGlobalProgress(0);

        const safeName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
        await ffmpeg.writeFile(safeName, await fetchFile(file));

        const outputName = safeName.replace(/\.[^/.]+$/, "") + '.m4a';
        
        // Convert to AAC preserving sample rate and mapping metadata
        await ffmpeg.exec([
          '-i', safeName,
          '-c:a', 'aac',
          '-b:a', `${bitrate}k`,
          '-map_metadata', '0',
          outputName
        ]);

        const data = await ffmpeg.readFile(outputName);
        const blob = new Blob([data as any], { type: 'audio/mp4' });
        
        const finalName = file.name.replace(/\.[^/.]+$/, "") + '.m4a';
        
        results.push({
          id: Math.random().toString(36).substr(2, 9),
          originalName: file.name,
          blob,
          m4aName: finalName
        });

        // Cleanup
        await ffmpeg.deleteFile(safeName);
        await ffmpeg.deleteFile(outputName);
      }

      setProcessedFiles(results);
      setStatus('done');
    } catch (err: any) {
      console.error(err);
      setErrorMsg('Error processing files. Please try again.');
      setStatus('idle');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleDownloadZip = async () => {
    const zip = new JSZip();
    processedFiles.forEach(file => {
      zip.file(file.m4aName, file.blob);
    });
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(zipBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted_audio.zip';
    a.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setStatus('idle');
    setProcessedFiles([]);
    setGlobalProgress(0);
    setErrorMsg(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">
      {/* Settings Panel */}
      <div className="bg-surface-container-low p-6 rounded-3xl border border-white/10 shadow-lg">
        <h3 className="text-lg font-bold text-white mb-4">Encoding Options</h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {(['128', '192', '256', '320'] as Bitrate[]).map((b) => (
            <button
              key={b}
              onClick={() => setBitrate(b)}
              disabled={status === 'processing'}
              className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-1 ${
                bitrate === b
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-white/5 bg-white/5 text-slate-400 hover:border-white/10 hover:text-white'
              } ${status === 'processing' ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <span className="font-bold text-lg">{b} kbps</span>
              <span className="text-xs">{b === '256' ? 'Default (Apple Music)' : 'AAC Format'}</span>
            </button>
          ))}
        </div>
      </div>

      {errorMsg && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-center">
          {errorMsg}
        </div>
      )}

      {/* Main Upload / Progress Area */}
      {status === 'idle' && (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`
            border-2 border-dashed rounded-3xl p-12 transition-all duration-200 cursor-pointer text-center
            flex flex-col items-center justify-center min-h-[320px] bg-slate-900/40
            ${isDragging ? 'border-primary bg-primary/5' : 'border-slate-700 hover:border-primary hover:bg-primary/5 group'}
          `}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${isDragging ? 'bg-primary/20 text-primary' : 'bg-primary/10 text-primary group-hover:bg-primary/20'}`}>
            <Upload className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Drop MP3 files here</h3>
          <p className="text-slate-400 mb-6 max-w-sm">
            Drag and drop multiple .mp3 files to batch convert to .m4a format securely in your browser.
          </p>
          <button className="bg-primary hover:bg-primary-hover text-on-primary font-bold py-3 px-8 rounded-full shadow-lg shadow-primary/20 transition-all active:scale-95">
            Select MP3 Files
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
            accept=".mp3"
            multiple
          />
        </div>
      )}

      {status === 'processing' && (
        <div className="bg-surface-container-low p-12 rounded-3xl border border-white/5 flex flex-col items-center text-center min-h-[320px] justify-center">
          <Layers className="w-12 h-12 text-primary animate-pulse mb-6" />
          <h3 className="text-2xl font-bold text-white mb-2">Converting to M4A...</h3>
          <p className="text-slate-400 mb-8 max-w-md">
            Processing {currentProcessingFile}
          </p>
          
          <div className="w-full max-w-md bg-white/5 rounded-full h-4 mb-3 overflow-hidden border border-white/10 relative p-0.5">
            <div 
              className="bg-gradient-to-r from-primary to-amber-500 h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${globalProgress}%` }}
            ></div>
          </div>
          <p className="text-primary font-mono font-bold text-lg">{Math.round(globalProgress)}%</p>
        </div>
      )}

      {status === 'done' && (
        <div className="bg-surface-container-low p-8 rounded-3xl border border-primary/20 flex flex-col items-center shadow-2xl shadow-primary/5">
          <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Conversion Complete!</h3>
          <p className="text-slate-400 mb-8">
            Successfully converted {processedFiles.length} file{processedFiles.length !== 1 ? 's' : ''}.
          </p>

          {/* File List */}
          <div className="w-full max-w-2xl bg-slate-900/50 rounded-2xl border border-slate-700/50 overflow-hidden mb-8">
            {processedFiles.map((file, idx) => (
              <div key={file.id} className={`flex items-center justify-between p-4 ${idx !== processedFiles.length - 1 ? 'border-b border-slate-700/50' : ''}`}>
                <div className="flex items-center gap-3 overflow-hidden">
                  <Music className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-slate-300 truncate font-medium">{file.m4aName}</span>
                </div>
                <button
                  onClick={() => {
                    const url = URL.createObjectURL(file.blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = file.m4aName;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors shrink-0 ml-4"
                >
                  <Download className="w-4 h-4" /> Download
                </button>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {processedFiles.length > 1 && (
              <button 
                onClick={handleDownloadZip}
                className="bg-primary hover:bg-primary-hover text-on-primary font-bold py-3 px-8 rounded-full shadow-lg shadow-primary/20 transition-all active:scale-95 flex items-center gap-2"
              >
                <FileArchive className="w-5 h-5" /> Download All as ZIP
              </button>
            )}
            <button 
              onClick={reset}
              className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-full transition-all active:scale-95 flex items-center gap-2"
            >
              <RotateCcw className="w-5 h-5" /> Convert More
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
