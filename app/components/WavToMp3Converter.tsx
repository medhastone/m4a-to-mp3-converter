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
  const workerPool = useRef<Worker[]>([]);
  const taskQueue = useRef<string[]>([]);
  const activeWorkers = useRef(0);

  const processNextTask = useCallback(() => {
    const concurrency = navigator.hardwareConcurrency || 4;
    
    setTasks(prev => {
      let updatedTasks = [...prev];
      let tasksChanged = false;
      
      while (activeWorkers.current < concurrency && taskQueue.current.length > 0) {
        const nextId = taskQueue.current.shift();
        if (!nextId) break;
        
        const taskIndex = updatedTasks.findIndex(t => t.id === nextId);
        if (taskIndex !== -1) {
          const task = updatedTasks[taskIndex];
          const worker = workerPool.current[activeWorkers.current % workerPool.current.length];
          activeWorkers.current++;
          worker.postMessage({ id: nextId, file: task.file, config: { kbps } });
          
          updatedTasks[taskIndex] = { ...task, status: 'processing' };
          tasksChanged = true;
        }
      }
      return tasksChanged ? updatedTasks : prev;
    });
  }, [kbps]);

  const handleWorkerMessage = useCallback((e: MessageEvent) => {
    const { type, id, progress, speedStr, blob, error } = e.data;
    
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

    if (type === 'done' || type === 'error') {
      activeWorkers.current--;
      processNextTask();
    }
  }, [processNextTask]);

  useEffect(() => {
    const pool: Worker[] = [];
    const concurrency = navigator.hardwareConcurrency || 4;
    for (let i = 0; i < concurrency; i++) {
      const worker = new Worker('/wav-worker.js');
      worker.onmessage = handleWorkerMessage;
      pool.push(worker);
    }
    workerPool.current = pool;
    
  
  return () => {
      pool.forEach(w => w.terminate());
      workerPool.current = [];
    };
  }, [handleWorkerMessage]);

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
    
    newTasks.forEach(t => {
      taskQueue.current.push(t.id);
    });
    processNextTask();
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


  const handleShare = async () => {
    const shareData = {
      title: t('share_title'),
      text: t('share_text'),
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`);
      alert(t('share_copied'));
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-12 px-4 sm:px-6">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
          {t('title_prefix')} <span className="text-indigo-400">{t('title_highlight')}</span>
        </h1>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto">
          {t('description')}
        </p>
      </div>

      {/* Controls */}
      <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 mb-8 backdrop-blur-sm shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">{t('audio_quality')}</h3>
              <p className="text-xs text-slate-400">{t('select_bitrate')}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {[320, 256, 192, 128].map((rate) => (
              <button
                key={rate}
                onClick={() => setKbps(rate)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  kbps === rate 
                    ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 ring-2 ring-indigo-400 ring-offset-2 ring-offset-slate-900' 
                    : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
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
            : 'border-slate-700 hover:border-indigo-500/50 hover:bg-slate-800/40'
        }`}
      >
        <input 
          type="file" 
          multiple 
          accept=".wav,audio/wav,audio/x-wav"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          onChange={(e) => e.target.files && addFiles(Array.from(e.target.files))}
        />
        <div className="mx-auto w-20 h-20 mb-6 bg-slate-800 rounded-full flex items-center justify-center shadow-lg border border-slate-700 transition-all duration-300 group-hover:scale-110 group-hover:border-indigo-400/50 group-hover:shadow-indigo-500/20">
          <UploadCloud className="w-10 h-10 text-indigo-400 transition-colors duration-300 group-hover:text-indigo-300" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2 transition-colors duration-300 group-hover:text-indigo-50">{t('drop_title')}</h3>
        <p className="text-slate-400 text-sm max-w-sm mx-auto transition-colors duration-300 group-hover:text-slate-300">
          {t('drop_desc')}
        </p>
      </div>

      {/* Task List */}
      {tasks.length > 0 && (
        <div className="mt-8 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">{t('conversion_queue')}</h2>
            {tasks.filter(t => t.status === 'done').length > 0 && (
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-lg transition-colors text-sm"
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
                className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50 shadow-sm flex flex-col md:flex-row items-center gap-4"
              >
                <div className="p-3 bg-slate-900/50 rounded-lg shrink-0">
                  <FileAudio className="w-6 h-6 text-indigo-400" />
                </div>
                
                <div className="flex-1 w-full min-w-0">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-sm font-medium text-white truncate pr-4">{task.file.name}</p>
                    <button onClick={() => removeTask(task.id)} className="text-slate-500 hover:text-red-400 shrink-0">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {task.status === 'processing' && (
                    <div className="space-y-1.5">
                      <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-indigo-500 transition-all duration-300 ease-out" 
                          style={{ width: `${task.progress}%` }} 
                        />
                      </div>
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>{Math.round(task.progress)}%</span>
                        <span>{task.speedStr || t('converting')}</span>
                      </div>
                    </div>
                  )}

                  {task.status === 'pending' && <p className="text-xs text-slate-500">{t('waiting_in_queue')}</p>}
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
                      className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors text-sm font-medium border border-slate-700"
                      title={t('share_title_attr')}
                    >
                      <Share2 className="w-4 h-4" />
                      <span className="hidden sm:inline">{t('share')}</span>
                    </button>
                    <a 
                      href={task.previewUrl} 
                      download={task.file.name.replace(/\.wav$/i, '.mp3')}
                      className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors text-sm font-medium"
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
