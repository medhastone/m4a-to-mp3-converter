// Robust In-Browser WAV to MP3 Encoder Worker with Streaming and Raw PCM support
declare function importScripts(...urls: string[]): void;
importScripts('https://cdn.jsdelivr.net/npm/lamejs@1.2.1/lame.min.js');

declare const lamejs: {
  Mp3Encoder: new (channels: number, sampleRate: number, kbps: number) => {
    encodeBuffer: (left: Int16Array, right?: Int16Array) => Int8Array | number[];
    flush: () => Int8Array | number[];
  };
};

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

self.onmessage = async (e: MessageEvent) => {
  const data = e.data;
  
  if (data.type === 'ENCODE_RAW_PCM') {
    try {
      const { id, left, right, sampleRate, numChannels, config } = data;
      const leftF32 = new Float32Array(left);
      const rightF32 = right ? new Float32Array(right) : null;
      
      const mp3Blob = await encodeRawPCM(id, leftF32, rightF32, sampleRate, numChannels, config, (progress, speedStr) => {
        self.postMessage({ type: "progress", id, progress, speedStr });
      });
      self.postMessage({ type: "done", id, blob: mp3Blob });
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      self.postMessage({ type: "error", id: data.id, error: errorMsg });
    }
    return;
  }

  const { file, config, id } = data;
  try {
    const mp3Blob = await processAudio(file, config, (progress, speedStr) => {
      self.postMessage({ type: "progress", id, progress, speedStr });
    });
    self.postMessage({ type: "done", id, blob: mp3Blob });
  } catch (err: unknown) {
    // If native stream parsing fails, request Web Audio API fallback from the main thread
    const errorMsg = err instanceof Error ? err.message : String(err);
    self.postMessage({ type: "FALLBACK_TO_DECODE", id, error: errorMsg });
  }
};

async function encodeRawPCM(
  id: string,
  leftF32: Float32Array,
  rightF32: Float32Array | null,
  sampleRate: number,
  numChannels: number,
  config: { kbps?: number },
  onProgress: (p: number, speed: string) => void
) {
  const startTime = Date.now();
  const totalFrames = leftF32.length;
  const kbps = config?.kbps || 320;
  const channels = numChannels === 2 && rightF32 ? 2 : 1;
  const mp3Encoder = new lamejs.Mp3Encoder(channels, sampleRate, kbps);
  const mp3Data: Int8Array[] = [];

  const chunkSize = 115200; // Multiples of 1152 frames for MP3 encoding
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
    const speedStr = elapsed > 0 ? (processedFrames / totalFrames > 0 ? `Converted in ${elapsed.toFixed(1)}s` : '...') : '...';
    onProgress(processedFrames / totalFrames, speedStr);
  }

  const flushBuf = mp3Encoder.flush();
  if (flushBuf.length > 0) {
    mp3Data.push(new Int8Array(flushBuf));
  }

  return new Blob(mp3Data as unknown as BlobPart[], { type: "audio/mpeg" });
}

async function processAudio(file: File, config: { kbps?: number }, onProgress: (p: number, speed: string) => void) {
  const startTime = Date.now();
  // Read first 2MB to safely capture any large headers or metadata chunks (BEXT, ID3, CUE, etc.)
  const headerSlice = file.slice(0, Math.min(file.size, 2 * 1024 * 1024));
  const headerBuf = await headerSlice.arrayBuffer();
  const dv = new DataView(headerBuf);

  let offset = 0;
  let waveOffset = -1;

  // Search for "RIFF", "RF64", "BW64", or "RIFX" header anywhere in the buffer (skips ID3v2 tags and junk headers)
  const maxScan = Math.min(headerBuf.byteLength - 12, 65536);
  for (let i = 0; i <= maxScan; i++) {
    const b0 = dv.getUint8(i);
    const b1 = dv.getUint8(i + 1);
    const b2 = dv.getUint8(i + 2);
    const b3 = dv.getUint8(i + 3);

    const isRiff = (b0 === 0x52 && b1 === 0x49 && b2 === 0x46 && b3 === 0x46); // RIFF
    const isRf64 = (b0 === 0x52 && b1 === 0x46 && b2 === 0x36 && b3 === 0x34); // RF64
    const isBw64 = (b0 === 0x42 && b1 === 0x57 && b2 === 0x36 && b3 === 0x34); // BW64
    const isRifx = (b0 === 0x52 && b1 === 0x49 && b2 === 0x46 && b3 === 0x58); // RIFX

    if (isRiff || isRf64 || isBw64 || isRifx) {
      // Check for "WAVE" at offset + 8
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
    throw new Error("Not a valid WAVE file header");
  }

  offset = waveOffset + 12;

  let fmt: {
    audioFormat: number;
    numChannels: number;
    sampleRate: number;
    byteRate: number;
    blockAlign: number;
    bitsPerSample: number;
  } | null = null;
  let dataOffset = -1;
  let dataSize = 0;

  while (offset + 8 <= headerBuf.byteLength) {
    let chunkId = '';
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
      // Handle WAVE_FORMAT_EXTENSIBLE (0xFFFE)
      if (audioFormat === 0xFFFE && chunkSize >= 40) {
        const subFormatGuid = dv.getUint16(offset + 24, true);
        if (subFormatGuid === 1) effectiveFormat = 1; // PCM
        else if (subFormatGuid === 3) effectiveFormat = 3; // Float
      }

      fmt = {
        audioFormat: effectiveFormat,
        numChannels,
        sampleRate,
        byteRate,
        blockAlign,
        bitsPerSample
      };
      // Advance by chunkSize with word alignment
      offset += chunkSize + (chunkSize % 2);
    } else if (chunkId === "data") {
      dataOffset = offset;
      // If chunkSize is 0 or 0xFFFFFFFF (e.g. RF64 or unfinalized stream), calculate from file size
      dataSize = (chunkSize > 0 && chunkSize !== 0xFFFFFFFF && dataOffset + chunkSize <= file.size)
        ? chunkSize
        : (file.size - dataOffset);
      break;
    } else {
      // Skip chunk with word alignment
      offset += chunkSize + (chunkSize % 2);
    }
  }

  if (!fmt) throw new Error("No valid fmt chunk found in WAV header");
  if (dataOffset === -1) throw new Error("No valid data chunk found in WAV header");

  // Only handle standard PCM, IEEE Float, A-law, or Mu-law in the fast streaming worker
  const supportedFormats = [1, 3, 6, 7];
  if (!supportedFormats.includes(fmt.audioFormat)) {
    throw new Error(`Unsupported WAV compression format (0x${fmt.audioFormat.toString(16)})`);
  }

  const outChannels = Math.min(2, fmt.numChannels);
  const mp3Encoder = new lamejs.Mp3Encoder(outChannels, fmt.sampleRate, config?.kbps || 320);
  const mp3Data: Int8Array[] = [];

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
          // PCM
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
          // IEEE Float
          if (fmt.bitsPerSample === 32) {
            const val = chunkDv.getFloat32(bufOffset, true);
            sampleInt16 = Math.max(-32768, Math.min(32767, Math.round(val < 0 ? val * 32768 : val * 32767)));
          } else if (fmt.bitsPerSample === 64) {
            const val = chunkDv.getFloat64(bufOffset, true);
            sampleInt16 = Math.max(-32768, Math.min(32767, Math.round(val < 0 ? val * 32768 : val * 32767)));
          }
        } else if (fmt.audioFormat === 6) {
          // A-law
          const val = chunkDv.getUint8(bufOffset);
          sampleInt16 = ALAW_TABLE[val];
        } else if (fmt.audioFormat === 7) {
          // Mu-law
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
    const speedStr = elapsed > 0 ? (processedFrames / totalFrames > 0 ? `Converted in ${elapsed.toFixed(1)}s` : '...') : '...';
    onProgress(processedFrames / totalFrames, speedStr);
  }

  const mp3buf = mp3Encoder.flush();
  if (mp3buf.length > 0) {
    mp3Data.push(new Int8Array(mp3buf));
  }

  return new Blob(mp3Data as unknown as BlobPart[], { type: "audio/mpeg" });
}
