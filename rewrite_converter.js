const fs = require('fs');

const path = '/app/applet/app/components/WavToMp3Converter.tsx';
let code = fs.readFileSync(path, 'utf8');

const newLogic = `
  const workers = useRef<{ worker: Worker; isBusy: boolean }[]>([]);

  useEffect(() => {
    const pool: { worker: Worker; isBusy: boolean }[] = [];
    const concurrency = typeof navigator !== 'undefined' && navigator.hardwareConcurrency ? navigator.hardwareConcurrency : 4;
    
    for (let i = 0; i < concurrency; i++) {
      const worker = new Worker('/wav-worker.js');
      
      worker.onmessage = (e: MessageEvent) => {
        const { type, id, progress, speedStr, blob, error } = e.data;
        
        if (type === 'done' || type === 'error') {
          if (workers.current[i]) workers.current[i].isBusy = false;
        }

        setTasks(prev => prev.map(t => {
          if (t.id === id) {
            if (type === 'progress') return { ...t, progress: progress * 100, speedStr };
            if (type === 'done') {
              const previewUrl = URL.createObjectURL(blob);
              return { ...t, status: 'done', progress: 100, blob, previewUrl };
            }
            if (type === 'error') return { ...t, status: 'error', error };
          }
          return t;
        }));
      };
      
      pool.push({ worker, isBusy: false });
    }
    
    workers.current = pool;
    
    return () => {
      pool.forEach(w => w.worker.terminate());
      workers.current = [];
    };
  }, []); // Only initialize workers once

  useEffect(() => {
    const pendingTasks = tasks.filter(t => t.status === 'pending');
    if (pendingTasks.length === 0) return;

    const startedIds: string[] = [];
    
    for (const pTask of pendingTasks) {
      const freeWorker = workers.current.find(w => !w.isBusy);
      if (!freeWorker) break;
      
      freeWorker.isBusy = true;
      freeWorker.worker.postMessage({ id: pTask.id, file: pTask.file, config: { kbps } });
      startedIds.push(pTask.id);
    }

    if (startedIds.length > 0) {
      setTasks(prev => prev.map(t => 
        startedIds.includes(t.id) ? { ...t, status: 'processing' } : t
      ));
    }
  }, [tasks, kbps]);

  const addFiles = (files: File[]) => {
    const wavFiles = files.filter(f => f.name.toLowerCase().endsWith('.wav'));
    if (wavFiles.length === 0) {
      alert(t('alert_wav_only'));
      return;
    }

    const newTasks = wavFiles.map(file => ({
      id: Math.random().toString(36).substring(7),
      file,
      progress: 0,
      status: 'pending' as const
    }));

    setTasks(prev => [...prev, ...newTasks]);
  };
`;

const regex = /const workerPool = useRef<Worker\[\]>\(\[\]\);([\s\S]*?)const handleDrop/m;

code = code.replace(regex, `${newLogic}\n  const handleDrop`);

fs.writeFileSync(path, code);
