const fs = require('fs');

const file = 'app/components/AcxChecker.tsx';
let content = fs.readFileSync(file, 'utf8');

const oldProcessFile = `  const processFile = async (file: File) => {
    setError(null);
    setResults(null);
    setIsAnalyzing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      // Use standard AudioContext to decode
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const audioContext = new AudioContextClass();
      
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      
      const channels = audioBuffer.numberOfChannels;
      const sampleRate = audioBuffer.sampleRate;
      const length = audioBuffer.length;
      
      let maxPeak = 0;
      let sumSquares = 0;
      
      // Calculate Noise floor using 500ms sliding windows
      const windowSize = Math.floor(0.5 * sampleRate);
      const rmsWindows: number[] = [];

      for (let c = 0; c < channels; c++) {
        const channelData = audioBuffer.getChannelData(c);
        
        for (let i = 0; i < length; i++) {
          const val = channelData[i];
          const absVal = Math.abs(val);
          if (absVal > maxPeak) maxPeak = absVal;
          sumSquares += val * val;
        }

        // Noise floor calculation for this channel
        for (let i = 0; i < length; i += windowSize) {
          let winSumSq = 0;
          let count = 0;
          for (let j = 0; j < windowSize && (i + j) < length; j++) {
            const val = channelData[i + j];
            winSumSq += val * val;
            count++;
          }
          if (count > 0) {
            const winRms = Math.sqrt(winSumSq / count);
            const winDb = winRms > 0 ? 20 * Math.log10(winRms) : -120;
            rmsWindows.push(winDb);
          }
        }
      }

      const overallRms = Math.sqrt(sumSquares / (length * channels));
      const peakDb = maxPeak > 0 ? 20 * Math.log10(maxPeak) : -120;
      const rmsDb = overallRms > 0 ? 20 * Math.log10(overallRms) : -120;
      
      // Sort RMS windows to find the 5th percentile (quietest segments)
      rmsWindows.sort((a, b) => a - b);
      const noiseFloorDb = rmsWindows.length > 0 ? rmsWindows[Math.floor(rmsWindows.length * 0.05)] : -120;

      // Evaluation
      const peakPass = peakDb <= -3.0;
      const rmsPass = rmsDb <= -18.0 && rmsDb >= -23.0;
      const noisePass = noiseFloorDb <= -60.0;
      const sampleRatePass = sampleRate === 44100;
      
      const overallPass = peakPass && rmsPass && noisePass && sampleRatePass;

      setResults({
        peakDb, peakPass,
        rmsDb, rmsPass,
        noiseFloorDb, noisePass,
        sampleRate, sampleRatePass,
        channels,
        overallPass
      });

    } catch (err: any) {
      console.error(err);
      setError("Failed to process audio. Make sure it is a valid audio file (MP3, WAV, FLAC, M4A).");
    } finally {
      setIsAnalyzing(false);
    }
  };`;

const newProcessFile = `  const processFile = async (file: File) => {
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

      // 1. Merge channels to mono array for unified acoustic energy evaluation
      const monoSamples = new Float32Array(totalLength);

      if (numberOfChannels === 1) {
        monoSamples.set(audioBuffer.getChannelData(0));
      } else {
        // Average all channels into mono
        for (let ch = 0; ch < numberOfChannels; ch++) {
          const channelData = audioBuffer.getChannelData(ch);
          for (let i = 0; i < totalLength; i++) {
            monoSamples[i] += channelData[i] / numberOfChannels;
          }
        }
      }

      // 2. Measure Global Peak & Global Sum of Squares (for RMS)
      for (let i = 0; i < totalLength; i++) {
        const absVal = Math.abs(monoSamples[i]);
        if (absVal > maxPeakSample) {
          maxPeakSample = absVal;
        }
        globalSumSquares += monoSamples[i] * monoSamples[i];
      }

      const peakDb = maxPeakSample > 0 ? 20 * Math.log10(maxPeakSample) : -100;
      const rmsMeanSquare = globalSumSquares / totalLength;
      const rmsDb = rmsMeanSquare > 0 ? 20 * Math.log10(Math.sqrt(rmsMeanSquare)) : -100;

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

      // 4. Evaluation
      const peakPass = peakDb <= -3.0;
      const rmsPass = rmsDb >= -23.0 && rmsDb <= -18.0;
      const noisePass = noiseFloorDb <= -60.0;
      const sampleRatePass = sampleRate === 44100;
      const overallPass = peakPass && rmsPass && noisePass && sampleRatePass;

      setResults({
        peakDb, peakPass,
        rmsDb, rmsPass,
        noiseFloorDb, noisePass,
        sampleRate, sampleRatePass,
        channels: numberOfChannels,
        overallPass
      });

    } catch (err: any) {
      console.error(err);
      setError("Failed to process audio. Make sure it is a valid audio file (MP3, WAV, FLAC, M4A).");
    } finally {
      setIsAnalyzing(false);
    }
  };`;

if (content.includes(oldProcessFile)) {
  content = content.replace(oldProcessFile, newProcessFile);
  fs.writeFileSync(file, content);
  console.log("Success: Algorithm replaced.");
} else {
  console.log("Error: Could not find old algorithm string exactly.");
}
