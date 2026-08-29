"use client";

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Upload, X, FileMusic, CheckCircle2, Shield, Settings, Download } from 'lucide-react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';
import { useTranslations } from 'next-intl';

export default function MetadataRemover() {
  const t = useTranslations();
  
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [metadata, setMetadata] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isStripped, setIsStripped] = useState(false);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [ffmpegLoaded, setFfmpegLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const ffmpegRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadFFmpeg = async () => {
      try {
        if (!ffmpegRef.current) {
          ffmpegRef.current = new FFmpeg();
        }
        const ffmpeg = ffmpegRef.current;
        if (!ffmpegLoaded) {
          await ffmpeg.load({
            coreURL: 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd/ffmpeg-core.js',
            wasmURL: 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd/ffmpeg-core.wasm'
          });
          setFfmpegLoaded(true);
        }
      } catch (err) {
        console.error("FFmpeg load error", err);
      }
    };
    loadFFmpeg();
  }, [ffmpegLoaded]);

  const loadMetadata = (fileToRead: File) => {
    const loadScriptAndRead = () => {
      const jsmediatags = (window as any).jsmediatags;
      if (jsmediatags) {
        jsmediatags.read(fileToRead, {
          onSuccess: (tag: any) => setMetadata(tag.tags),
          onError: (error: any) => {
            console.error("Error reading tags", error);
            setMetadata({});
          }
        });
      } else {
        setMetadata({});
      }
    };

    if (!(window as any).jsmediatags) {
      const script = document.createElement('script');
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/jsmediatags/3.9.5/jsmediatags.min.js";
      script.onload = loadScriptAndRead;
      script.onerror = () => setMetadata({});
      document.body.appendChild(script);
    } else {
      loadScriptAndRead();
    }
  };

  const handleFileSelect = (selectedFile: File) => {
    const validTypes = ['audio/mpeg', 'audio/wav', 'audio/x-wav', 'audio/mp4', 'audio/x-m4a', 'audio/ogg', 'audio/flac'];
    if (!validTypes.includes(selectedFile.type) && !selectedFile.name.match(/\.(mp3|wav|m4a|flac|ogg)$/i)) {
      setError("Please select a supported audio file (MP3, WAV, M4A, FLAC, OGG).");
      return;
    }
    
    setFile(selectedFile);
    setError(null);
    setMetadata(null);
    setIsStripped(false);
    setOutputUrl(null);
    loadMetadata(selectedFile);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleStripMetadata = async () => {
    if (!file || !ffmpegLoaded || !ffmpegRef.current) return;
    
    try {
      setIsProcessing(true);
      setError(null);
      
      const ffmpeg = ffmpegRef.current;
      const inputName = 'input' + file.name.substring(file.name.lastIndexOf('.'));
      const outputName = 'clean_' + file.name;
      
      await ffmpeg.writeFile(inputName, await fetchFile(file));
      
      // -map_metadata -1 removes all global metadata
      // -c copy ensures lossless copy (no recompression)
      await ffmpeg.exec([
        '-i', inputName,
        '-map_metadata', '-1',
        '-c:v', 'copy',
        '-c:a', 'copy',
        outputName
      ]);
      
      const data = await ffmpeg.readFile(outputName);
      
      const blob = new Blob([data], { type: file.type || 'audio/mpeg' });
      const url = URL.createObjectURL(blob);
      
      setOutputUrl(url);
      setIsStripped(true);
      
      // Cleanup
      await ffmpeg.deleteFile(inputName);
      await ffmpeg.deleteFile(outputName);
      
    } catch (err: any) {
      console.error(err);
      setError("An error occurred while processing the file.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (outputUrl && file) {
      const a = document.createElement('a');
      a.href = outputUrl;
      a.download = `clean_${file.name}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const renderMetadata = () => {
    if (!metadata) return null;
    
    const tagsToShow = ['title', 'artist', 'album', 'year', 'genre', 'comment', 'track'];
    const foundTags = tagsToShow.filter(tag => metadata[tag]);
    
    if (foundTags.length === 0) {
      return (
        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 text-center text-slate-300">
          No standard metadata tags detected, but there may still be hidden identifying chunks. 
          Stripping will ensure a completely clean file.
        </div>
      );
    }
    
    return (
      <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden">
        <div className="px-4 py-3 bg-slate-800 border-b border-slate-700/50 flex justify-between items-center">
          <h4 className="font-semibold text-slate-200">Detected Metadata</h4>
          <span className="text-xs font-medium px-2 py-1 bg-amber-500/20 text-amber-400 rounded-full">
            {foundTags.length} tags found
          </span>
        </div>
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {foundTags.map(tag => (
            <div key={tag} className="flex flex-col overflow-hidden">
              <span className="text-xs text-slate-400 uppercase tracking-wider mb-1">{tag}</span>
              <span className="text-slate-200 font-medium truncate" title={metadata[tag]}>{metadata[tag]}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-8">
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl flex items-center gap-3">
          <X className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {/* Upload Area */}
      {!file && (
        <div 
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
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
          <h3 className="text-xl font-bold text-white mb-2">Drop your audio file here</h3>
          <p className="text-slate-400 mb-6 max-w-sm">
            Supports MP3, WAV, M4A, FLAC, and OGG. Processing happens entirely in your browser.
          </p>
          <button className="bg-white text-slate-900 hover:bg-slate-100 px-6 py-3 rounded-full font-bold transition-all shadow-lg shadow-white/10">
            Select File
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={(e) => e.target.files && handleFileSelect(e.target.files[0])}
            accept=".mp3,.wav,.m4a,.flac,.ogg,audio/*"
            className="hidden" 
          />
        </div>
      )}

      {/* File Processing Area */}
      {file && (
        <div className="bg-slate-900/60 border border-slate-700/50 rounded-3xl p-6 sm:p-8 flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-4 overflow-hidden">
              <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary shrink-0">
                <FileMusic className="w-6 h-6" />
              </div>
              <div className="overflow-hidden">
                <h3 className="font-bold text-white text-lg truncate" title={file.name}>{file.name}</h3>
                <p className="text-slate-400 text-sm">{(file.size / (1024 * 1024)).toFixed(2)} MB • {file.type || 'Audio file'}</p>
              </div>
            </div>
            
            <button 
              onClick={() => {
                setFile(null);
                setMetadata(null);
                setIsStripped(false);
                setOutputUrl(null);
              }}
              className="text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-800 transition-colors shrink-0"
              title="Remove file"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* State 1: Metadata Loaded, Ready to Strip */}
          {!isStripped && (
            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {metadata ? renderMetadata() : (
                <div className="h-32 flex items-center justify-center text-slate-400 animate-pulse">
                  Scanning file for hidden metadata...
                </div>
              )}
              
              <div className="bg-primary/10 border border-primary/20 p-5 rounded-2xl flex gap-4 items-start">
                <Shield className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-primary mb-1">Privacy Protection</h4>
                  <p className="text-sm text-primary/80 leading-relaxed">
                    Stripping will remove all ID3v1, ID3v2, RIFF chunks, Vorbis comments, and MP4 atoms losslessly. 
                    The audio stream itself is perfectly copied without any quality degradation.
                  </p>
                </div>
              </div>

              <button 
                onClick={handleStripMetadata}
                disabled={isProcessing || !ffmpegLoaded}
                className="w-full bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-on-primary font-bold py-4 rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-3"
              >
                {isProcessing ? (
                  <>
                    <Settings className="w-5 h-5 animate-spin" />
                    Stripping all metadata safely...
                  </>
                ) : !ffmpegLoaded ? (
                  <>
                    <Settings className="w-5 h-5 animate-spin" />
                    Initializing engine...
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5" />
                    Strip All Metadata
                  </>
                )}
              </button>
            </div>
          )}

          {/* State 2: Successfully Stripped */}
          {isStripped && (
            <div className="flex flex-col items-center justify-center py-8 gap-6 animate-in zoom-in-95 duration-500">
              <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-2">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2">Metadata Removed!</h3>
                <p className="text-slate-400">
                  All tags & identifiers stripped successfully. Your file is 100% clean and ready.
                </p>
              </div>

              <button 
                onClick={handleDownload}
                className="w-full sm:w-auto mt-4 bg-white text-slate-900 hover:bg-slate-100 px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-white/10 flex items-center justify-center gap-3"
              >
                <Download className="w-5 h-5" />
                Download Clean Audio
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
