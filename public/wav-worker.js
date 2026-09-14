// Robust WAV to MP3 Multi-Format Worker
importScripts("https://cdn.jsdelivr.net/npm/lamejs@1.2.1/lame.min.js");

// G.711 mu-law expansion table to 16-bit signed PCM
const MULAW_TABLE = new Int16Array(256);
for (let i = 0; i < 256; i++) {
  let mu = ~i & 0xFF;
  let t = ((mu & 0x0F) << 3) + 0x84;
  t <<= (mu & 0x70) >> 4;
  let val = (mu & 0x80) !== 0 ? (0x84 - t) : (t - 0x84);
  MULAW_TABLE[i] = val;
}

// G.711 A-law expansion table to 16-bit signed PCM
const ALAW_TABLE = new Int16Array(256);
for (let i = 0; i < 256; i++) {
  let a = i ^ 0x55;
  let t = (a & 0x0F) << 4;
  let seg = (a & 0x70) >> 4;
  if (seg === 0) {
    t += 8;
  } else {
    t += 0x108;
    t <<= (seg - 1);
  }
  ALAW_TABLE[i] = (a & 0x80) !== 0 ? t : -t;
}

// MS-ADPCM Tables & Constants
const MS_ADPCM_ADAPTATION_TABLE = [
  230, 230, 230, 230, 307, 409, 512, 614,
  768, 614, 512, 409, 307, 230, 230, 230
];
const DEFAULT_MS_COEFF1 = [256, 512, 0, 192, 240, 460, 392];
const DEFAULT_MS_COEFF2 = [0, -256, 0, 64, 0, -208, -232];

// IMA-ADPCM Tables & Constants
const IMA_STEP_TABLE = [
  7, 8, 9, 10, 11, 12, 13, 14, 16, 17,
  19, 21, 23, 25, 28, 31, 34, 37, 41, 45,
  50, 55, 60, 66, 73, 80, 88, 97, 107, 118,
  130, 143, 157, 173, 190, 209, 230, 253, 279, 307,
  337, 371, 408, 449, 494, 544, 598, 658, 724, 796,
  876, 963, 1060, 1166, 1282, 1411, 1552, 1707, 1878, 2066,
  2272, 2499, 2749, 3024, 3327, 3660, 4026, 4428, 4871, 5358,
  5894, 6484, 7132, 7845, 8630, 9493, 10442, 11487, 12635, 13899,
  15289, 16818, 18500, 20350, 22385, 24623, 27086, 29794, 32767
];
const IMA_INDEX_TABLE = [
  -1, -1, -1, -1, 2, 4, 6, 8,
  -1, -1, -1, -1, 2, 4, 6, 8
];

self.onmessage = async (e) => {
  const data = e.data;
  
  if (data.type === "ENCODE_RAW_PCM") {
    try {
      const { id, left, right, sampleRate, numChannels, config } = data;
      const leftF32 = new Float32Array(left);
      const rightF32 = right ? new Float32Array(right) : null;
      
      const mp3Blob = await encodeRawPCM(id, leftF32, rightF32, sampleRate, numChannels, config, (progress, speedStr) => {
        self.postMessage({ type: "progress", id, progress, speedStr });
      });
      self.postMessage({ type: "done", id, blob: mp3Blob });
    } catch (err) {
      self.postMessage({ type: "FALLBACK_TO_FFMPEG", id, error: err.message || String(err) });
    }
    return;
  }

  const { file, config, id } = data;
  try {
    const mp3Blob = await processAudio(file, config, (progress, speedStr) => {
      self.postMessage({ type: "progress", id, progress, speedStr });
    });
    self.postMessage({ type: "done", id, blob: mp3Blob });
  } catch (err) {
    // If native stream parsing fails, notify main thread to run fallback chain (Web Audio -> FFmpeg WASM)
    self.postMessage({ type: "FALLBACK_TO_DECODE", id, error: err.message || String(err) });
  }
};

async function encodeRawPCM(id, leftF32, rightF32, sampleRate, numChannels, config, onProgress) {
  const startTime = Date.now();
  const totalFrames = leftF32.length;
  const kbps = config?.kbps || 320;
  const channels = numChannels === 2 && rightF32 ? 2 : 1;
  const mp3Encoder = new lamejs.Mp3Encoder(channels, sampleRate, kbps);
  const mp3Data = [];

  const chunkSize = 115200;
  let processedFrames = 0;

  while (processedFrames < totalFrames) {
    const nextFrames = Math.min(chunkSize, totalFrames - processedFrames);
    const leftChunk = new Int16Array(nextFrames);
    const rightChunk = channels === 2 ? new Int16Array(nextFrames) : new Int16Array(0);

    for (let i = 0; i < nextFrames; i++) {
      const idx = processedFrames + i;
      const l = leftF32[idx];
      leftChunk[i] = Math.max(-32768, Math.min(32767, Math.round(l < 0 ? l * 32768 : l * 32767)));
      if (channels === 2 && rightF32) {
        const r = rightF32[idx];
        rightChunk[i] = Math.max(-32768, Math.min(32767, Math.round(r < 0 ? r * 32768 : r * 32767)));
      }
    }

    const mp3buf = channels === 2
      ? mp3Encoder.encodeBuffer(leftChunk, rightChunk)
      : mp3Encoder.encodeBuffer(leftChunk);

    if (mp3buf.length > 0) {
      mp3Data.push(new Int8Array(mp3buf));
    }

    processedFrames += nextFrames;
    const elapsed = (Date.now() - startTime) / 1000;
    const speedStr = elapsed > 0 ? (processedFrames / totalFrames > 0 ? "Converted in " + elapsed.toFixed(1) + "s" : "...") : "...";
    onProgress(processedFrames / totalFrames, speedStr);
  }

  const flushBuf = mp3Encoder.flush();
  if (flushBuf.length > 0) {
    mp3Data.push(new Int8Array(flushBuf));
  }

  return new Blob(mp3Data, { type: "audio/mpeg" });
}

async function processAudio(file, config, onProgress) {
  const startTime = Date.now();
  // Read first 2MB to safely capture any large headers or metadata chunks
  const headerSlice = file.slice(0, Math.min(file.size, 2 * 1024 * 1024));
  const headerBuf = await headerSlice.arrayBuffer();
  const dv = new DataView(headerBuf);

  let offset = 0;
  let waveOffset = -1;

  // Search for "RIFF", "RF64", "BW64", or "RIFX" header anywhere in the buffer
  const maxScan = Math.min(headerBuf.byteLength - 12, 65536);
  for (let i = 0; i <= maxScan; i++) {
    const b0 = dv.getUint8(i);
    const b1 = dv.getUint8(i + 1);
    const b2 = dv.getUint8(i + 2);
    const b3 = dv.getUint8(i + 3);

    const isRiff = (b0 === 0x52 && b1 === 0x49 && b2 === 0x46 && b3 === 0x46);
    const isRf64 = (b0 === 0x52 && b1 === 0x46 && b2 === 0x36 && b3 === 0x34);
    const isBw64 = (b0 === 0x42 && b1 === 0x57 && b2 === 0x36 && b3 === 0x34);
    const isRifx = (b0 === 0x52 && b1 === 0x49 && b2 === 0x46 && b3 === 0x58);

    if (isRiff || isRf64 || isBw64 || isRifx) {
      if (
        dv.getUint8(i + 8) === 0x57 &&
        dv.getUint8(i + 9) === 0x41 &&
        dv.getUint8(i + 10) === 0x56 &&
        dv.getUint8(i + 11) === 0x45
      ) {
        waveOffset = i;
        break;
      }
    }
  }

  if (waveOffset === -1) {
    throw new Error("Not a standard WAVE file header");
  }

  offset = waveOffset + 12;

  let fmt = null;
  let dataOffset = -1;
  let dataSize = 0;

  while (offset + 8 <= headerBuf.byteLength) {
    let chunkId = "";
    for (let c = 0; c < 4; c++) {
      chunkId += String.fromCharCode(dv.getUint8(offset + c));
    }
    const chunkSize = dv.getUint32(offset + 4, true);
    offset += 8;

    if (chunkId === "fmt ") {
      const audioFormat = dv.getUint16(offset, true);
      const numChannels = dv.getUint16(offset + 2, true);
      const sampleRate = dv.getUint32(offset + 4, true);
      const byteRate = dv.getUint32(offset + 8, true);
      const blockAlign = dv.getUint16(offset + 12, true);
      const bitsPerSample = dv.getUint16(offset + 14, true);

      let effectiveFormat = audioFormat;
      let coeff1 = DEFAULT_MS_COEFF1;
      let coeff2 = DEFAULT_MS_COEFF2;

      // Handle WAVE_FORMAT_EXTENSIBLE (0xFFFE)
      if (audioFormat === 0xFFFE && chunkSize >= 40) {
        const subFormatGuid = dv.getUint16(offset + 24, true);
        if (subFormatGuid === 1) effectiveFormat = 1;
        else if (subFormatGuid === 3) effectiveFormat = 3;
      }

      // Handle MS-ADPCM custom coefficients if present in fmt chunk
      if (audioFormat === 2 && chunkSize >= 22) {
        const cbSize = dv.getUint16(offset + 16, true);
        if (cbSize >= 4 && offset + 20 + 2 <= headerBuf.byteLength) {
          const numCoef = dv.getUint16(offset + 20, true);
          if (numCoef > 0 && offset + 22 + numCoef * 4 <= headerBuf.byteLength) {
            coeff1 = [];
            coeff2 = [];
            for (let k = 0; k < numCoef; k++) {
              coeff1.push(dv.getInt16(offset + 22 + k * 4, true));
              coeff2.push(dv.getInt16(offset + 24 + k * 4, true));
            }
          }
        }
      }

      fmt = {
        audioFormat: effectiveFormat,
        numChannels,
        sampleRate,
        byteRate,
        blockAlign: blockAlign || 1,
        bitsPerSample,
        coeff1,
        coeff2
      };
      offset += chunkSize + (chunkSize % 2);
    } else if (chunkId === "data") {
      dataOffset = offset;
      dataSize = (chunkSize > 0 && chunkSize !== 0xFFFFFFFF && dataOffset + chunkSize <= file.size)
        ? chunkSize
        : (file.size - dataOffset);
      break;
    } else {
      offset += chunkSize + (chunkSize % 2);
    }
  }

  if (!fmt) throw new Error("No valid fmt chunk found in WAV header");
  if (dataOffset === -1) throw new Error("No valid data chunk found in WAV header");

  // Handle MS-ADPCM directly
  if (fmt.audioFormat === 2) {
    return await decodeAndEncodeMsAdpcm(file, dataOffset, dataSize, fmt, config, startTime, onProgress);
  }

  // Handle IMA-ADPCM directly
  if (fmt.audioFormat === 17 || fmt.audioFormat === 0x0011) {
    return await decodeAndEncodeImaAdpcm(file, dataOffset, dataSize, fmt, config, startTime, onProgress);
  }

  // Standard PCM, IEEE Float, A-law, Mu-law
  const supportedFormats = [1, 3, 6, 7];
  if (!supportedFormats.includes(fmt.audioFormat)) {
    throw new Error("Unsupported WAV compression format: 0x" + fmt.audioFormat.toString(16));
  }

  const outChannels = Math.min(2, fmt.numChannels);
  const mp3Encoder = new lamejs.Mp3Encoder(outChannels, fmt.sampleRate, config?.kbps || 320);
  const mp3Data = [];

  const bytesPerSample = Math.max(1, Math.floor(fmt.bitsPerSample / 8));
  const bytesPerFrame = fmt.blockAlign || (bytesPerSample * fmt.numChannels);
  const framesPerChunk = 115200;
  const chunkSize = framesPerChunk * bytesPerFrame;

  let currentOffset = dataOffset;
  const endOffset = dataOffset + dataSize;
  const totalFrames = Math.max(1, dataSize / bytesPerFrame);
  let processedFrames = 0;

  while (currentOffset < endOffset) {
    const nextOffset = Math.min(currentOffset + chunkSize, endOffset);
    const slice = file.slice(currentOffset, nextOffset);
    const buf = await slice.arrayBuffer();
    const chunkDv = new DataView(buf);

    const framesInChunk = Math.floor(buf.byteLength / bytesPerFrame);
    if (framesInChunk <= 0) break;

    const left = new Int16Array(framesInChunk);
    const right = outChannels === 2 ? new Int16Array(framesInChunk) : new Int16Array(0);

    let bufOffset = 0;

    for (let i = 0; i < framesInChunk; i++) {
      for (let ch = 0; ch < fmt.numChannels; ch++) {
        let sampleInt16 = 0;

        if (fmt.audioFormat === 1) {
          if (fmt.bitsPerSample === 16) {
            sampleInt16 = chunkDv.getInt16(bufOffset, true);
          } else if (fmt.bitsPerSample === 24) {
            const b0 = chunkDv.getUint8(bufOffset);
            const b1 = chunkDv.getUint8(bufOffset + 1);
            const b2 = chunkDv.getUint8(bufOffset + 2);
            let val = b0 | (b1 << 8) | (b2 << 16);
            if (val & 0x800000) val -= 0x1000000;
            const dither = (Math.random() - Math.random()) * 0.5;
            sampleInt16 = Math.max(-32768, Math.min(32767, Math.round((val / 256.0) + dither)));
          } else if (fmt.bitsPerSample === 32) {
            const val = chunkDv.getInt32(bufOffset, true);
            const dither = (Math.random() - Math.random()) * 0.5;
            sampleInt16 = Math.max(-32768, Math.min(32767, Math.round((val / 65536.0) + dither)));
          } else if (fmt.bitsPerSample === 8) {
            const val = chunkDv.getUint8(bufOffset);
            sampleInt16 = (val - 128) * 256;
          }
        } else if (fmt.audioFormat === 3) {
          if (fmt.bitsPerSample === 32) {
            const val = chunkDv.getFloat32(bufOffset, true);
            sampleInt16 = Math.max(-32768, Math.min(32767, Math.round(val < 0 ? val * 32768 : val * 32767)));
          } else if (fmt.bitsPerSample === 64) {
            const val = chunkDv.getFloat64(bufOffset, true);
            sampleInt16 = Math.max(-32768, Math.min(32767, Math.round(val < 0 ? val * 32768 : val * 32767)));
          }
        } else if (fmt.audioFormat === 6) {
          const val = chunkDv.getUint8(bufOffset);
          sampleInt16 = ALAW_TABLE[val];
        } else if (fmt.audioFormat === 7) {
          const val = chunkDv.getUint8(bufOffset);
          sampleInt16 = MULAW_TABLE[val];
        }

        if (ch === 0) {
          left[i] = sampleInt16;
        } else if (ch === 1 && outChannels === 2) {
          right[i] = sampleInt16;
        }

        bufOffset += bytesPerSample;
      }
    }

    const mp3buf = outChannels === 2
      ? mp3Encoder.encodeBuffer(left, right)
      : mp3Encoder.encodeBuffer(left);

    if (mp3buf.length > 0) {
      mp3Data.push(new Int8Array(mp3buf));
    }

    processedFrames += framesInChunk;
    currentOffset = nextOffset;

    const elapsed = (Date.now() - startTime) / 1000;
    const speedStr = elapsed > 0 ? (processedFrames / totalFrames > 0 ? "Converted in " + elapsed.toFixed(1) + "s" : "...") : "...";
    onProgress(processedFrames / totalFrames, speedStr);
  }

  const mp3buf = mp3Encoder.flush();
  if (mp3buf.length > 0) {
    mp3Data.push(new Int8Array(mp3buf));
  }

  return new Blob(mp3Data, { type: "audio/mpeg" });
}

async function decodeAndEncodeMsAdpcm(file, dataOffset, dataSize, fmt, config, startTime, onProgress) {
  const slice = file.slice(dataOffset, dataOffset + dataSize);
  const buf = await slice.arrayBuffer();
  const dv = new DataView(buf);
  const blockAlign = fmt.blockAlign || 256;
  const numChannels = Math.min(2, fmt.numChannels || 1);
  const coeff1 = fmt.coeff1 || DEFAULT_MS_COEFF1;
  const coeff2 = fmt.coeff2 || DEFAULT_MS_COEFF2;

  const leftSamples = [];
  const rightSamples = numChannels === 2 ? [] : null;

  let offset = 0;
  const len = buf.byteLength;

  if (numChannels === 1) {
    while (offset + 7 <= len) {
      const blockEnd = Math.min(offset + blockAlign, len);
      const predIdx = Math.min(dv.getUint8(offset), coeff1.length - 1);
      const c1 = coeff1[predIdx];
      const c2 = coeff2[predIdx];
      let delta = dv.getInt16(offset + 1, true);
      let samp1 = dv.getInt16(offset + 3, true);
      let samp2 = dv.getInt16(offset + 5, true);
      offset += 7;

      leftSamples.push(samp2, samp1);

      while (offset < blockEnd) {
        const byte = dv.getUint8(offset++);
        const n1 = (byte >> 4) & 0x0F;
        const n2 = byte & 0x0F;

        for (const nib of [n1, n2]) {
          const signedNib = nib >= 8 ? nib - 16 : nib;
          let pred = Math.floor((samp1 * c1 + samp2 * c2) / 256);
          let samp = pred + signedNib * delta;
          samp = Math.max(-32768, Math.min(32767, samp));
          delta = Math.floor((delta * MS_ADPCM_ADAPTATION_TABLE[nib]) / 256);
          if (delta < 16) delta = 16;
          samp2 = samp1;
          samp1 = samp;
          leftSamples.push(samp);
        }
      }
    }
  } else {
    while (offset + 14 <= len) {
      const blockEnd = Math.min(offset + blockAlign, len);
      const predIdxL = Math.min(dv.getUint8(offset), coeff1.length - 1);
      const predIdxR = Math.min(dv.getUint8(offset + 1), coeff1.length - 1);
      const c1L = coeff1[predIdxL]; const c2L = coeff2[predIdxL];
      const c1R = coeff1[predIdxR]; const c2R = coeff2[predIdxR];
      let deltaL = dv.getInt16(offset + 2, true);
      let deltaR = dv.getInt16(offset + 4, true);
      let samp1L = dv.getInt16(offset + 6, true);
      let samp1R = dv.getInt16(offset + 8, true);
      let samp2L = dv.getInt16(offset + 10, true);
      let samp2R = dv.getInt16(offset + 12, true);
      offset += 14;

      leftSamples.push(samp2L, samp1L);
      rightSamples.push(samp2R, samp1R);

      while (offset < blockEnd) {
        const byte = dv.getUint8(offset++);
        const nibL = (byte >> 4) & 0x0F;
        const nibR = byte & 0x0F;

        const signedNibL = nibL >= 8 ? nibL - 16 : nibL;
        let predL = Math.floor((samp1L * c1L + samp2L * c2L) / 256);
        let sampL = Math.max(-32768, Math.min(32767, predL + signedNibL * deltaL));
        deltaL = Math.floor((deltaL * MS_ADPCM_ADAPTATION_TABLE[nibL]) / 256);
        if (deltaL < 16) deltaL = 16;
        samp2L = samp1L; samp1L = sampL;
        leftSamples.push(sampL);

        const signedNibR = nibR >= 8 ? nibR - 16 : nibR;
        let predR = Math.floor((samp1R * c1R + samp2R * c2R) / 256);
        let sampR = Math.max(-32768, Math.min(32767, predR + signedNibR * deltaR));
        deltaR = Math.floor((deltaR * MS_ADPCM_ADAPTATION_TABLE[nibR]) / 256);
        if (deltaR < 16) deltaR = 16;
        samp2R = samp1R; samp1R = sampR;
        rightSamples.push(sampR);
      }
    }
  }

  const leftArr = new Int16Array(leftSamples);
  const rightArr = rightSamples ? new Int16Array(rightSamples) : null;
  return encodeInt16ToMp3(leftArr, rightArr, fmt.sampleRate, numChannels, config, startTime, onProgress);
}

async function decodeAndEncodeImaAdpcm(file, dataOffset, dataSize, fmt, config, startTime, onProgress) {
  const slice = file.slice(dataOffset, dataOffset + dataSize);
  const buf = await slice.arrayBuffer();
  const dv = new DataView(buf);
  const blockAlign = fmt.blockAlign || 256;
  const numChannels = Math.min(2, fmt.numChannels || 1);

  const leftSamples = [];
  const rightSamples = numChannels === 2 ? [] : null;

  let offset = 0;
  const len = buf.byteLength;

  if (numChannels === 1) {
    while (offset + 4 <= len) {
      const blockEnd = Math.min(offset + blockAlign, len);
      let samp = dv.getInt16(offset, true);
      let stepIndex = Math.max(0, Math.min(88, dv.getUint8(offset + 2)));
      offset += 4;
      leftSamples.push(samp);

      while (offset < blockEnd) {
        const byte = dv.getUint8(offset++);
        const n1 = byte & 0x0F; // IMA uses low nibble first
        const n2 = (byte >> 4) & 0x0F;

        for (const nib of [n1, n2]) {
          let step = IMA_STEP_TABLE[stepIndex];
          let diff = step >> 3;
          if (nib & 1) diff += step >> 2;
          if (nib & 2) diff += step >> 1;
          if (nib & 4) diff += step;
          if (nib & 8) samp -= diff;
          else samp += diff;
          samp = Math.max(-32768, Math.min(32767, samp));
          stepIndex = Math.max(0, Math.min(88, stepIndex + IMA_INDEX_TABLE[nib]));
          leftSamples.push(samp);
        }
      }
    }
  } else {
    while (offset + 8 <= len) {
      const blockEnd = Math.min(offset + blockAlign, len);
      let sampL = dv.getInt16(offset, true);
      let stepIndexL = Math.max(0, Math.min(88, dv.getUint8(offset + 2)));
      let sampR = dv.getInt16(offset + 4, true);
      let stepIndexR = Math.max(0, Math.min(88, dv.getUint8(offset + 6)));
      offset += 8;

      leftSamples.push(sampL);
      rightSamples.push(sampR);

      // In stereo IMA ADPCM, each channel receives a 4-byte chunk
      while (offset + 8 <= blockEnd) {
        // 4 bytes for left
        for (let b = 0; b < 4; b++) {
          const byte = dv.getUint8(offset + b);
          for (const nib of [byte & 0x0F, (byte >> 4) & 0x0F]) {
            let step = IMA_STEP_TABLE[stepIndexL];
            let diff = step >> 3;
            if (nib & 1) diff += step >> 2;
            if (nib & 2) diff += step >> 1;
            if (nib & 4) diff += step;
            if (nib & 8) sampL -= diff;
            else sampL += diff;
            sampL = Math.max(-32768, Math.min(32767, sampL));
            stepIndexL = Math.max(0, Math.min(88, stepIndexL + IMA_INDEX_TABLE[nib]));
            leftSamples.push(sampL);
          }
        }
        offset += 4;
        // 4 bytes for right
        for (let b = 0; b < 4; b++) {
          const byte = dv.getUint8(offset + b);
          for (const nib of [byte & 0x0F, (byte >> 4) & 0x0F]) {
            let step = IMA_STEP_TABLE[stepIndexR];
            let diff = step >> 3;
            if (nib & 1) diff += step >> 2;
            if (nib & 2) diff += step >> 1;
            if (nib & 4) diff += step;
            if (nib & 8) sampR -= diff;
            else sampR += diff;
            sampR = Math.max(-32768, Math.min(32767, sampR));
            stepIndexR = Math.max(0, Math.min(88, stepIndexR + IMA_INDEX_TABLE[nib]));
            rightSamples.push(sampR);
          }
        }
        offset += 4;
      }
      offset = blockEnd;
    }
  }

  const leftArr = new Int16Array(leftSamples);
  const rightArr = rightSamples ? new Int16Array(rightSamples) : null;
  return encodeInt16ToMp3(leftArr, rightArr, fmt.sampleRate, numChannels, config, startTime, onProgress);
}

function encodeInt16ToMp3(leftArr, rightArr, sampleRate, numChannels, config, startTime, onProgress) {
  const channels = numChannels === 2 && rightArr ? 2 : 1;
  const mp3Encoder = new lamejs.Mp3Encoder(channels, sampleRate, config?.kbps || 320);
  const mp3Data = [];
  const chunkSize = 115200;
  const totalFrames = leftArr.length;
  let processedFrames = 0;

  while (processedFrames < totalFrames) {
    const nextFrames = Math.min(chunkSize, totalFrames - processedFrames);
    const leftChunk = leftArr.subarray(processedFrames, processedFrames + nextFrames);
    const rightChunk = channels === 2 ? rightArr.subarray(processedFrames, processedFrames + nextFrames) : new Int16Array(0);

    const mp3buf = channels === 2
      ? mp3Encoder.encodeBuffer(leftChunk, rightChunk)
      : mp3Encoder.encodeBuffer(leftChunk);

    if (mp3buf.length > 0) {
      mp3Data.push(new Int8Array(mp3buf));
    }

    processedFrames += nextFrames;
    const elapsed = (Date.now() - startTime) / 1000;
    const speedStr = elapsed > 0 ? (processedFrames / totalFrames > 0 ? "Converted in " + elapsed.toFixed(1) + "s" : "...") : "...";
    onProgress(processedFrames / totalFrames, speedStr);
  }

  const flushBuf = mp3Encoder.flush();
  if (flushBuf.length > 0) {
    mp3Data.push(new Int8Array(flushBuf));
  }

  return new Blob(mp3Data, { type: "audio/mpeg" });
}
