'use client';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { UploadCloud, Video, FileAudio, Settings, Download, PlayCircle, Loader2, X, Archive, CheckCircle2, AlertCircle } from 'lucide-react';
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

export default function VideoToMp3Converter() {
  const t = useTranslations('video_converter');
  const [tasks, setTasks] = useState<ConversionTask[]>([]);
  const [quality, setQuality] = useState('320'); // 320, 256, 192, 128, vbr-v0
  const [isDragging, setIsDragging] = useState(false);
  const [isFfmpegLoaded, setIsFfmpegLoaded] = useState(false);
  const [loadingPhase, setLoadingPhase] = useState("Initializing Engine...");
  const [initError, setInitError] = useState<string | null>(null);
  const workerRef = useRef<Worker | null>(null);
  
  const processNextTask = useCallback(() => {
    setTasks(prev => {
      const isProcessing = prev.some(t => t.status === 'processing');
      if (isProcessing || !workerRef.current || !isFfmpegLoaded) return prev;

      const nextPendingIndex = prev.findIndex(t => t.status === 'pending');
      if (nextPendingIndex === -1) return prev;

      const newTasks = [...prev];
      newTasks[nextPendingIndex] = { ...newTasks[nextPendingIndex], status: 'processing' };
      
      const task = newTasks[nextPendingIndex];
      workerRef.current!.postMessage({
        type: 'CONVERT',
        payload: { file: task.file, quality, id: task.id }
      });
      
      return newTasks;
    });
  }, [quality, isFfmpegLoaded]);

  // Initialize FFmpeg worker
  useEffect(() => {
    workerRef.current = new Worker(`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/ffmpeg-worker.js?v=2.0.1`);
    
    workerRef.current.onerror = (err) => {
      console.error("Worker load error", err);
      setInitError(err.message || 'Worker Failed to Load');
    };
    
    workerRef.current.onmessage = (e) => {
      const { type, payload } = e.data;
      
      if (type === "LOG") {
        console.log("[FFmpeg LOG]", payload);
      } else if (type === "PHASE") {
        console.log("[FFmpeg PHASE]", payload);
        setLoadingPhase(payload);
      } else
      if (type === 'INIT_DONE') {
        setIsFfmpegLoaded(true);
      } else if (type === 'PROGRESS') {
        console.log("[FFmpeg PROGRESS]", payload);
        // e.g., { progress: 0.5, time: 1000000 }
        setTasks(prev => {
          // Since FFmpeg process is single-threaded (in this worker), 
          // we update the one currently 'processing'.
          const processingIndex = prev.findIndex(t => t.status === 'processing');
          if (processingIndex === -1) return prev;
          
          const newTasks = [...prev];
          const task = newTasks[processingIndex];
          const prog = Math.min(100, Math.round((payload.progress || 0) * 100));
          
          newTasks[processingIndex] = {
            ...task,
            progress: prog > 0 ? prog : task.progress
          };
          return newTasks;
        });
      } else if (type === 'DONE') {
        const { id, blob, time } = payload;
        const speed = (time / 1000).toFixed(1);
        setTasks(prev => prev.map(t => {
          if (t.id === id) {
            return {
              ...t,
              status: 'done',
              progress: 100,
              speedStr: `Extracted in ${speed}s`,
              blob,
              previewUrl: URL.createObjectURL(blob)
            };
          }
          return t;
        }));
        
        // Trigger next task
        setTimeout(() => processNextTask(), 100);
      } else if (type === 'ERROR') {
        const { id, error } = payload;
        if (id) {
          setTasks(prev => prev.map(t => t.id === id ? { ...t, status: 'error', error } : t));
          setTimeout(() => processNextTask(), 100);
        } else {
          setInitError(error);
          console.error("FFmpeg Worker Error:", error);
        }
      }
    };

    workerRef.current.postMessage({ type: 'INIT' });

    return () => {
      workerRef.current?.terminate();
       
      tasks.forEach(t => t.previewUrl && URL.revokeObjectURL(t.previewUrl));
    };
  }, []);

  // When tasks are added or ffmpeg loads, try to process
  useEffect(() => {
    processNextTask();
  }, [tasks.length, processNextTask]);

  const handleFiles = (files: FileList | File[]) => {
    const validExts = ['.mp4', '.mov', '.mkv', '.webm', '.avi', '.flv'];
    const newTasks: ConversionTask[] = [];

    Array.from(files).forEach(file => {
      const name = file.name.toLowerCase();
      if (validExts.some(ext => name.endsWith(ext))) {
        newTasks.push({
          id: Math.random().toString(36).substring(2, 9),
          file,
          progress: 0,
          status: 'pending'
        });
      }
    });

    if (newTasks.length > 0) {
      setTasks(prev => [...prev, ...newTasks]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.length) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const removeTask = (id: string) => {
    setTasks(prev => {
      const task = prev.find(t => t.id === id);
      if (task?.previewUrl) URL.revokeObjectURL(task.previewUrl);
      return prev.filter(t => t.id !== id);
    });
  };

  const downloadAll = async () => {
    const doneTasks = tasks.filter(t => t.status === 'done' && t.blob);
    if (doneTasks.length === 0) return;

    if (doneTasks.length === 1) {
      const link = document.createElement('a');
      link.href = doneTasks[0].previewUrl!;
      link.download = doneTasks[0].file.name.replace(/\.[^/.]+$/, "") + ".mp3";
      link.click();
      return;
    }

    const zip = new JSZip();
    doneTasks.forEach(t => {
      const name = t.file.name.replace(/\.[^/.]+$/, "") + ".mp3";
      zip.file(name, t.blob!);
    });

    const content = await zip.generateAsync({ type: "blob" });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(content);
    link.download = "Extracted_Audio.zip";
    link.click();
  };

  const formatSize = (bytes: number) => {
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">
      {/* Configuration Area */}
      <div className="bg-surface-container border border-outline-variant/30 rounded-3xl p-6 sm:p-10 flex flex-col gap-8 items-center text-center">
        <div className="flex flex-col items-center max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-on-surface mb-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 leading-tight">
            <Video className="w-10 h-10 sm:w-12 sm:h-12 text-primary hidden sm:block shrink-0" strokeWidth={2.5} />
            {t.rich('title', { highlight: (chunks) => <span className="text-orange-500">{chunks}</span> })}
          </h1>
          <p className="text-on-surface-variant text-base">
            {t('subtitle')}
          </p>
        </div>
        
        <div className="flex items-center gap-3 bg-surface p-3 px-6 rounded-2xl border border-outline-variant/30 shrink-0">
          <Settings className="w-5 h-5 text-primary" />
          <div className="flex flex-col">
            <label className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">{t('audio_quality')}</label>
            <select 
              value={quality}
              onChange={(e) => setQuality(e.target.value)}
              className="bg-transparent text-sm font-semibold text-on-surface outline-none cursor-pointer"
            >
              <option value="320">{t('kbps_320')}</option>
              <option value="256">{t('kbps_256')}</option>
              <option value="192">{t('kbps_192')}</option>
              <option value="128">{t('kbps_128')}</option>
              <option value="vbr-v0">{t('vbr_v0')}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Drag & Drop Zone */}
      <div 
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
        onDrop={handleDrop}
        className={`relative w-full aspect-[21/9] min-h-[200px] border-2 border-dashed rounded-3xl flex flex-col items-center justify-center p-6 text-center transition-all ${
          isDragging ? 'border-primary bg-primary/5 scale-[1.01]' : 'border-outline-variant/50 bg-surface hover:border-primary/50'
        }`}
      >
        <input 
          type="file" 
          multiple 
          accept=".mp4,.mov,.mkv,.webm,.avi,.flv,video/*"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          onChange={(e) => {
            if (e.target.files?.length) {
              handleFiles(e.target.files);
              e.target.value = ''; // Reset
            }
          }}
        />
        
        <div className={`w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 transition-transform ${isDragging ? 'scale-110' : ''}`}>
          <UploadCloud className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-xl font-bold text-on-surface mb-2">{t('drop_videos')}</h3>
        <p className="text-on-surface-variant max-w-sm mb-4">{t('supports')}</p>
        <button className="bg-primary hover:bg-primary/90 text-on-primary px-6 py-2.5 rounded-xl font-semibold transition-colors shadow-lg shadow-primary/20 pointer-events-none">{t('select_files')}</button>
        
        {!isFfmpegLoaded && initError && (
          <div className="mt-6 flex items-center justify-center gap-2 text-xs font-medium bg-red-500/10 text-red-500 px-3 py-1.5 rounded-full border border-red-500/20">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{t('failed_to_load')} {initError}</span>
          </div>
        )}
      </div>

      {/* Task List */}
      <AnimatePresence>
        {tasks.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-3"
          >
            <div className="flex items-center justify-between px-4 py-2 bg-surface-container rounded-2xl border border-outline-variant/30">
              <span className="font-semibold text-sm">{t('processing_files', { count: tasks.length })}</span>
              <button 
                onClick={downloadAll}
                disabled={!tasks.some(t => t.status === 'done')}
                className="flex items-center gap-2 bg-primary/10 text-primary hover:bg-primary/20 px-4 py-1.5 rounded-xl text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Archive className="w-4 h-4" /> {t('download_zip')}
              </button>
            </div>

            {tasks.map(task => (
              <motion.div 
                key={task.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-surface border border-outline-variant/30 rounded-2xl p-4 flex flex-col gap-3"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 shrink-0 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    {task.status === 'done' ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : 
                     task.status === 'error' ? <AlertCircle className="w-5 h-5 text-red-500" /> :
                     <Video className="w-5 h-5" />}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-on-surface truncate pr-4">{task.file.name}</p>
                    <div className="flex items-center gap-3 text-xs text-on-surface-variant mt-1">
                      <span>{formatSize(task.file.size)}</span>
                      {task.status === 'processing' && <span className="text-primary font-medium animate-pulse">{t('extracting', { progress: task.progress })}</span>}
                      {task.status === 'done' && <span className="text-emerald-500 font-medium">{task.speedStr}</span>}
                      {task.status === 'error' && <span className="text-red-500 font-medium">{task.error}</span>}
                      {task.status === 'pending' && !isFfmpegLoaded && <span className="text-primary font-medium animate-pulse">{t('waiting')}</span>}
                      {task.status === 'pending' && isFfmpegLoaded && <span className="text-on-surface-variant font-medium">{t('queued')}</span>}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {task.status === 'done' && task.previewUrl && (
                      <>
                        <audio controls src={task.previewUrl} className="h-8 w-32 md:w-48 hidden sm:block" />
                        <a 
                          href={task.previewUrl} 
                          download={task.file.name.replace(/\.[^/.]+$/, "") + ".mp3"}
                          className="w-8 h-8 flex items-center justify-center bg-primary text-on-primary rounded-lg hover:bg-primary/90 transition-colors"
                        >
                          <Download className="w-4 h-4" />
                        </a>
                      </>
                    )}
                    <button 
                      onClick={() => removeTask(task.id)}
                      className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {task.status === 'processing' && (
                  <div className="w-full bg-outline-variant/30 h-1.5 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: `${task.progress}%` }}
                      transition={{ ease: "linear", duration: 0.2 }}
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
