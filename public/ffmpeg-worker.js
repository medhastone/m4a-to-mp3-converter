// Catch all early errors
self.onerror = function(err) {
  self.postMessage({ type: 'ERROR', payload: { error: 'Worker Global Error: ' + (err.message || String(err) || err) } });
};

self.onmessageerror = function(err) {
  self.postMessage({ type: 'ERROR', payload: { error: 'Worker Message Error' } });
};

let FFmpeg = null;
let fetchFile = null;
let toBlobURL = null;
let basePath = '';

try {
      self.postMessage({ type: "PHASE", payload: "Initializing FFmpeg Engine..." });
  basePath = self.location.origin + location.pathname.split('/').slice(0, location.pathname.split('/').indexOf('ffmpeg-worker.js')).join('/');
  
  if (typeof document === 'undefined') {
    self.document = { baseURI: self.location.href };
  }

  importScripts(`${basePath}/ffmpeg/ffmpeg.js?v=1.0.1`);
  importScripts(`${basePath}/ffmpeg/index.js?v=1.0.1`);
  
  FFmpeg = self.FFmpegWASM.FFmpeg;
  fetchFile = self.FFmpegUtil.fetchFile;
  toBlobURL = self.FFmpegUtil.toBlobURL;
} catch (e) {
  self.postMessage({ type: 'ERROR', payload: { error: 'Failed to import scripts: ' + e.message } });
}

let ffmpeg = null;

self.onmessage = async (e) => {
  const { type, payload } = e.data;

  if (type === 'INIT') {
    if (!FFmpeg) {
      self.postMessage({ type: 'ERROR', payload: { error: 'FFmpeg library not loaded.' } });
      return;
    }
    if (ffmpeg) {
      self.postMessage({ type: "PHASE", payload: "WASM Ready" });
      self.postMessage({ type: 'INIT_DONE' });
      return;
    }
    try {
      self.postMessage({ type: "PHASE", payload: "Initializing FFmpeg Engine..." });
      ffmpeg = new FFmpeg();
      ffmpeg.on("log", ({ type, message }) => { self.postMessage({ type: "LOG", payload: message }); });
      ffmpeg.on('progress', ({ progress, time }) => {
        self.postMessage({ type: 'PROGRESS', payload: { progress, time } });
      });

      self.postMessage({ type: "PHASE", payload: "Fetching WASM & Core..." });
      const classWorkerURL = `${basePath}/814.ffmpeg.js?v=1.0.1`;
      const coreURL = `${basePath}/ffmpeg/core/ffmpeg-core.js?v=1.0.1`;
      const wasmURL = await toBlobURL(`${basePath}/ffmpeg/core/ffmpeg-core.wasm?v=1.0.1`, "application/wasm", true, (e) => { const percent = e.total > 0 ? Math.round((e.received / e.total) * 100) : 0; self.postMessage({ type: "PHASE", payload: `Downloading WASM Engine: ${percent}%` }); });
      
      self.postMessage({ type: "PHASE", payload: "Mounting File System..." });
      await ffmpeg.load({
        classWorkerURL,
        coreURL,
        wasmURL,
      });
      self.postMessage({ type: "PHASE", payload: "WASM Ready" });
      self.postMessage({ type: 'INIT_DONE' });
    } catch (err) {
      self.postMessage({ type: 'ERROR', payload: { error: err.message || String(err) } });
    }
  } else if (type === 'CONVERT') {
    if (!ffmpeg) return;
    const { file, quality, id } = payload;
    try {
      self.postMessage({ type: "PHASE", payload: "Initializing FFmpeg Engine..." });
      const safeName = file.name.replace(/[^a-zA-Z0-9.]/g, '');
      const inputName = `input_${id}_${safeName}`;
      const outputName = `output_${id}.mp3`;

      // Read file to MEMFS
      await ffmpeg.writeFile(inputName, await fetchFile(file));

      let audioArgs = ['-vn', '-c:a', 'libmp3lame'];
      
      // Handle quality presets
      if (quality === 'vbr-v0') {
        audioArgs.push('-q:a', '0');
      } else {
        // Default to CBR
        audioArgs.push('-b:a', `${quality}k`);
      }

      const start = performance.now();
      await ffmpeg.exec(['-i', inputName, ...audioArgs, outputName]);
      const end = performance.now();

      const data = await ffmpeg.readFile(outputName);
      const blob = new Blob([data.buffer], { type: 'audio/mpeg' });

      await ffmpeg.deleteFile(inputName);
      await ffmpeg.deleteFile(outputName);

      self.postMessage({ type: 'DONE', payload: { id, blob, time: end - start } });
    } catch (err) {
      self.postMessage({ type: 'ERROR', payload: { id, error: err.message || String(err) || 'Conversion failed' } });
    }
  }
};
