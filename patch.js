const fs = require('fs');
let content = fs.readFileSync('app/components/VideoToMp3Converter.tsx', 'utf8');

const target2 = `  useEffect(() => {
    setTasks(prev => {
      if (isProcessing || !workerRef.current || !isFfmpegLoaded) return prev;
      const nextTask = prev.find(t => t.status === 'pending');
      if (nextTask) {
        // We defer processTask slightly so the state update finishes first
        setTimeout(() => processTask(nextTask), 0);
      }
      return prev;
    });
  }, [tasks, quality, isFfmpegLoaded, isProcessing]);`;

const replacement2 = `  useEffect(() => {
    // Process next task
    if (isProcessing || !workerRef.current || !isFfmpegLoaded) return;
    const nextTask = tasks.find(t => t.status === 'pending');
    if (nextTask) {
      processTask(nextTask);
    }
  }, [tasks, quality, isFfmpegLoaded, isProcessing, processTask]);`;

content = content.replace(target2, replacement2);
fs.writeFileSync('app/components/VideoToMp3Converter.tsx', content);
