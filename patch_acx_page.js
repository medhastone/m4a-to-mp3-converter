const fs = require('fs');

let content = fs.readFileSync('app/[locale]/acx-checker/page.tsx', 'utf8');

// Replace metadata
content = content.replace(
  /title:\s*`.*?`,/,
  "title: `Free ACX Audio Check Online – Instant Peak, RMS & Noise Floor Analyzer (With PDF Report)`,"
);
content = content.replace(
  /description:\s*`.*?`,/,
  "description: `Test audiobook chapters against official Audible ACX requirements for free. Instant in-browser check for Peak (≤ -3.0 dB), RMS (-23 to -18 dB), Noise Floor (≤ -60 dB), and Room Tone spacing with downloadable PDF reports.`,"
);

// Replace H1
content = content.replace(
  /\{t\.rich\('h1',.*?\)\}/s,
  "Free ACX Audio Check Online – Instant Peak, RMS &amp; Noise Floor Analyzer (With PDF Report)"
);

// Add import
if (!content.includes('AcxCheckerArticle')) {
  content = content.replace(
    "import AcxChecker from '../../components/AcxChecker';",
    "import AcxChecker from '../../components/AcxChecker';\nimport AcxCheckerArticle from '../../components/AcxCheckerArticle';"
  );
  
  // Add component rendering
  content = content.replace(
    "<AcxChecker />",
    "<AcxChecker />\n        <AcxCheckerArticle />"
  );
}

fs.writeFileSync('app/[locale]/acx-checker/page.tsx', content);
console.log('Page patched');
