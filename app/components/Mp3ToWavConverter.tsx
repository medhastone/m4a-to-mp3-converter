'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  UploadCloud,
  FileAudio,
  Settings,
  Download,
  Play,
  Pause,
  Trash2,
  Archive,
  RefreshCw,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Cpu,
  Layers,
  Sparkles,
  Sliders,
  Volume2
} from 'lucide-react';
import JSZip from 'jszip';
import { useTranslations } from 'next-intl';

export type BitDepth = 16 | 24 | 32;
export type SampleRate = 44100 | 48000 | 96000;
export type ChannelMode = 'stereo' | 'mono';

interface QueueItem {
  id: string;
  file: File;
  originalSize: number;
  status: 'idle' | 'decoding' | 'encoding' | 'done' | 'error';
  progress: number;
  speedStr?: string;
  error?: string;
  wavBlob?: Blob;
  wavSize?: number;
  previewUrl?: string;
}

/**
 * Encodes Float32Array channel data into a valid RIFF WAVE buffer
 */
function encodeWavBuffer(
  channels: Float32Array[],
  sampleRate: number,
  bitDepth: BitDepth
): ArrayBuffer {
  const numChannels = channels.length;
  const numSamples = channels[0].length;
  const bytesPerSample = bitDepth / 8;
  const blockAlign = numChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const dataByteLength = numSamples * blockAlign;
  const totalBufferSize = 44 + dataByteLength;

  const buffer = new ArrayBuffer(totalBufferSize);
  const view = new DataView(buffer);

  // RIFF identifier 'RIFF'
  view.setUint32(0, 0x52494646, false);
  // RIFF chunk length
  view.setUint32(4, 36 + dataByteLength, true);
  // RIFF format 'WAVE'
  view.setUint32(8, 0x57415645, false);

  // Format subchunk 'fmt '
  view.setUint32(12, 0x666d7420, false);
  // Subchunk1 size (16 for standard PCM)
  view.setUint32(16, 16, true);
  // Audio format (1 = PCM, 3 = IEEE 754 float)
  const formatTag = bitDepth === 32 ? 3 : 1;
  view.setUint16(20, formatTag, true);
  // Number of channels
  view.setUint16(22, numChannels, true);
  // Sample rate
  view.setUint32(24, sampleRate, true);
  // Byte rate
  view.setUint32(28, byteRate, true);
  // Block align
  view.setUint16(32, blockAlign, true);
  // Bits per sample
  view.setUint16(34, bitDepth, true);

  // Data subchunk 'data'
  view.setUint32(36, 0x64617461, false);
  // Data length
  view.setUint32(40, dataByteLength, true);

  // Write audio samples
  let offset = 44;
  if (bitDepth === 16) {
    for (let i = 0; i < numSamples; i++) {
      for (let ch = 0; ch < numChannels; ch++) {
        let sample = channels[ch][i];
        sample = Math.max(-1, Math.min(1, sample));
        const int16 = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
        view.setInt16(offset, int16, true);
        offset += 2;
      }
    }
  } else if (bitDepth === 24) {
    for (let i = 0; i < numSamples; i++) {
      for (let ch = 0; ch < numChannels; ch++) {
        let sample = channels[ch][i];
        sample = Math.max(-1, Math.min(1, sample));
        const int24 = sample < 0 ? sample * 0x800000 : sample * 0x7fffff;
        const rounded = Math.round(int24);
        view.setUint8(offset, rounded & 0xff);
        view.setUint8(offset + 1, (rounded >> 8) & 0xff);
        view.setUint8(offset + 2, (rounded >> 16) & 0xff);
        offset += 3;
      }
    }
  } else if (bitDepth === 32) {
    for (let i = 0; i < numSamples; i++) {
      for (let ch = 0; ch < numChannels; ch++) {
        view.setFloat32(offset, channels[ch][i], true);
        offset += 4;
      }
    }
  }

  return buffer;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export default function Mp3ToWavConverter() {
  const t = useTranslations('mp3_to_wav');
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [bitDepth, setBitDepth] = useState<BitDepth>(24);
  const [sampleRate, setSampleRate] = useState<SampleRate>(48000);
  const [channelMode, setChannelMode] = useState<ChannelMode>('stereo');
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessingAll, setIsProcessingAll] = useState(false);
  const [activePlayingId, setActivePlayingId] = useState<string | null>(null);
  const [isZipping, setIsZipping] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      queue.forEach((item) => {
        if (item.previewUrl) {
          URL.revokeObjectURL(item.previewUrl);
        }
      });
    };
  }, [queue]);

  const addFilesToQueue = (files: FileList | File[]) => {
    const newItems: QueueItem[] = [];
    const validExtensions = ['.mp3', '.mpeg', '.mpga'];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const nameLower = file.name.toLowerCase();
      const isValid = validExtensions.some((ext) => nameLower.endsWith(ext)) || file.type.includes('audio');

      if (isValid) {
        newItems.push({
          id: `${file.name}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          file,
          originalSize: file.size,
          status: 'idle',
          progress: 0,
        });
      }
    }

    if (newItems.length > 0) {
      setQueue((prev) => [...prev, ...newItems]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFilesToQueue(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const removeItem = (id: string) => {
    setQueue((prev) => {
      const item = prev.find((i) => i.id === id);
      if (item?.previewUrl) {
        URL.revokeObjectURL(item.previewUrl);
      }
      return prev.filter((i) => i.id !== id);
    });
    if (activePlayingId === id) {
      setActivePlayingId(null);
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
      }
    }
  };

  const clearCompleted = () => {
    setQueue((prev) => {
      prev.forEach((item) => {
        if (item.status === 'done' && item.previewUrl) {
          URL.revokeObjectURL(item.previewUrl);
        }
      });
      return prev.filter((item) => item.status !== 'done');
    });
  };

  /**
   * Process a single MP3 file via in-browser Web Audio API & high-precision resampler
   */
  const processSingleItem = useCallback(
    async (item: QueueItem, targetBitDepth: BitDepth, targetRate: SampleRate, targetChannels: ChannelMode) => {
      const startTime = performance.now();

      // Update state: Decoding
      setQueue((prev) =>
        prev.map((i) =>
          i.id === item.id
            ? { ...i, status: 'decoding', progress: 20, speedStr: 'Decoding MP3 frames in RAM...' }
            : i
        )
      );

      try {
        const arrayBuffer = await item.file.arrayBuffer();

        // Browser Web Audio API AudioContext
        const AudioCtxClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

        if (!AudioCtxClass) {
          throw new Error('Web Audio decoder is not supported in this browser.');
        }

        const audioCtx = new AudioCtxClass();
        const decodedBuffer = await audioCtx.decodeAudioData(arrayBuffer);

        // Update state: Resampling & Quantizing
        setQueue((prev) =>
          prev.map((i) =>
            i.id === item.id
              ? { ...i, status: 'encoding', progress: 55, speedStr: 'Resampling & quantizing Linear PCM...' }
              : i
          )
        );

        let finalAudioBuffer: AudioBuffer = decodedBuffer;

        // Perform hardware-accelerated polyphase resampling if target rate differs
        if (decodedBuffer.sampleRate !== targetRate) {
          const numChannels = decodedBuffer.numberOfChannels;
          const targetLength = Math.ceil(decodedBuffer.duration * targetRate);
          const offlineCtx = new OfflineAudioContext(numChannels, targetLength, targetRate);

          const bufferSource = offlineCtx.createBufferSource();
          bufferSource.buffer = decodedBuffer;
          bufferSource.connect(offlineCtx.destination);
          bufferSource.start(0);

          finalAudioBuffer = await offlineCtx.startRendering();
        }

        // Channel management: Stereo vs Mono
        let channelsToEncode: Float32Array[] = [];
        const bufferChannels = finalAudioBuffer.numberOfChannels;

        if (targetChannels === 'mono') {
          const monoLength = finalAudioBuffer.length;
          const monoData = new Float32Array(monoLength);
          if (bufferChannels >= 2) {
            const left = finalAudioBuffer.getChannelData(0);
            const right = finalAudioBuffer.getChannelData(1);
            for (let s = 0; s < monoLength; s++) {
              monoData[s] = (left[s] + right[s]) * 0.5;
            }
          } else {
            monoData.set(finalAudioBuffer.getChannelData(0));
          }
          channelsToEncode = [monoData];
        } else {
          // Stereo (2 Channels)
          const left = finalAudioBuffer.getChannelData(0);
          const right = bufferChannels >= 2 ? finalAudioBuffer.getChannelData(1) : left;
          channelsToEncode = [left, right];
        }

        setQueue((prev) =>
          prev.map((i) =>
            i.id === item.id
              ? { ...i, progress: 85, speedStr: `Writing ${targetBitDepth}-bit RIFF header...` }
              : i
          )
        );

        // Encode to WAV format
        const wavArrayBuffer = encodeWavBuffer(channelsToEncode, targetRate, targetBitDepth);
        const wavBlob = new Blob([wavArrayBuffer], { type: 'audio/wav' });
        const previewUrl = URL.createObjectURL(wavBlob);
        const elapsedSec = ((performance.now() - startTime) / 1000).toFixed(2);

        setQueue((prev) =>
          prev.map((i) =>
            i.id === item.id
              ? {
                  ...i,
                  status: 'done',
                  progress: 100,
                  wavBlob,
                  wavSize: wavBlob.size,
                  previewUrl,
                  speedStr: `Decoded in ${elapsedSec}s (RAM)`,
                }
              : i
          )
        );
      } catch (err: unknown) {
        const errorMsg = err instanceof Error ? err.message : 'Audio decoding failed';
        setQueue((prev) =>
          prev.map((i) =>
            i.id === item.id
              ? { ...i, status: 'error', progress: 0, error: errorMsg }
              : i
          )
        );
      }
    },
    []
  );

  /**
   * Execute batch / mass conversion for all pending items
   */
  const handleConvertAll = async () => {
    const pending = queue.filter((i) => i.status === 'idle' || i.status === 'error');
    if (pending.length === 0) return;

    setIsProcessingAll(true);
    for (const item of pending) {
      await processSingleItem(item, bitDepth, sampleRate, channelMode);
    }
    setIsProcessingAll(false);
  };

  /**
   * Download individual converted WAV file
   */
  const handleDownloadSingle = (item: QueueItem) => {
    if (!item.wavBlob) return;
    const baseName = item.file.name.replace(/\.[^/.]+$/, '');
    const fileName = `${baseName}_${bitDepth}bit_${sampleRate / 1000}kHz.wav`;
    const url = URL.createObjectURL(item.wavBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  /**
   * Mass zip download for all completed WAV files
   */
  const handleDownloadZip = async () => {
    const completed = queue.filter((i) => i.status === 'done' && i.wavBlob);
    if (completed.length === 0) return;

    setIsZipping(true);
    try {
      const zip = new JSZip();
      completed.forEach((item) => {
        if (item.wavBlob) {
          const baseName = item.file.name.replace(/\.[^/.]+$/, '');
          const fileName = `${baseName}_${bitDepth}bit_${sampleRate / 1000}kHz.wav`;
          zip.file(fileName, item.wavBlob);
        }
      });

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `converted_wav_studio_${bitDepth}bit.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (err) {
      console.error('ZIP packaging failed:', err);
    } finally {
      setIsZipping(false);
    }
  };

  /**
   * Toggle in-browser audio preview
   */
  const handleTogglePlay = (id: string, previewUrl?: string) => {
    if (!previewUrl) return;

    if (activePlayingId === id) {
      audioPlayerRef.current?.pause();
      setActivePlayingId(null);
    } else {
      if (!audioPlayerRef.current) {
        audioPlayerRef.current = new Audio();
        audioPlayerRef.current.onended = () => setActivePlayingId(null);
      }
      audioPlayerRef.current.src = previewUrl;
      audioPlayerRef.current.play();
      setActivePlayingId(id);
    }
  };

  const completedCount = queue.filter((i) => i.status === 'done').length;
  const pendingCount = queue.filter((i) => i.status === 'idle' || i.status === 'error').length;

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6">
      {/* Tool Container: Dark Obsidian Glass Architecture */}
      <div className="rounded-3xl bg-[#0b0f17] border border-slate-800/80 shadow-2xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden text-slate-100">
        
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gradient-to-b from-orange-500/10 via-amber-500/5 to-transparent blur-3xl pointer-events-none" />

        {/* Audio Export Configuration Controls */}
        <div className="mb-6 pb-6 border-b border-slate-800/80">
          <div className="flex items-center gap-2 mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <Sliders className="w-4 h-4 text-orange-400" />
            <span>{t('export_config_title')}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Bit Depth Selector */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="bit-depth-select" className="text-xs font-medium text-slate-300 flex items-center justify-between">
                <span>{t('bit_depth_label')}</span>
                <span className="text-[10px] text-orange-400 font-mono">{t('dynamic_range_badge')}</span>
              </label>
              <select
                id="bit-depth-select"
                value={bitDepth}
                onChange={(e) => setBitDepth(Number(e.target.value) as BitDepth)}
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-medium text-slate-100 focus:outline-none focus:border-orange-500 transition-colors cursor-pointer"
              >
                <option value={16}>{t('opt_16bit')}</option>
                <option value={24}>{t('opt_24bit')}</option>
                <option value={32}>{t('opt_32bit')}</option>
              </select>
              <p className="text-[11px] text-slate-400 leading-tight">
                {bitDepth === 16 && t('hint_16bit')}
                {bitDepth === 24 && t('hint_24bit')}
                {bitDepth === 32 && t('hint_32bit')}
              </p>
            </div>

            {/* Sample Rate Selector */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="sample-rate-select" className="text-xs font-medium text-slate-300 flex items-center justify-between">
                <span>{t('sample_rate_label')}</span>
                <span className="text-[10px] text-orange-400 font-mono">{t('bandwidth_badge')}</span>
              </label>
              <select
                id="sample-rate-select"
                value={sampleRate}
                onChange={(e) => setSampleRate(Number(e.target.value) as SampleRate)}
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-medium text-slate-100 focus:outline-none focus:border-orange-500 transition-colors cursor-pointer"
              >
                <option value={44100}>{t('opt_44k')}</option>
                <option value={48000}>{t('opt_48k')}</option>
                <option value={96000}>{t('opt_96k')}</option>
              </select>
              <p className="text-[11px] text-slate-400 leading-tight">
                {t('hint_sample_rate', { khz: sampleRate / 2000 })}
              </p>
            </div>

            {/* Audio Channels Selector */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="channels-select" className="text-xs font-medium text-slate-300 flex items-center justify-between">
                <span>{t('channels_label')}</span>
                <span className="text-[10px] text-orange-400 font-mono">{t('topology_badge')}</span>
              </label>
              <select
                id="channels-select"
                value={channelMode}
                onChange={(e) => setChannelMode(e.target.value as ChannelMode)}
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-medium text-slate-100 focus:outline-none focus:border-orange-500 transition-colors cursor-pointer"
              >
                <option value="stereo">{t('opt_stereo')}</option>
                <option value="mono">{t('opt_mono')}</option>
              </select>
              <p className="text-[11px] text-slate-400 leading-tight">
                {channelMode === 'stereo'
                  ? t('hint_stereo')
                  : t('hint_mono')}
              </p>
            </div>
          </div>
        </div>

        {/* Drag & Drop Zone */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`relative rounded-2xl border-2 border-dashed transition-all duration-200 cursor-pointer p-8 sm:p-12 flex flex-col items-center justify-center text-center group ${
            isDragging
              ? 'border-orange-500 bg-orange-500/10 scale-[0.99]'
              : 'border-slate-700/80 hover:border-slate-600 bg-slate-900/50 hover:bg-slate-900/80'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".mp3,audio/mpeg,audio/mp3"
            multiple
            className="hidden"
            onChange={(e) => {
              if (e.target.files) addFilesToQueue(e.target.files);
            }}
          />

          <div className="w-16 h-16 rounded-2xl bg-orange-500/15 border border-orange-500/30 text-orange-400 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-orange-500/20 transition-all duration-300">
            <UploadCloud className="w-8 h-8" />
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
            {t('dropzone_title')}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mb-4 leading-relaxed">
            {t('dropzone_desc')}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-800/90 text-slate-300 border border-slate-700/60">
              <Cpu className="w-3 h-3 text-orange-400" />
              {t('badge_wasm')}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-800/90 text-slate-300 border border-slate-700/60">
              <Layers className="w-3 h-3 text-orange-400" />
              {t('badge_batch')}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-800/90 text-slate-300 border border-slate-700/60">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              {t('badge_safe')}
            </span>
          </div>
        </div>

        {/* Queue / Items List */}
        {queue.length > 0 && (
          <div className="mt-6 flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-200">{t('files_queued', { count: queue.length })}</span>
                <span>•</span>
                <span>{t('files_completed', { count: completedCount })}</span>
              </div>
              <div className="flex items-center gap-3">
                {completedCount > 0 && (
                  <button
                    onClick={clearCompleted}
                    className="hover:text-slate-200 transition-colors cursor-pointer"
                  >
                    {t('clear_finished')}
                  </button>
                )}
                <button
                  onClick={() => setQueue([])}
                  className="hover:text-red-400 transition-colors cursor-pointer"
                >
                  {t('clear_all')}
                </button>
              </div>
            </div>

            {/* Queue Item Rows */}
            <div className="flex flex-col gap-2.5 max-h-[380px] overflow-y-auto pr-1">
              {queue.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col gap-2 transition-all hover:border-slate-700"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-slate-800 text-orange-400 flex items-center justify-center shrink-0">
                        <FileAudio className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white truncate">{item.file.name}</p>
                        <p className="text-xs text-slate-400">
                          {formatBytes(item.originalSize)}
                          {item.wavSize && (
                            <span className="text-emerald-400 font-mono ml-2">
                              → {formatBytes(item.wavSize)} ({bitDepth}-bit WAV)
                            </span>
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Actions / Status */}
                    <div className="flex items-center gap-2 shrink-0">
                      {item.status === 'idle' && (
                        <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 font-medium">
                          {t('ready')}
                        </span>
                      )}
                      {(item.status === 'decoding' || item.status === 'encoding') && (
                        <span className="text-[11px] px-2 py-0.5 rounded-md bg-orange-500/20 text-orange-300 font-medium animate-pulse flex items-center gap-1.5">
                          <RefreshCw className="w-3 h-3 animate-spin" />
                          {t('processing')}
                        </span>
                      )}
                      {item.status === 'done' && (
                        <>
                          {item.previewUrl && (
                            <button
                              onClick={() => handleTogglePlay(item.id, item.previewUrl)}
                              title={t('preview_title')}
                              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center transition-colors cursor-pointer"
                            >
                              {activePlayingId === item.id ? (
                                <Pause className="w-4 h-4 text-orange-400" />
                              ) : (
                                <Play className="w-4 h-4" />
                              )}
                            </button>
                          )}
                          <button
                            onClick={() => handleDownloadSingle(item)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-400 text-slate-950 font-bold text-xs transition-all shadow-md cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>{t('download_wav')}</span>
                          </button>
                        </>
                      )}
                      {item.status === 'error' && (
                        <span className="text-[11px] px-2 py-0.5 rounded-md bg-red-500/20 text-red-300 font-medium flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {t('failed')}
                        </span>
                      )}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="w-8 h-8 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-red-400 flex items-center justify-center transition-colors cursor-pointer"
                        title={t('remove')}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Progress Bar & Stage Status */}
                  {(item.status === 'decoding' || item.status === 'encoding' || item.status === 'done') && (
                    <div className="w-full flex flex-col gap-1">
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${
                            item.status === 'done' ? 'bg-emerald-500' : 'bg-orange-500'
                          }`}
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                      {item.speedStr && (
                        <div className="flex justify-between text-[10px] text-slate-400">
                          <span>{item.speedStr}</span>
                          <span>{item.progress}%</span>
                        </div>
                      )}
                    </div>
                  )}

                  {item.status === 'error' && item.error && (
                    <p className="text-xs text-red-400 bg-red-500/10 p-2 rounded-lg border border-red-500/20">
                      {item.error}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Global Action Bar */}
        <div className="mt-6 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{t('security_note')}</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {completedCount > 1 && (
              <button
                onClick={handleDownloadZip}
                disabled={isZipping}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold text-xs sm:text-sm border border-slate-700 transition-all cursor-pointer disabled:opacity-50"
              >
                <Archive className="w-4 h-4 text-orange-400" />
                <span>{isZipping ? t('packaging_zip') : t('download_all_zip', { count: completedCount })}</span>
              </button>
            )}

            <button
              onClick={handleConvertAll}
              disabled={isProcessingAll || pendingCount === 0}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-slate-950 font-bold text-sm sm:text-base shadow-lg shadow-orange-500/20 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessingAll ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>{t('converting_audio')}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>
                    {pendingCount > 0
                      ? t('convert_btn_count', { count: pendingCount })
                      : t('convert_btn')}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
