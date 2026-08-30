// app/components/wav-converter/worker.ts
importScripts("https://cdn.jsdelivr.net/npm/lamejs@1.2.1/lame.min.js");
self.onmessage = async (e) => {
  const { file, config, id } = e.data;
  try {
    const mp3Blob = await processAudio(file, config, (progress, speedStr) => {
      self.postMessage({ type: "progress", id, progress, speedStr });
    });
    self.postMessage({ type: "done", id, blob: mp3Blob });
  } catch (err) {
    self.postMessage({ type: "error", id, error: err.message || err.toString() });
  }
};
async function processAudio(file, config, onProgress) {
  const startTime = Date.now();
  const headerSlice = file.slice(0, 1024 * 1024);
  const headerBuf = await headerSlice.arrayBuffer();
  const dv = new DataView(headerBuf);
  let offset = 0;
  const readString = (len) => {
    let str = "";
    for (let i = 0; i < len; i++) {
      str += String.fromCharCode(dv.getUint8(offset++));
    }
    return str;
  };
  const riff = readString(4);
  if (riff !== "RIFF") throw new Error("Not a valid RIFF file");
  offset += 4;
  const wave = readString(4);
  if (wave !== "WAVE") throw new Error("Not a valid WAVE file");
  let fmt = null;
  let dataOffset = -1;
  let dataSize = 0;
  while (offset < headerBuf.byteLength) {
    const chunkId = readString(4);
    const chunkSize2 = dv.getUint32(offset, true);
    offset += 4;
    if (chunkId === "fmt ") {
      fmt = {
        audioFormat: dv.getUint16(offset, true),
        numChannels: dv.getUint16(offset + 2, true),
        sampleRate: dv.getUint32(offset + 4, true),
        byteRate: dv.getUint32(offset + 8, true),
        blockAlign: dv.getUint16(offset + 12, true),
        bitsPerSample: dv.getUint16(offset + 14, true)
      };
      offset += chunkSize2;
    } else if (chunkId === "data") {
      dataOffset = offset;
      dataSize = chunkSize2;
      break;
    } else {
      offset += chunkSize2;
    }
  }
  if (!fmt) throw new Error("No fmt chunk found");
  if (dataOffset === -1) throw new Error("No data chunk found");
  const mp3Encoder = new lamejs.Mp3Encoder(fmt.numChannels, fmt.sampleRate, config.kbps || 320);
  const mp3Data = [];
  const bytesPerSample = fmt.bitsPerSample / 8;
  const bytesPerFrame = bytesPerSample * fmt.numChannels;
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
            let val = b0 | b1 << 8 | b2 << 16;
            if (val & 8388608) val -= 16777216;
            const dither = (Math.random() - Math.random()) * 0.5;
            sampleInt16 = Math.max(-32768, Math.min(32767, Math.round(val / 256 + dither)));
          } else if (fmt.bitsPerSample === 32) {
            let val = chunkDv.getInt32(bufOffset, true);
            const dither = (Math.random() - Math.random()) * 0.5;
            sampleInt16 = Math.max(-32768, Math.min(32767, Math.round(val / 65536 + dither)));
          } else if (fmt.bitsPerSample === 8) {
            let val = chunkDv.getUint8(bufOffset);
            sampleInt16 = (val - 128) * 256;
          }
        } else if (fmt.audioFormat === 3) {
          if (fmt.bitsPerSample === 32) {
            let val = chunkDv.getFloat32(bufOffset, true);
            const dither = (Math.random() - Math.random()) * 0.5;
            sampleInt16 = Math.max(-32768, Math.min(32767, Math.round(val * 32768 + dither)));
          } else if (fmt.bitsPerSample === 64) {
            let val = chunkDv.getFloat64(bufOffset, true);
            const dither = (Math.random() - Math.random()) * 0.5;
            sampleInt16 = Math.max(-32768, Math.min(32767, Math.round(val * 32768 + dither)));
          }
        }
        if (ch === 0) left[i] = sampleInt16;
        else if (ch === 1) right[i] = sampleInt16;
        bufOffset += bytesPerSample;
      }
    }
    const mp3buf2 = fmt.numChannels === 2 ? mp3Encoder.encodeBuffer(left, right) : mp3Encoder.encodeBuffer(left);
    if (mp3buf2.length > 0) {
      mp3Data.push(new Int8Array(mp3buf2));
    }
    processedFrames += framesInChunk;
    currentOffset = nextOffset;
    const elapsed = (Date.now() - startTime) / 1e3;
    const speedStr = elapsed > 0 ? processedFrames / totalFrames > 0 ? `Converted in ${elapsed.toFixed(1)}s` : "..." : "...";
    onProgress(processedFrames / totalFrames, speedStr);
  }
  const mp3buf = mp3Encoder.flush();
  if (mp3buf.length > 0) {
    mp3Data.push(new Int8Array(mp3buf));
  }
  return new Blob(mp3Data, { type: "audio/mpeg" });
}
