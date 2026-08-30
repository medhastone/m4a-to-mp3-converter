declare function importScripts(...urls: string[]): void;
importScripts('https://cdn.jsdelivr.net/npm/lamejs@1.2.1/lame.min.js');

declare var lamejs: any;

self.onmessage = async (e) => {
  const { file, config, id } = e.data;
  
  try {
    const mp3Blob = await processAudio(file, config, (progress, speedStr) => {
      self.postMessage({ type: 'progress', id, progress, speedStr });
    });
    self.postMessage({ type: 'done', id, blob: mp3Blob });
  } catch (err: any) {
    self.postMessage({ type: 'error', id, error: err.message || err.toString() });
  }
};

async function processAudio(file: File, config: any, onProgress: (p: number, speed: string) => void) {
  const startTime = Date.now();
  
  // 1. Parse WAV Header
  // We read the first 1MB to make sure we get the header. Most headers are < 4KB.
  const headerSlice = file.slice(0, 1024 * 1024);
  const headerBuf = await headerSlice.arrayBuffer();
  const dv = new DataView(headerBuf);
  
  let offset = 0;
  
  const readString = (len: number) => {
    let str = '';
    for(let i=0; i<len; i++) {
      str += String.fromCharCode(dv.getUint8(offset++));
    }
    return str;
  };
  
  const riff = readString(4);
  if (riff !== 'RIFF') throw new Error('Not a valid RIFF file');
  
  offset += 4; // skip size
  
  const wave = readString(4);
  if (wave !== 'WAVE') throw new Error('Not a valid WAVE file');
  
  let fmt = null;
  let dataOffset = -1;
  let dataSize = 0;
  
  while (offset < headerBuf.byteLength) {
    const chunkId = readString(4);
    const chunkSize = dv.getUint32(offset, true);
    offset += 4;
    
    if (chunkId === 'fmt ') {
      fmt = {
        audioFormat: dv.getUint16(offset, true),
        numChannels: dv.getUint16(offset + 2, true),
        sampleRate: dv.getUint32(offset + 4, true),
        byteRate: dv.getUint32(offset + 8, true),
        blockAlign: dv.getUint16(offset + 12, true),
        bitsPerSample: dv.getUint16(offset + 14, true)
      };
      offset += chunkSize;
    } else if (chunkId === 'data') {
      dataOffset = offset;
      dataSize = chunkSize;
      break;
    } else {
      offset += chunkSize;
    }
  }
  
  if (!fmt) throw new Error('No fmt chunk found');
  if (dataOffset === -1) throw new Error('No data chunk found');
  
  // Initialize LAME encoder
  const mp3Encoder = new lamejs.Mp3Encoder(fmt.numChannels, fmt.sampleRate, config.kbps || 320);
  const mp3Data: Int8Array[] = [];
  
  // Chunking logic
  const bytesPerSample = fmt.bitsPerSample / 8;
  const bytesPerFrame = bytesPerSample * fmt.numChannels;
  
  // Use chunks of exactly a multiple of 1152 frames. 1152 * 100 = 115200 frames.
  const framesPerChunk = 115200; 
  const chunkSize = framesPerChunk * bytesPerFrame;
  
  let currentOffset = dataOffset;
  const endOffset = dataOffset + dataSize;
  
  const totalFrames = dataSize / bytesPerFrame;
  let processedFrames = 0;
  
  while (currentOffset < endOffset) {
    const nextOffset = Math.min(currentOffset + chunkSize, endOffset);
    const slice = file.slice(currentOffset, nextOffset);
    const buf = await slice.arrayBuffer();
    const chunkDv = new DataView(buf);
    
    const framesInChunk = buf.byteLength / bytesPerFrame;
    const left = new Int16Array(framesInChunk);
    const right = fmt.numChannels === 2 ? new Int16Array(framesInChunk) : new Int16Array(0);
    
    let bufOffset = 0;
    
    // Convert to Int16 with TPDF dither if needed
    for (let i = 0; i < framesInChunk; i++) {
      for (let ch = 0; ch < fmt.numChannels; ch++) {
        let sampleInt16 = 0;
        
        if (fmt.audioFormat === 1) {
          // PCM
          if (fmt.bitsPerSample === 16) {
            sampleInt16 = chunkDv.getInt16(bufOffset, true);
          } else if (fmt.bitsPerSample === 24) {
            // Read 3 bytes (little endian)
            const b0 = chunkDv.getUint8(bufOffset);
            const b1 = chunkDv.getUint8(bufOffset + 1);
            const b2 = chunkDv.getUint8(bufOffset + 2);
            let val = b0 | (b1 << 8) | (b2 << 16);
            if (val & 0x800000) val -= 0x1000000; // Sign extend
            // Dither and scale to 16 bit
            const dither = (Math.random() - Math.random()) * 0.5;
            sampleInt16 = Math.max(-32768, Math.min(32767, Math.round((val / 256.0) + dither)));
          } else if (fmt.bitsPerSample === 32) {
            let val = chunkDv.getInt32(bufOffset, true);
            const dither = (Math.random() - Math.random()) * 0.5;
            sampleInt16 = Math.max(-32768, Math.min(32767, Math.round((val / 65536.0) + dither)));
          } else if (fmt.bitsPerSample === 8) {
            let val = chunkDv.getUint8(bufOffset);
            sampleInt16 = (val - 128) * 256;
          }
        } else if (fmt.audioFormat === 3) {
          // IEEE Float
          if (fmt.bitsPerSample === 32) {
            let val = chunkDv.getFloat32(bufOffset, true);
            const dither = (Math.random() - Math.random()) * 0.5;
            sampleInt16 = Math.max(-32768, Math.min(32767, Math.round((val * 32768) + dither)));
          } else if (fmt.bitsPerSample === 64) {
            let val = chunkDv.getFloat64(bufOffset, true);
            const dither = (Math.random() - Math.random()) * 0.5;
            sampleInt16 = Math.max(-32768, Math.min(32767, Math.round((val * 32768) + dither)));
          }
        }
        
        if (ch === 0) left[i] = sampleInt16;
        else if (ch === 1) right[i] = sampleInt16;
        
        bufOffset += bytesPerSample;
      }
    }
    
    // Encode
    const mp3buf = fmt.numChannels === 2 
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
  
  // Flush
  const mp3buf = mp3Encoder.flush();
  if (mp3buf.length > 0) {
    mp3Data.push(new Int8Array(mp3buf));
  }
  
  return new Blob(mp3Data as unknown as BlobPart[], { type: 'audio/mpeg' });
}
