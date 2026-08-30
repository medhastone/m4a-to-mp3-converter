const fs = require('fs');
const path = 'app/components/WavToMp3Converter.tsx';
let content = fs.readFileSync(path, 'utf8');

if (!content.includes('Share2')) {
  content = content.replace(
    "import { UploadCloud, Music, FileAudio, Settings, Download, PlayCircle, Loader2, X, Archive } from 'lucide-react';",
    "import { UploadCloud, Music, FileAudio, Settings, Download, PlayCircle, Loader2, X, Archive, Share2 } from 'lucide-react';"
  );
}

if (!content.includes('handleShare = async () =>')) {
  const replacement = `
  const handleShare = async () => {
    const shareData = {
      title: 'Free WAV to MP3 Converter (320kbps)',
      text: "I've been using this professional-grade WAV to MP3 converter. It processes large audio files instantly and securely right in the browser, with no uploads required. Highly recommended for audio professionals.",
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(\`\${shareData.title}\\n\${shareData.text}\\n\${shareData.url}\`);
      alert('Link and message copied to clipboard!');
    }
  };

  return (`;
  content = content.replace('  return (', replacement);
}

if (!content.includes('Share Tool')) {
  const oldQueueHeaderRegex = /\{tasks\.filter\(t => t\.status === 'done'\)\.length > 1 && \([\s\S]*?<\/button>\n\s*\)\}/;
  const newQueueHeader = `{tasks.filter(t => t.status === 'done').length > 0 && (
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-lg transition-colors text-sm"
                  title="Share this tool with colleagues"
                >
                  <Share2 className="w-4 h-4" />
                  Share Tool
                </button>
                {tasks.filter(t => t.status === 'done').length > 1 && (
                  <button 
                    onClick={downloadAll}
                    className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-lg transition-colors text-sm"
                  >
                    <Archive className="w-4 h-4" />
                    Download All (ZIP)
                  </button>
                )}
              </div>
            )}`;
  content = content.replace(oldQueueHeaderRegex, newQueueHeader);
}

if (!content.includes('title="Share this tool"')) {
  const oldDownloadRegex = /\{task\.status === 'done' && \(\n\s*<a[\s\S]*?<\/a>\n\s*\)\}/;
  const newDownload = `{task.status === 'done' && (
                  <div className="shrink-0 flex items-center gap-2">
                    <button
                      onClick={handleShare}
                      className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors text-sm font-medium border border-slate-700"
                      title="Share this tool"
                    >
                      <Share2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Share</span>
                    </button>
                    <a 
                      href={task.previewUrl} 
                      download={task.file.name.replace(/\\.wav$/i, '.mp3')}
                      className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors text-sm font-medium"
                    >
                      <Download className="w-4 h-4" />
                      Download MP3
                    </a>
                  </div>
                )}`;
  content = content.replace(oldDownloadRegex, newDownload);
}

fs.writeFileSync(path, content);
console.log("Done patching");
