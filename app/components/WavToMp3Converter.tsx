'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { UploadCloud, Music, FileAudio, Settings, Download, PlayCircle, Loader2, X, Archive, Share2 } from 'lucide-react';
import JSZip from 'jszip';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';

interface ConversionTask {
  id: string;
  file: File;
  progress: number;
  status: 'pending' | 'processing' | 'done' | 'error';
  speedStr?: string;
  error?: string;
  blob?: Blob;
  previewUrl?: string;
}

export default function WavToMp3Converter() {
  const t = useTranslations('wav_to_mp3');
  const [tasks, setTasks] = useState<ConversionTask[]>([]);
  const [kbps, setKbps] = useState(320);
  const [isDragging, setIsDragging] = useState(false);
  
  const workers = useRef<{ worker: Worker; isBusy: boolean }[]>([]);
  const tasksRef = useRef<ConversionTask[]>([]);
  const kbpsRef = useRef(kbps);

  useEffect(() => {
    tasksRef.current = tasks;
  }, [tasks]);

  useEffect(() => {
    kbpsRef.current = kbps;
  }, [kbps]);

  const fallbackWithFFmpeg = useCallback((id: string, file: File, targetKbps: number) => {
    try {
      const ffmpegWorker = new Worker('/ffmpeg-worker.js?v=2.5.0');
      
      ffmpegWorker.onmessage = (e) => {
        const { type, payload } = e.data;
        if (type === 'INIT_DONE') {
          ffmpegWorker.postMessage({
            type: 'CONVERT',
            payload: { file, quality: String(targetKbps), id }
          });
        } else if (type === 'PROGRESS') {
          const prog = Math.min(100, Math.round((payload.progress || 0) * 100));
          setTasks(prev => prev.map(t => t.id === id ? { ...t, progress: prog > 0 ? prog : t.progress, speedStr: 'Processing...' } : t));
        } else if (type === 'DONE') {
          const { blob, time } = payload;
          const speed = (time / 1000).toFixed(1);
          const previewUrl = URL.createObjectURL(blob);
          setTasks(prev => prev.map(t => t.id === id ? { ...t, status: 'done', progress: 100, speedStr: `Converted in ${speed}s`, blob, previewUrl } : t));
          ffmpegWorker.terminate();
        } else if (type === 'ERROR') {
          setTasks(prev => prev.map(t => t.id === id ? { ...t, status: 'error', error: payload?.error || 'Conversion failed' } : t));
          ffmpegWorker.terminate();
        }
      };

      ffmpegWorker.onerror = (err) => {
        setTasks(prev => prev.map(t => t.id === id ? { ...t, status: 'error', error: err.message || 'Engine error' } : t));
        ffmpegWorker.terminate();
      };

      ffmpegWorker.postMessage({ type: 'INIT' });
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      setTasks(prev => prev.map(t => t.id === id ? { ...t, status: 'error', error: errorMsg || 'Unable to decode audio format' } : t));
    }
  }, []);

  const handleDecodeFallback = useCallback(async (id: string, file: File, workerObj: { worker: Worker; isBusy: boolean }, currentKbps: number) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtxClass) {
        throw new Error('Web Audio decoder not supported');
      }
      const audioCtx = new AudioCtxClass();
      const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer.slice(0));

      const sampleRate = audioBuffer.sampleRate;
      const numChannels = Math.min(2, audioBuffer.numberOfChannels);
      const left = audioBuffer.getChannelData(0);
      const right = numChannels === 2 ? audioBuffer.getChannelData(1) : undefined;

      const leftCopy = new Float32Array(left);
      const rightCopy = right ? new Float32Array(right) : undefined;
      const transferables = rightCopy ? [leftCopy.buffer, rightCopy.buffer] : [leftCopy.buffer];

      workerObj.worker.postMessage({
        type: 'ENCODE_RAW_PCM',
        id,
        left: leftCopy.buffer,
        right: rightCopy ? rightCopy.buffer : undefined,
        sampleRate,
        numChannels,
        config: { kbps: currentKbps }
      }, transferables);

      if (audioCtx.state !== 'closed') {
        audioCtx.close().catch(() => {});
      }
    } catch {
      // If Web Audio API cannot decode (e.g. ADPCM, proprietary codec, or unusual container), fallback to FFmpeg WASM
      if (workerObj) workerObj.isBusy = false;
      fallbackWithFFmpeg(id, file, currentKbps);
    }
  }, [fallbackWithFFmpeg]);

  useEffect(() => {
    const pool: { worker: Worker; isBusy: boolean }[] = [];
    const concurrency = typeof navigator !== 'undefined' && navigator.hardwareConcurrency ? navigator.hardwareConcurrency : 4;
    
    for (let i = 0; i < concurrency; i++) {
      const worker = new Worker('/wav-worker.js?v=2.3.0');
      
      worker.onmessage = (e: MessageEvent) => {
        const { type, id, progress, speedStr, blob, error } = e.data;
        
        if (type === 'FALLBACK_TO_DECODE') {
          const task = tasksRef.current.find(t => t.id === id);
          if (task && pool[i]) {
            handleDecodeFallback(id, task.file, pool[i], kbpsRef.current);
            return;
          }
        }

        if (type === 'FALLBACK_TO_FFMPEG') {
          const task = tasksRef.current.find(t => t.id === id);
          if (pool[i]) pool[i].isBusy = false;
          if (task) {
            fallbackWithFFmpeg(id, task.file, kbpsRef.current);
            return;
          }
        }

        if (type === 'done' || type === 'error') {
          if (pool[i]) pool[i].isBusy = false;
        }

        setTasks(prev => prev.map(t => {
          if (t.id === id) {
            if (type === 'progress') return { ...t, progress: progress * 100, speedStr };
            if (type === 'done') {
              const previewUrl = URL.createObjectURL(blob);
              return { ...t, status: 'done', progress: 100, blob, previewUrl };
            }
            if (type === 'error') return { ...t, status: 'error', error };
          }
          return t;
        }));
      };
      
      pool.push({ worker, isBusy: false });
    }
    
    workers.current = pool;
    
    return () => {
      pool.forEach(w => w.worker.terminate());
      workers.current = [];
    };
  }, [handleDecodeFallback, fallbackWithFFmpeg]); // Only initialize workers once

  useEffect(() => {
    const pendingTasks = tasks.filter(t => t.status === 'pending');
    if (pendingTasks.length === 0) return;

    const startedIds: string[] = [];
    
    for (const pTask of pendingTasks) {
      const freeWorker = workers.current.find(w => !w.isBusy);
      if (!freeWorker) break;
      
      freeWorker.isBusy = true;
      freeWorker.worker.postMessage({ id: pTask.id, file: pTask.file, config: { kbps } });
      startedIds.push(pTask.id);
    }

    if (startedIds.length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTasks(prev => prev.map(t => 
        startedIds.includes(t.id) ? { ...t, status: 'processing' } : t
      ));
    }
  }, [tasks, kbps]);

  const addFiles = (files: File[]) => {
    const wavFiles = files.filter(f => f.name.toLowerCase().endsWith('.wav'));
    if (wavFiles.length === 0) {
      alert(t('alert_wav_only'));
      return;
    }

    const newTasks = wavFiles.map(file => ({
      id: Math.random().toString(36).substring(7),
      file,
      progress: 0,
      status: 'pending' as const
    }));

    setTasks(prev => [...prev, ...newTasks]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      addFiles(Array.from(e.dataTransfer.files));
    }
  };

  const downloadAll = async () => {
    const doneTasks = tasks.filter(t => t.status === 'done' && t.blob);
    if (doneTasks.length === 0) return;

    const zip = new JSZip();
    doneTasks.forEach(t => {
      const name = t.file.name.replace(/\.wav$/i, '.mp3');
      zip.file(name, t.blob!);
    });

    const content = await zip.generateAsync({ type: 'blob' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(content);
    link.download = 'converted_mp3s.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const removeTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };


  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    if (isSharing) return;
    const shareData = {
      title: t('share_title'),
      text: t('share_text'),
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare(shareData)) {
      setIsSharing(true);
      try {
        await navigator.share(shareData);
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== 'AbortError' && !err.message.includes('Share canceled')) {
          console.error('Error sharing:', err);
        }
      } finally {
        setIsSharing(false);
      }
    } else {
      navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`);
      alert(t('share_copied'));
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-12 px-4 sm:px-6">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight mb-4">
          {t('title_prefix')} <span className="text-indigo-400">{t('title_highlight')}</span>
        </h1>
        <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">
          {t('description')}
        </p>
      </div>

      {/* Controls */}
      <div className="bg-surface-container-highest/50 rounded-2xl p-6 border border-outline/50 mb-8 backdrop-blur-sm shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-on-surface">{t('audio_quality')}</h3>
              <p className="text-xs text-on-surface-variant">{t('select_bitrate')}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {[320, 256, 192, 128].map((rate) => (
              <button
                key={rate}
                onClick={() => setKbps(rate)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  kbps === rate 
                    ? 'bg-indigo-500 text-on-surface shadow-lg shadow-indigo-500/25 ring-2 ring-indigo-400 ring-offset-2 ring-offset-slate-900' 
                    : 'bg-surface-container-highest/50 text-on-surface-variant hover:bg-surface-container-highest'
                }`}
              >
                {rate} {t('kbps')} {rate === 320 && t('best')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Upload Zone */}
      <div 
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`relative group border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 ${
          isDragging 
            ? 'border-indigo-400 bg-indigo-500/10' 
            : 'border-outline hover:border-indigo-500/50 hover:bg-surface-container-highest/40'
        }`}
      >
        <input 
          type="file" 
          multiple 
          accept=".wav,audio/wav,audio/x-wav"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          onChange={(e) => e.target.files && addFiles(Array.from(e.target.files))}
        />
        <div className="mx-auto w-20 h-20 mb-6 bg-surface-container-highest rounded-full flex items-center justify-center shadow-lg border border-outline transition-all duration-300 group-hover:scale-110 group-hover:border-indigo-400/50 group-hover:shadow-indigo-500/20">
          <UploadCloud className="w-10 h-10 text-indigo-400 transition-colors duration-300 group-hover:text-indigo-300" />
        </div>
        <h3 className="text-xl font-semibold text-on-surface mb-2 transition-colors duration-300 group-hover:text-indigo-50">{t('drop_title')}</h3>
        <p className="text-on-surface-variant text-sm max-w-sm mx-auto transition-colors duration-300 group-hover:text-on-surface-variant">
          {t('drop_desc')}
        </p>
      </div>

      {/* Task List */}
      {tasks.length > 0 && (
        <div className="mt-8 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-on-surface">{t('conversion_queue')}</h2>
            {tasks.filter(t => t.status === 'done').length > 0 && (
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-on-surface font-medium rounded-lg transition-colors text-sm"
                  title={t('share_tool_title')}
                >
                  <Share2 className="w-4 h-4" />
                  {t('share_tool')}
                </button>
                {tasks.filter(t => t.status === 'done').length > 1 && (
                  <button 
                    onClick={downloadAll}
                    className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-lg transition-colors text-sm"
                  >
                    <Archive className="w-4 h-4" />
                    {t('download_all')}
                  </button>
                )}
              </div>
            )}
          </div>
          
          <AnimatePresence>
            {tasks.map(task => (
              <motion.div 
                key={task.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-surface-container-highest/80 rounded-xl p-4 border border-outline/50 shadow-sm flex flex-col md:flex-row items-center gap-4"
              >
                <div className="p-3 bg-surface-container-high/50 rounded-lg shrink-0">
                  <FileAudio className="w-6 h-6 text-indigo-400" />
                </div>
                
                <div className="flex-1 w-full min-w-0">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-sm font-medium text-on-surface truncate pr-4">{task.file.name}</p>
                    <button onClick={() => removeTask(task.id)} className="text-outline hover:text-red-400 shrink-0">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {task.status === 'processing' && (
                    <div className="space-y-1.5">
                      <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-indigo-500 transition-all duration-300 ease-out" 
                          style={{ width: `${task.progress}%` }} 
                        />
                      </div>
                      <div className="flex justify-between text-xs text-on-surface-variant">
                        <span>{Math.round(task.progress)}%</span>
                        <span>{task.speedStr || t('converting')}</span>
                      </div>
                    </div>
                  )}

                  {task.status === 'pending' && <p className="text-xs text-outline">{t('waiting_in_queue')}</p>}
                  {task.status === 'error' && <p className="text-xs text-red-400">{t('error_prefix')}: {task.error}</p>}
                  
                  {task.status === 'done' && (
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-400"></span> {t('completed')}
                      </span>
                      <audio controls src={task.previewUrl} className="h-8 flex-1 max-w-[200px]" />
                    </div>
                  )}
                </div>

                {task.status === 'done' && (
                  <div className="shrink-0 flex items-center gap-2">
                    <button
                      onClick={handleShare}
                      className="flex items-center gap-2 px-3 py-2 bg-surface-container-highest hover:bg-surface-container-highest text-on-surface-variant rounded-lg transition-colors text-sm font-medium border border-outline"
                      title={t('share_title_attr')}
                    >
                      <Share2 className="w-4 h-4" />
                      <span className="hidden sm:inline">{t('share')}</span>
                    </button>
                    <a 
                      href={task.previewUrl} 
                      download={task.file.name.replace(/\.wav$/i, '.mp3')}
                      className="flex items-center gap-2 px-4 py-2 bg-surface-container-highest hover:bg-outline-variant/30 text-on-surface rounded-lg transition-colors text-sm font-medium"
                    >
                      <Download className="w-4 h-4" />
                      {t('download_mp3')}
                    </a>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
