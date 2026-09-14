// Robust FFmpeg Web Worker with safe virtual file system handling and error reporting
self.onerror = function(err) {
  self.postMessage({ type: 'ERROR', payload: { error: 'Worker Global Error: ' + (err.message || String(err) || err) } });
};

self.onmessageerror = function() {
  self.postMessage({ type: 'ERROR', payload: { error: 'Worker Message Error' } });
};

let FFmpeg = null;
let fetchFile = null;
let basePath = '';

try {
  self.postMessage({ type: 'PHASE', payload: 'Initializing FFmpeg Engine...' });
  basePath = self.location.origin + location.pathname.split('/').slice(0, location.pathname.split('/').indexOf('ffmpeg-worker.js')).join('/');
  
  if (typeof document === 'undefined') {
    self.document = { baseURI: self.location.href };
  }

  importScripts(`${basePath}/ffmpeg/ffmpeg.js?v=2.0.1`);
  importScripts(`${basePath}/ffmpeg/index.js?v=2.0.1`);
  
  FFmpeg = self.FFmpegWASM.FFmpeg;
  fetchFile = self.FFmpegUtil.fetchFile;
} catch (e) {
  self.postMessage({ type: 'ERROR', payload: { error: 'Failed to import FFmpeg scripts: ' + e.message } });
}

let ffmpeg = null;
let logBuffer = [];

async function safeDelete(filename) {
  if (!ffmpeg || !filename) return;
  try {
    await ffmpeg.deleteFile(filename);
  } catch (_) {
    // Ignore any FS ENOENT error during cleanup
  }
}

self.onmessage = async (e) => {
  const { type, payload } = e.data;

  if (type === 'INIT') {
    if (!FFmpeg) {
      self.postMessage({ type: 'ERROR', payload: { error: 'FFmpeg library not loaded.' } });
      return;
    }
    if (ffmpeg) {
      self.postMessage({ type: 'PHASE', payload: 'WASM Ready' });
      self.postMessage({ type: 'INIT_DONE' });
      return;
    }
    try {
      self.postMessage({ type: 'PHASE', payload: 'Initializing FFmpeg Engine...' });
      ffmpeg = new FFmpeg();
      
      ffmpeg.on('log', ({ message }) => {
        if (message) {
          logBuffer.push(message);
          if (logBuffer.length > 50) logBuffer.shift();
        }
        self.postMessage({ type: 'LOG', payload: message });
      });

      ffmpeg.on('progress', ({ progress, time }) => {
        self.postMessage({ type: 'PROGRESS', payload: { progress, time } });
      });

      self.postMessage({ type: 'PHASE', payload: 'Fetching WASM & Core...' });
      const coreURL = `${basePath}/ffmpeg/core/ffmpeg-core.js?v=2.0.1`;
      const wasmURL = `${basePath}/ffmpeg/core/ffmpeg-core.wasm?v=2.0.1`;
      
      self.postMessage({ type: 'PHASE', payload: 'Mounting File System...' });
      await ffmpeg.load({
        coreURL,
        wasmURL,
      });
      self.postMessage({ type: 'PHASE', payload: 'WASM Ready' });
      self.postMessage({ type: 'INIT_DONE' });
    } catch (err) {
      self.postMessage({ type: 'ERROR', payload: { error: err.message || String(err) } });
    }
  } else if (type === 'CONVERT') {
    if (!ffmpeg) {
      self.postMessage({ type: 'ERROR', payload: { id: payload?.id, error: 'FFmpeg is not initialized' } });
      return;
    }

    const { file, quality, id } = payload;
    const cleanId = String(id || Date.now()).replace(/[^a-zA-Z0-9_-]/g, '');
    const extMatch = file.name ? file.name.match(/\.([a-zA-Z0-9]+)$/) : null;
    const ext = extMatch ? extMatch[1].toLowerCase() : 'wav';
    const inputName = `in_${cleanId}.${ext}`;
    const outputName = `out_${cleanId}.mp3`;

    try {
      self.postMessage({ type: 'PHASE', payload: 'Processing Audio...' });
      logBuffer = [];

      // Clean up previous files if any existed
      await safeDelete(inputName);
      await safeDelete(outputName);

      // Write input file to Emscripten MEMFS
      let fileBytes;
      if (typeof fetchFile === 'function') {
        fileBytes = await fetchFile(file);
      } else {
        fileBytes = new Uint8Array(await file.arrayBuffer());
      }
      if (fileBytes.length === 0) {
        throw new Error('File is empty (0 bytes).');
      }
      await ffmpeg.writeFile(inputName, fileBytes);

      // Build quality flags
      const audioBitrate = quality === 'vbr-v0' ? '320k' : `${parseInt(quality, 10) || 320}k`;

      const start = performance.now();
      
      // Primary conversion attempt
      let args = ['-y', '-nostdin', '-i', inputName, '-vn', '-c:a', 'libmp3lame'];
      if (quality === 'vbr-v0') {
        args.push('-q:a', '0');
      } else {
        args.push('-b:a', audioBitrate);
      }
      args.push(outputName);

      let exitCode = await ffmpeg.exec(args);

      // Fallback with stereo downmix & 44.1kHz resampling if primary attempt fails
      if (exitCode !== 0) {
        await safeDelete(outputName);
        const fallbackArgs = [
          '-y', '-nostdin',
          '-i', inputName,
          '-vn',
          '-acodec', 'libmp3lame',
          '-ar', '44100',
          '-ac', '2',
          '-b:a', audioBitrate,
          outputName
        ];
        exitCode = await ffmpeg.exec(fallbackArgs);
      }

      // Third fallback: Treat as raw PCM if it said "Invalid data found"
      if (exitCode !== 0 && logBuffer.some(l => l.includes('Invalid data found'))) {
        await safeDelete(outputName);
        const rawArgs = [
          '-y', '-nostdin',
          '-f', 's16le',
          '-ar', '44100',
          '-ac', '2',
          '-i', inputName,
          '-vn',
          '-c:a', 'libmp3lame',
          '-b:a', audioBitrate,
          outputName
        ];
        exitCode = await ffmpeg.exec(rawArgs);
      }

      if (exitCode !== 0) {
        let errorDetail = logBuffer.filter(l => l.toLowerCase().includes('error') || l.toLowerCase().includes('invalid')).slice(-2).join(' ') || logBuffer.slice(-3).join(' ');
        
        // Make the error user-friendly if it's still complaining about invalid data
        if (errorDetail.includes('Invalid data found')) {
          errorDetail = 'The file format is unrecognized, corrupted, or contains no valid audio data.';
        } else if (!errorDetail) {
          errorDetail = `Process exited with code ${exitCode}`;
        }

        await safeDelete(inputName);
        await safeDelete(outputName);
        throw new Error(`${errorDetail}`);
      }

      // Read output file safely
      let data = null;
      try {
        data = await ffmpeg.readFile(outputName);
      } catch (readErr) {
        const errorMsg = logBuffer.slice(-2).join(' ') || readErr.message;
        throw new Error(`Output MP3 not created: ${errorMsg}`);
      }

      const end = performance.now();
      const blob = new Blob([data.buffer], { type: 'audio/mpeg' });

      // Clean up MEMFS
      await safeDelete(inputName);
      await safeDelete(outputName);

      self.postMessage({ type: 'DONE', payload: { id, blob, time: end - start } });
    } catch (err) {
      await safeDelete(inputName);
      await safeDelete(outputName);
      self.postMessage({ type: 'ERROR', payload: { id, error: err.message || String(err) || 'Conversion failed' } });
    }
  }
};
