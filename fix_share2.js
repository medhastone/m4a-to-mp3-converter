const fs = require('fs');
const path = 'app/components/WavToMp3Converter.tsx';
let content = fs.readFileSync(path, 'utf8');

// Undo the incorrect placement
content = content.replace(
  /  const handleShare = async \(\) => \{\n    const shareData = \{\n      title: 'Free WAV to MP3 Converter \(320kbps\)',\n      text: "I've been using this professional-grade WAV to MP3 converter\. It processes large audio files instantly and securely right in the browser, with no uploads required\. Highly recommended for audio professionals\.",\n      url: window\.location\.href,\n    \};\n\n    if \(navigator\.share && navigator\.canShare\(shareData\)\) \{\n      try \{\n        await navigator\.share\(shareData\);\n      \} catch \(err\) \{\n        console\.error\('Error sharing:', err\);\n      \}\n    \} else \{\n      navigator\.clipboard\.writeText\(`\$\{shareData\.title\}\\n\$\{shareData\.text\}\\n\$\{shareData\.url\}`\);\n      alert\('Link and message copied to clipboard!'\);\n    \}\n  \};\n\n  return \(/,
  '  return ('
);

const shareCode = `
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

  return (
    <div className="w-full max-w-5xl`;

content = content.replace(/  return \(\n    <div className="w-full max-w-5xl/, shareCode);

fs.writeFileSync(path, content);
console.log("Done fixing");
