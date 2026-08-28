self.importScripts('https://cdnjs.cloudflare.com/ajax/libs/lamejs/1.2.1/lame.min.js');

self.onmessage = function(e) {
  const { left, right, channels, sampleRate, kbps } = e.data;
  
  if (!self.lamejs || !self.lamejs.Mp3Encoder) {
    self.postMessage({ type: 'error', message: 'LameJS failed to load in worker.' });
    return;
  }

  try {
    const mp3encoder = new self.lamejs.Mp3Encoder(channels, sampleRate, kbps);
    const mp3Data = [];

    // Process in larger chunks to maximize throughput while preventing memory spikes
    const CHUNK_SIZE = 1152 * 100;
    let offset = 0;

    while (offset < left.length) {
      const limit = Math.min(offset + CHUNK_SIZE, left.length);
      const leftFloatChunk = left.subarray(offset, limit);
      const leftInt16Chunk = new Int16Array(leftFloatChunk.length);

      for (let i = 0; i < leftFloatChunk.length; i++) {
        const s = Math.max(-1, Math.min(1, leftFloatChunk[i]));
        leftInt16Chunk[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
      }

      let mp3buf;
      if (channels === 2 && right) {
        const rightFloatChunk = right.subarray(offset, limit);
        const rightInt16Chunk = new Int16Array(rightFloatChunk.length);
        for (let i = 0; i < rightFloatChunk.length; i++) {
          const s = Math.max(-1, Math.min(1, rightFloatChunk[i]));
          rightInt16Chunk[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
        }
        mp3buf = mp3encoder.encodeBuffer(leftInt16Chunk, rightInt16Chunk);
      } else {
        mp3buf = mp3encoder.encodeBuffer(leftInt16Chunk);
      }

      if (mp3buf.length > 0) {
        mp3Data.push(mp3buf);
      }

      offset += CHUNK_SIZE;

      // Post progress periodically
      if (offset % (CHUNK_SIZE * 5) === 0 || offset >= left.length) {
        self.postMessage({ type: 'progress', progress: (offset / left.length) * 100 });
      }
    }

    const mp3bufFinal = mp3encoder.flush();
    if (mp3bufFinal.length > 0) {
      mp3Data.push(mp3bufFinal);
    }

    const totalLength = mp3Data.reduce((acc, val) => acc + val.length, 0);
    const combined = new Int8Array(totalLength);
    let offsetBuffer = 0;
    for (const buf of mp3Data) {
      combined.set(buf, offsetBuffer);
      offsetBuffer += buf.length;
    }

    self.postMessage({ type: 'done', buffer: combined.buffer }, [combined.buffer]);
  } catch (error) {
    self.postMessage({ type: 'error', message: error.message || 'Error during encoding' });
  }
};
