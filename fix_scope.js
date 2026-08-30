const fs = require('fs');
const path = 'app/components/WavToMp3Converter.tsx';
let content = fs.readFileSync(path, 'utf8');

const shareCode = `  const handleShare = async () => {
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

// Replace the incorrect injection
content = content.replace(shareCode, "  return (");

// Now inject it at the correct place. The LAST return ( in the file is the render return.
// Or we can replace '  return (\n    <div className="w-full max-w-5xl mx-auto py-12 px-4 sm:px-6">'
content = content.replace(
  '  return (\n    <div className="w-full max-w-5xl mx-auto py-12 px-4 sm:px-6">',
  shareCode + '\n    <div className="w-full max-w-5xl mx-auto py-12 px-4 sm:px-6">'
);

fs.writeFileSync(path, content);
