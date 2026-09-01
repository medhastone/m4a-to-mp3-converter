
'use client';

import React, { useState, useRef } from 'react';
import { Upload, CheckCircle, XCircle, Activity, Volume2, Mic, Settings, AlertTriangle, Download, FileAudio, Clock } from 'lucide-react';
import { useTranslations } from 'next-intl';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface AcxResults {
  peakDb: number;
  peakPass: boolean;
  rmsDb: number;
  rmsPass: boolean;
  noiseFloorDb: number;
  noisePass: boolean;
  sampleRate: number;
  sampleRatePass: boolean;
  channels: number;
  channelsPass: boolean;
  headSilenceSec: number;
  headSilencePass: boolean;
  tailSilenceSec: number;
  tailSilencePass: boolean;
  crestFactor: number;
  crestFactorPass: boolean;
  dcOffsetPercent: number;
  dcOffsetPass: boolean;
  overallPass: boolean;
  durationFormatted: string;
  issues: string[];
  peakViolations: string[];
  filename: string;
}

export default function AcxChecker() {
  const t = useTranslations('acx_checker');
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AcxResults | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      await processFile(file);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await processFile(file);
    }
  };

  const processFile = async (file: File) => {
    setError(null);
    setResults(null);
    setIsAnalyzing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const audioContext = new AudioContextClass();
      
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      
      const sampleRate = audioBuffer.sampleRate;
      const numberOfChannels = audioBuffer.numberOfChannels;
      const totalLength = audioBuffer.length;
      const durationSec = audioBuffer.duration;

      let maxPeakSample = 0;
      let globalSumSquares = 0;
      let dcOffsetSum = 0;

      // 1. Merge channels to mono array for unified acoustic energy evaluation
      const monoSamples = new Float32Array(totalLength);

      if (numberOfChannels === 1) {
        monoSamples.set(audioBuffer.getChannelData(0));
      } else {
        for (let ch = 0; ch < numberOfChannels; ch++) {
          const channelData = audioBuffer.getChannelData(ch);
          for (let i = 0; i < totalLength; i++) {
            monoSamples[i] += channelData[i] / numberOfChannels;
          }
        }
      }

      const peakViolations: string[] = [];
      const PEAK_THRESHOLD_LINEAR = Math.pow(10, -3.0 / 20);

      // 2. Measure Global Peak, Global Sum of Squares, DC Offset, and Peak Violations
      for (let i = 0; i < totalLength; i++) {
        const val = monoSamples[i];
        const absVal = Math.abs(val);
        
        if (absVal > maxPeakSample) {
          maxPeakSample = absVal;
        }
        
        if (absVal > PEAK_THRESHOLD_LINEAR && peakViolations.length < 20) {
           // To avoid spamming, only record if it's been at least 1 second since the last violation recorded
           const currentTime = i / sampleRate;
           const lastTime = peakViolations.length > 0 ? parseFloat(peakViolations[peakViolations.length - 1]) : -10;
           if (currentTime - lastTime > 1.0) {
               peakViolations.push(currentTime.toFixed(2));
           }
        }
        
        globalSumSquares += val * val;
        dcOffsetSum += val;
      }

      const peakDb = maxPeakSample > 0 ? 20 * Math.log10(maxPeakSample) : -100;
      const rmsMeanSquare = globalSumSquares / totalLength;
      const rmsDb = rmsMeanSquare > 0 ? 20 * Math.log10(Math.sqrt(rmsMeanSquare)) : -100;
      const dcOffsetPercent = (Math.abs(dcOffsetSum / totalLength)) * 100;
      const crestFactor = peakDb - rmsDb;

      // 3. Noise Floor Estimation: 500ms Sliding Window RMS
      const windowSize = Math.floor(sampleRate * 0.5); // 500ms
      const hopSize = Math.floor(sampleRate * 0.1);    // 100ms
      let minWindowRmsSquare = Infinity;

      if (totalLength >= windowSize) {
        let currentWindowSumSq = 0;
        for (let i = 0; i < windowSize; i++) {
          currentWindowSumSq += monoSamples[i] * monoSamples[i];
        }
        minWindowRmsSquare = currentWindowSumSq / windowSize;

        for (let start = hopSize; start + windowSize <= totalLength; start += hopSize) {
          let winSumSq = 0;
          for (let j = start; j < start + windowSize; j++) {
            winSumSq += monoSamples[j] * monoSamples[j];
          }
          const winRmsSq = winSumSq / windowSize;
          if (winRmsSq < minWindowRmsSquare) {
            minWindowRmsSquare = winRmsSq;
          }
        }
      } else {
        minWindowRmsSquare = rmsMeanSquare;
      }

      const noiseFloorDb = minWindowRmsSquare > 0 ? 20 * Math.log10(Math.sqrt(minWindowRmsSquare)) : -100;

      // 4. Head and Tail Silence
      // Define silence threshold (e.g., -40 dBFS) to detect start/end of speech
      const SILENCE_THRESHOLD = Math.pow(10, -40.0 / 20);
      let speechStartIndex = 0;
      let speechEndIndex = totalLength - 1;

      for (let i = 0; i < totalLength; i++) {
          if (Math.abs(monoSamples[i]) > SILENCE_THRESHOLD) {
              speechStartIndex = i;
              break;
          }
      }

      for (let i = totalLength - 1; i >= 0; i--) {
          if (Math.abs(monoSamples[i]) > SILENCE_THRESHOLD) {
              speechEndIndex = i;
              break;
          }
      }

      const headSilenceSec = speechStartIndex / sampleRate;
      const tailSilenceSec = (totalLength - 1 - speechEndIndex) / sampleRate;

      // 5. Evaluation & Issues Generation
      const peakPass = peakDb <= -3.0;
      const rmsPass = rmsDb >= -23.0 && rmsDb <= -18.0;
      const noisePass = noiseFloorDb <= -60.0;
      const sampleRatePass = sampleRate === 44100;
      const channelsPass = numberOfChannels === 1 || numberOfChannels === 2;
      const dcOffsetPass = dcOffsetPercent < 0.10;
      const crestFactorPass = crestFactor >= 12.0 && crestFactor <= 20.0;
      const headSilencePass = headSilenceSec >= 0.5 && headSilenceSec <= 1.0;
      const tailSilencePass = tailSilenceSec >= 1.0 && tailSilenceSec <= 5.0;

      const overallPass = peakPass && rmsPass && noisePass && sampleRatePass && channelsPass && dcOffsetPass && headSilencePass && tailSilencePass;

      const issues: string[] = [];
      if (!peakPass) issues.push(`Peak level is ${peakDb.toFixed(2)} dB (Exceeds -3.0 dB limit). Apply a limiter with a -3.1 dB ceiling.`);
      if (rmsDb < -23.0) issues.push(`RMS is too quiet at ${rmsDb.toFixed(2)} dB (Minimum is -23.0 dB). Apply upward compression or gain boost.`);
      else if (rmsDb > -18.0) issues.push(`RMS is too loud at ${rmsDb.toFixed(2)} dB (Maximum is -18.0 dB). Lower master gain or decrease compression.`);
      if (!noisePass) issues.push(`Noise floor is ${noiseFloorDb.toFixed(2)} dB (Must be <= -60.0 dB). Use a gentle spectral denoiser or noise gate.`);
      if (!sampleRatePass) issues.push(`Sample rate is ${(sampleRate / 1000).toFixed(1)} kHz. ACX requires exactly 44.1 kHz.`);
      if (!channelsPass) issues.push(`Channels: ${numberOfChannels}. ACX requires Mono (1) or Stereo (2).`);
      if (!dcOffsetPass) issues.push(`DC Offset is ${dcOffsetPercent.toFixed(3)}% (Must be < 0.10%). Apply a high-pass filter.`);
      if (!crestFactorPass) issues.push(`Dynamic Crest Factor is ${crestFactor.toFixed(1)} dB. Recommended range is 12-20 dB. Adjust your compression ratio.`);
      if (!headSilencePass) issues.push(`Head silence is ${headSilenceSec.toFixed(2)}s. ACX requires 0.5s - 1.0s of room tone at the beginning.`);
      if (!tailSilencePass) issues.push(`Tail silence is ${tailSilenceSec.toFixed(2)}s. ACX requires 1.0s - 5.0s of room tone at the end.`);
      if (peakViolations.length > 0) issues.push(`Detected ${peakViolations.length} intersample peak violations (e.g., at ${peakViolations.slice(0,3).join('s, ')}s).`);

      setResults({
        peakDb, peakPass,
        rmsDb, rmsPass,
        noiseFloorDb, noisePass,
        sampleRate, sampleRatePass,
        channels: numberOfChannels, channelsPass,
        headSilenceSec, headSilencePass,
        tailSilenceSec, tailSilencePass,
        crestFactor, crestFactorPass,
        dcOffsetPercent, dcOffsetPass,
        overallPass,
        durationFormatted: `${Math.floor(durationSec / 60)}m ${Math.floor(durationSec % 60)}s`,
        issues,
        peakViolations,
        filename: file.name
      });

    } catch (err: any) {
      console.error(err);
      setError("Failed to process audio. Make sure it is a valid audio file (MP3, WAV, FLAC, M4A).");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generatePDF = () => {
    if (!results) return;
    
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    
    // Header
    doc.setFontSize(22);
    doc.setTextColor(15, 23, 42); // slate-900
    doc.text("ACX Audio Compliance Report", 14, 22);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139);
    doc.text(`Generated by m4atomp3converter.com/acx-checker`, 14, 30);
    
    // File info
    doc.setFontSize(12);
    doc.setTextColor(15, 23, 42);
    doc.text(`File: ${results.filename}`, 14, 45);
    doc.text(`Duration: ${results.durationFormatted}`, 14, 52);
    
    // Status Badge
    doc.setFontSize(14);
    if (results.overallPass) {
        doc.setTextColor(34, 197, 94); // emerald-500
        doc.text("STATUS: PASSED (ACX Ready)", 14, 62);
    } else {
        doc.setTextColor(239, 68, 68); // red-500
        doc.text("STATUS: FAILED (Requires Engineering)", 14, 62);
    }

    // Metrics Table
    const tableData = [
        ["Metric", "Value", "Target", "Status"],
        ["Peak Level", `${results.peakDb.toFixed(2)} dBFS`, "<= -3.0 dBFS", results.peakPass ? "PASS" : "FAIL"],
        ["RMS Level", `${results.rmsDb.toFixed(2)} dB`, "-23.0 to -18.0 dB", results.rmsPass ? "PASS" : "FAIL"],
        ["Noise Floor", `${results.noiseFloorDb.toFixed(2)} dB`, "<= -60.0 dB", results.noisePass ? "PASS" : "FAIL"],
        ["Sample Rate", `${results.sampleRate} Hz`, "44100 Hz", results.sampleRatePass ? "PASS" : "FAIL"],
        ["Channels", results.channels === 1 ? "Mono" : "Stereo", "Mono/Stereo", results.channelsPass ? "PASS" : "FAIL"],
        ["Head Silence", `${results.headSilenceSec.toFixed(2)} s`, "0.5s - 1.0s", results.headSilencePass ? "PASS" : "FAIL"],
        ["Tail Silence", `${results.tailSilenceSec.toFixed(2)} s`, "1.0s - 5.0s", results.tailSilencePass ? "PASS" : "FAIL"],
        ["Crest Factor", `${results.crestFactor.toFixed(2)} dB`, "12.0 - 20.0 dB", results.crestFactorPass ? "PASS" : "FAIL"],
        ["DC Offset", `${results.dcOffsetPercent.toFixed(4)}%`, "< 0.10%", results.dcOffsetPass ? "PASS" : "FAIL"],
    ];

    autoTable(doc, {
        startY: 70,
        head: [tableData[0]],
        body: tableData.slice(1),
        theme: 'grid',
        headStyles: { fillColor: [15, 23, 42] },
        willDrawCell: function (data) {
            if (data.section === 'body' && data.column.index === 3) {
                if (data.cell.raw === 'PASS') {
                    doc.setTextColor(34, 197, 94);
                } else if (data.cell.raw === 'FAIL') {
                    doc.setTextColor(239, 68, 68);
                }
            }
        }
    });

    let currentY = (doc as any).lastAutoTable.finalY + 15;

    // Remediation Issues
    if (results.issues.length > 0) {
        doc.setFontSize(14);
        doc.setTextColor(15, 23, 42);
        doc.text("Remediation Action Items:", 14, currentY);
        currentY += 8;
        
        doc.setFontSize(11);
        doc.setTextColor(239, 68, 68);
        results.issues.forEach((issue) => {
            const lines = doc.splitTextToSize(`- ${issue}`, pageWidth - 28);
            doc.text(lines, 14, currentY);
            currentY += (lines.length * 5) + 2;
            
            // Page break logic
            if (currentY > doc.internal.pageSize.height - 20) {
                doc.addPage();
                currentY = 20;
            }
        });
    }

    // Violations Log
    if (results.peakViolations.length > 0) {
        currentY += 10;
        if (currentY > doc.internal.pageSize.height - 40) {
            doc.addPage();
            currentY = 20;
        }
        
        doc.setFontSize(14);
        doc.setTextColor(15, 23, 42);
        doc.text("Intersample Peak Violations (> -3.0 dBFS):", 14, currentY);
        currentY += 8;
        
        doc.setFontSize(10);
        doc.setTextColor(100, 116, 139);
        const markers = results.peakViolations.map(v => `@ ${v}s`).join(', ');
        const lines = doc.splitTextToSize(markers, pageWidth - 28);
        doc.text(lines, 14, currentY);
    }

    doc.save(`ACX_Report_${results.filename.replace(/[^a-z0-9]/gi, '_')}.pdf`);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      
      {!isAnalyzing && !results && (
        <div 
          className={`group w-full aspect-[21/9] min-h-[300px] border-2 border-dashed rounded-3xl flex flex-col items-center justify-center p-8 transition-all duration-300 cursor-pointer 
            ${isDragging ? 'border-orange-500 bg-orange-500/10 scale-[1.02] shadow-xl shadow-orange-500/20' : 'border-slate-700 bg-slate-900/50 hover:bg-slate-800 hover:border-orange-500'}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="w-20 h-20 bg-orange-500/10 rounded-full flex items-center justify-center mb-6 text-orange-500 group-hover:scale-110 group-hover:bg-orange-500/20 transition-all duration-300">
             <Upload className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">{t('dropzone_title')}</h3>
          <p className="text-slate-400 text-sm mb-6">{t('dropzone_subtitle')} (Full chapters supported)</p>
          <button className="bg-primary hover:bg-primary/90 text-on-primary px-8 py-3 rounded-full font-bold transition-colors shadow-lg shadow-primary/20">
            Select Audiobook File
          </button>
          <input type="file" className="hidden" ref={fileInputRef} accept="audio/*" onChange={handleFileChange} />
        </div>
      )}

      {isAnalyzing && (
        <div className="w-full min-h-[300px] border border-slate-800 bg-slate-900/50 rounded-3xl flex flex-col items-center justify-center p-8">
          <Activity className="w-12 h-12 text-primary animate-pulse mb-6" />
          <h3 className="text-2xl font-bold text-white mb-2">{t('analyzing')}</h3>
          <p className="text-slate-400">Processing complex DSP offline buffer locally...</p>
        </div>
      )}

      {error && (
        <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {results && !isAnalyzing && (
        <div className="w-full space-y-6">
          {/* Header Status */}
          <div className={`w-full p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-6 ${results.overallPass ? 'bg-emerald-500/10 border-emerald-500/30 border' : 'bg-red-500/10 border-red-500/30 border'}`}>
             <div className="flex items-center gap-6 flex-col md:flex-row">
                 {results.overallPass ? (
                   <CheckCircle className="w-16 h-16 text-emerald-500" />
                 ) : (
                   <XCircle className="w-16 h-16 text-red-500" />
                 )}
                 <div>
                     <h2 className={`text-3xl font-extrabold ${results.overallPass ? 'text-emerald-500' : 'text-red-500'}`}>
                       {results.overallPass ? t('overall_pass') : t('overall_fail')}
                     </h2>
                     <p className="text-slate-300 mt-1 flex items-center justify-center md:justify-start gap-2">
                         <FileAudio className="w-4 h-4 text-slate-400" /> {results.filename} 
                         <span className="text-slate-600">|</span> 
                         <Clock className="w-4 h-4 text-slate-400" /> {results.durationFormatted}
                     </p>
                 </div>
             </div>
             <button 
                onClick={generatePDF}
                className="bg-white text-slate-900 hover:bg-slate-200 px-6 py-3 rounded-xl font-bold transition-colors flex items-center gap-2 shadow-xl"
             >
                 <Download className="w-5 h-5" />
                 Download PDF Inspection Report
             </button>
          </div>

          {/* Remediation Summary */}
          {results.issues.length > 0 && (
              <div className="bg-red-500/5 border border-red-500/20 rounded-3xl p-6 md:p-8">
                  <h3 className="text-xl font-bold text-red-400 flex items-center gap-2 mb-4">
                      <AlertTriangle className="w-6 h-6" /> Required Engineering Action Items
                  </h3>
                  <ul className="space-y-3">
                      {results.issues.map((issue, idx) => (
                          <li key={idx} className="text-slate-300 flex items-start gap-3 bg-red-500/10 p-4 rounded-xl border border-red-500/20">
                              <span className="bg-red-500/20 text-red-400 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{idx + 1}</span>
                              {issue}
                          </li>
                      ))}
                  </ul>
              </div>
          )}

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <MetricCard 
              title="Peak Level"
              icon={<Activity className="w-5 h-5" />}
              value={`${results.peakDb.toFixed(2)} dBFS`}
              target="Target: <= -3.0 dBFS"
              pass={results.peakPass}
            />
            <MetricCard 
              title="RMS Level"
              icon={<Volume2 className="w-5 h-5" />}
              value={`${results.rmsDb.toFixed(2)} dB`}
              target="Target: -23.0 to -18.0 dB"
              pass={results.rmsPass}
            />
            <MetricCard 
              title="Noise Floor"
              icon={<Mic className="w-5 h-5" />}
              value={`${results.noiseFloorDb.toFixed(2)} dB`}
              target="Target: <= -60.0 dB"
              pass={results.noisePass}
            />
            <MetricCard 
              title="Head Silence"
              icon={<Clock className="w-5 h-5" />}
              value={`${results.headSilenceSec.toFixed(2)} s`}
              target="Target: 0.5s - 1.0s"
              pass={results.headSilencePass}
            />
            <MetricCard 
              title="Tail Silence"
              icon={<Clock className="w-5 h-5" />}
              value={`${results.tailSilenceSec.toFixed(2)} s`}
              target="Target: 1.0s - 5.0s"
              pass={results.tailSilencePass}
            />
            <MetricCard 
              title="Dynamic Crest Factor"
              icon={<Activity className="w-5 h-5" />}
              value={`${results.crestFactor.toFixed(2)} dB`}
              target="Target: 12.0 - 20.0 dB"
              pass={results.crestFactorPass}
              warning={!results.crestFactorPass}
            />
            <MetricCard 
              title="DC Offset"
              icon={<Activity className="w-5 h-5" />}
              value={`${results.dcOffsetPercent.toFixed(4)}%`}
              target="Target: < 0.10%"
              pass={results.dcOffsetPass}
            />
            <MetricCard 
              title="Sample Rate"
              icon={<Settings className="w-5 h-5" />}
              value={`${(results.sampleRate / 1000).toFixed(1)} kHz`}
              target="Target: 44.1 kHz"
              pass={results.sampleRatePass}
            />
            <MetricCard 
              title="Channels"
              icon={<Volume2 className="w-5 h-5" />}
              value={results.channels === 1 ? 'Mono' : 'Stereo'}
              target="Target: Mono or Stereo"
              pass={results.channelsPass}
            />
          </div>

          <div className="flex justify-center mt-12 mb-8">
            <button 
              onClick={() => setResults(null)}
              className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-3 rounded-full font-bold transition-colors border border-slate-700"
            >
              Analyze Another Chapter
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

function MetricCard({ title, icon, value, pass, warning, target }: { title: string, icon: React.ReactNode, value: string, pass: boolean, warning?: boolean, target: string }) {
  let statusColor = 'text-red-500 bg-red-500/10 border-red-500/20';
  let badgeText = 'FAIL';
  
  if (pass) {
      statusColor = 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
      badgeText = 'PASS';
  } else if (warning) {
      statusColor = 'text-amber-500 bg-amber-500/10 border-amber-500/20';
      badgeText = 'WARN';
  }

  return (
    <div className={`bg-slate-900 border ${pass ? 'border-slate-800' : 'border-red-500/30'} rounded-2xl p-6 flex flex-col relative overflow-hidden`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-slate-400 font-medium text-sm">
          {icon}
          {title}
        </div>
        <div className={`px-2.5 py-1 rounded-full text-[10px] tracking-wider font-bold ${statusColor} border`}>
          {badgeText}
        </div>
      </div>
      <div className="text-3xl font-extrabold text-white mb-2">{value}</div>
      <div className="mt-auto pt-4 border-t border-slate-800/50 text-xs text-slate-500 font-medium">
          {target}
      </div>
    </div>
  );
}
